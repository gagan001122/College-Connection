import React, { useState } from "react";
import "./Feed.css";
import CreateIcon from "@mui/icons-material/Create";
import InputOption from "./InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArticleIcon from "@mui/icons-material/Article";
import Post from "./Post";
export default function Feed() {
  // const[posts,setPosts] = useState([]);

  // const sendPost = (e) => {
  //   e.preventDefault();
  // }
  return (
    <div className="feed">
      <div className="feed_inputContainer">
        <div className="feed_input">
          <CreateIcon />
          <form>
            <input type="text" />
            <button  type="submit">Send </button>
          </form>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption
            Icon={SubscriptionsIcon}
            title="Video"
            color="lightgreen"
          />
          <InputOption Icon={EventNoteIcon} title="Event" color="orange" />
          <InputOption
            Icon={ArticleIcon}
            title="Write Blog"
            color="lightpink"
          />
        </div>
      </div>
      {/* Posts */}
      <div className="posts">
      <div className="posts">
        <Post
          name={"Gagan"}
          description={"Web Developer | Tech Enthusiastic"}
          message={"Hi, this is Gagan"}
          photoUrl="avatar.jpeg"
        />
        <Post
          name={"Gagan"}
          description={"Web Developer | Tech Enthusiastic"}
          message={"Hi, this is Gagan"}
          photoUrl="avatar.jpeg"
        />
      </div>
      </div>
    </div>
  );
}
