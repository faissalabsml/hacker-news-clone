import React from "react";

import { getItem } from "../utils/api";
import ItemInfo from "./ItemInfo";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: null,
      collapse: true,
    };

    this.styles = {
      marginLeft: `${this.props.indent + 10}px`,
      color: "red",
    };

    this.showChildren = this.showChildren.bind(this);
  }

  componentDidMount() {
    getItem(this.props.commentId).then((comment) => this.setState({ comment }));
  }

  showChildren() {
    this.setState(({ collapse }) => ({
      collapse: collapse === true ? false : true,
    }));
  }

  render() {
    if (this.state.comment) {
      const { by, id, time, text, kids } = this.state.comment;

      console.log(this.state.comment);

      return (
        <>
          <li className="comment">
            <div className="comment-header">
              <ItemInfo info={{ by, id, time, showComments: false }} />
              {kids && (
                <span onClick={this.showChildren} className="collapse-btn">
                  {this.state.collapse ? `[${kids.length} more]` : "[ - ]"}
                </span>
              )}
            </div>
            <p
              className="comment-body"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </li>
          <ul className="comment-kids">
            {kids &&
              !this.state.collapse &&
              kids.map((kid) => (
                <div key={kid}>
                  <Comment
                    commentId={kid}
                    indent={this.props.indent + 1}
                    styles={this.styles}
                  />
                </div>
              ))}
          </ul>
        </>
      );
    }
  }
}
