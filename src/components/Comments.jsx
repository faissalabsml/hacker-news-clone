import React from "react";

import Comment from "./Comment";

export default function Comments({ commentsId }) {
  return (
    <ul className="comments">
      {commentsId ? (
        commentsId.map((id) => (
          <div key={id}>
            <Comment commentId={id} indent={0} />
          </div>
        ))
      ) : (
        <p className="message">No Comments</p>
      )}
    </ul>
  );
}
