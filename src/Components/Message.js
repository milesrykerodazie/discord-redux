import React, { forwardRef } from "react";
import "../Css/Message.css";
import { Avatar } from "@material-ui/core";

const Message = forwardRef(
  ({ contents: { timestamp, user, message } }, ref) => {
    return (
      <div ref={ref} className="message">
        <Avatar src={user.photo} />
        <div className="message__info">
          <h4>
            {user.displayName}
            <span className="message__timestamp">
              {new Date(timestamp?.toDate()).toUTCString()}
            </span>
          </h4>
          <p>{message}</p>
        </div>
      </div>
    );
  },
);

export default Message;
