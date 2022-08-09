import React from "react";
import { Link } from "react-router-dom";

export function formatTime(time) {
  return new Date(time * 1000).toLocaleString([], {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ItemInfo(props) {
  const { score, by, id, time, kids, showComments = true } = props.info;

  return (
    <div className="item-info">
      {score ? `${score} points ` : ""}
      by
      <Link
        className="link"
        to={{
          pathname: "/user",
          search: `?id=${by}`,
        }}
        href="/"
      >
        {by}
      </Link>
      on {formatTime(time)}{" "}
      {showComments && (
        <>
          with
          <Link
            className="link"
            to={{
              pathname: "/item",
              search: `?id=${id}`,
            }}
          >
            {kids ? kids.length : "0"}
          </Link>
          Comment
        </>
      )}
    </div>
  );
}
