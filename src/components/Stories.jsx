import React from "react";
import ReactPaginate from "react-paginate";

import { getStories } from "../utils/api";
import PostListItem from "./PostListItem";
import Loading from "./Loading";

export default class Stories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stories: [],
      errorMessage: null,
      loading: true,
      pageNumber: 0,
    };

    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    const storiesType =
      this.props.location.pathname === "/new" ? "newstories" : "topstories";

    getStories(storiesType)
      .then((stories) =>
        this.setState({
          stories: stories.filter((story) => story.deleted !== true),
          loading: false,
        })
      )
      .catch(({ message }) =>
        this.setState({ errorMessage: message, loading: false })
      );
  }

  changePage({ selected }) {
    this.setState({ pageNumber: selected });
  }

  render() {
    if (this.state.loading) return <Loading text="Loading Posts" />;

    if (this.state.errorMessage)
      return <p className="message">{this.state.errorMessage}</p>;

    const storiesPerPage = 25;
    const pageCount = Math.ceil(this.state.stories.length / storiesPerPage);
    const pagesVisited = this.state.pageNumber * storiesPerPage;

    return (
      <>
        <ul role="list" className="stories">
          {this.state.stories
            .slice(pagesVisited, pagesVisited + storiesPerPage)
            .map((story) => (
              <PostListItem postInfo={story} key={story.id} />
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
