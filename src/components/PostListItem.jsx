import React from "react";
import { Link } from "react-router-dom";
import ItemInfo from "./ItemInfo";

export default function PostListItem(props) {
  const { id, url, title, score, by, time, kids } = props.postInfo;

  function getDomain() {
    return new URL(url).hostname.replace("www.", "");
  }

  return (
    <li className="story">
      <h2 className="heading-2">
        {url ? (
          <>
            <a className="link link-heading" href={url} target="_blank">
              {title}
            </a>
            <a className="link link-small" href={url} target="_blank">
              ({getDomain()})
            </a>
          </>
        ) : (
          <>
            <Link
              className="link link-heading"
              to={{
                pathname: "/item",
                search: `?id=${id}`,
              }}
              target="_blank"
            >
              {title}
            </Link>
            <Link
              className="link link-small"
              to={{
                pathname: "/item",
                search: `?id=${id}`,
              }}
              target="_blank"
            >
              (hackernews.com)
            </Link>
          </>
        )}
      </h2>
      <div className="story-info">
        <ItemInfo info={{ id, score, by, time, kids }} />
      </div>
    </li>
  );
}
