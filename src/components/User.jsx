import React from "react";
import ReactPaginate from "react-paginate";

import { getItem, getUser } from "../utils/api";
import { formatTime } from "./ItemInfo";
import PostListItem from "./PostListItem";
import Loading from "./Loading";

export default class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userPosts: null,
      errorMessage: null,
      userLoading: true,
      postsLoading: true,
      pageNumber: 0,
    };

    this.changePage = this.changePage.bind(this);
    this.renderPosts = this.renderPosts.bind(this);
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const id = searchParams.get("id");

    getUser(id)
      .then((user) => {
        this.setState({ user, userLoading: false });
        document.title = `Profile: ${user.id}`;
        return Promise.all(user.submitted.slice(0, 100).map(getItem));
      })
      .then((items) => {
        this.setState({
          userPosts: items
            .filter((item) => item.type === "story" && !item.deleted)
            .filter((item) => !item.dead),
          postsLoading: false,
        });
      })
      .catch(({ message }) =>
        this.setState({
          errorMessage: message,
          userLoading: false,
          postsLoading: false,
        })
      );
  }

  changePage({ selected }) {
    this.setState({ pageNumber: selected });
  }

  renderPosts() {
    if (this.state.postsLoading) {
      return <Loading text="Fetching User's Posts" />;
    }

    if (!this.state.userPosts.length) {
      return <p className="message">This user hasn't posted yet</p>;
    }

    if (!this.state.postsLoading) {
      const storiesPerPage = 25;
      const pageCount = Math.ceil(this.state.userPosts.length / storiesPerPage);
      const pagesVisited = this.state.pageNumber * storiesPerPage;

      return (
        <>
          <ul>
            {this.state.userPosts
              .slice(pagesVisited, pagesVisited + storiesPerPage)
              .map((post) => (
                <PostListItem postInfo={post} key={post.id} />
              ))}
          </ul>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            pageCount={pageCount}
            onPageChange={this.changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination-btn previous"}
            nextLinkClassName={"pagination-btn next"}
            disabledClassName={"pagination-btn disabled"}
            activeClassName={"pagination-btn active"}
          />
        </>
      );
    }
  }

  render() {
    if (this.state.userLoading) return <Loading text="Fetching User's info" />;

    if (this.state.errorMessage)
      return <p className="message">{this.state.errorMessage}</p>;

    const { about, created, id, karma } = this.state.user;

    return (
      <div>
        <h1 className="heading-1">{id}</h1>
        <div className="user-info">
          <span>{karma}</span> Karma | Joined on the{" "}
          <span>{formatTime(created)}</span>
        </div>
        {!about ? (
          <div className="user-about">No about</div>
        ) : (
          <div
            className="user-about"
            dangerouslySetInnerHTML={{ __html: about }}
          />
        )}

        <h3 className="heading-3">
          Posts{" "}
          {!this.state.postsLoading && (
            <span>[{this.state.userPosts.length}]</span>
          )}
        </h3>
        {this.renderPosts()}
      </div>
    );
  }
}
