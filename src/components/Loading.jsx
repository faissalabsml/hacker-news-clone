import React from "react";

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingMessage: this.props.text,
    };
  }

  componentDidMount() {
    const text = this.props.text;

    this.interval = window.setInterval(() => {
      this.state.loadingMessage === text + "..."
        ? this.setState({ loadingMessage: text })
        : this.setState(({ loadingMessage }) => ({
            loadingMessage: loadingMessage + ".",
          }));
    }, 300);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <div className="loading">{this.state.loadingMessage}</div>;
  }
}
