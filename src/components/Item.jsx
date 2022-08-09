import React from "react";

import { getItem } from "../utils/api";
import ItemInfo from "./ItemInfo";
import Loading from "./Loading";
import Comments from "./Comments";

export default class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      itemComments: null,
      errorMessage: null,
      itemLoading: true,
      commentsLoading: true,
    };
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const id = searchParams.get("id");

    getItem(id)
      .then((item) => {
        this.setState({ item, itemLoading: false });
        document.title = item.title;
      })
      .catch(({ message }) =>
        this.setState({
          errorMessage: message,
          itemLoading: false,
          // commentsLoading: false,
        })
      );
  }

  render() {
    if (this.state.itemLoading)
      return <Loading text="Fetching The Post Info" />;

    if (this.state.errorMessage)
      return <p className="message">{this.state.errorMessage}</p>;

    const { by, id, kids, score, text, time, title, url } = this.state.item;

    return (
      <div className="item">
        <div className="item-body">
          <div className="item-heading">
            <h1 className="heading-1">
              <a href={url}>{title}</a>
            </h1>
            <ItemInfo info={{ score, by, id, time, kids }} />
          </div>
          <p className="item-text" dangerouslySetInnerHTML={{ __html: text }} />
        </div>
        <Comments commentsId={this.state.item.kids} />
      </div>
    );
  }
}
