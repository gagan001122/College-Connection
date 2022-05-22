import "./Messenger.css";
import { Link } from "react-router-dom";
import React from "react";
import Header from "../../Header";
import Conversation from "./Conversation";
import Message from "./Message";
export default function messenger() {
  return (
    
    <div className="messenger">
      <Link to="/messenger"></Link>
      <div className="inboxmenu">
        <div className="inboxmenuwrap">
          <input
            type="text"
            placeholder="Search Friends"
            className="inboxmenusearch"
          />
          <Conversation />
        </div>
      </div>
      <div className="inbox">
        <div className="inboxwrap">
          <div className="inboxtop">
            <Message />
            <Message mine={true} />
            <Message />
            <Message mine={true} />
            <Message />
          </div>
          <div className="inboxbottom">
            <textarea
              className="inboxmessageinput"
              placeholder="write a message..."
            ></textarea>
            <button className="inboxmessgesubmit">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
