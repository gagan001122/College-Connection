import React from "react";
import "./blogWrite.css";
import { Context } from "./context/Context";
import { useContext, useState } from "react";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";
export default function BlogWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      author_id: user.uid,
      title,
      content,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/blog/new`, newPost, {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha2toYXR0YXIxc0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiRGVlcGFrIiwibGFzdF9uYW1lIjoiS2hhdHRhciIsImlhdCI6MTY1MTE2OTE1Mn0.t57e_E5UdDmfgSRLRWwhMJV1pAQ3q6PSiEQ7QnsYMC4",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        if (file) {
          const data = new FormData();
          const filename = resp.data._id;
          data.append("pfp", file);
          try {
            axios
              .post(`http://localhost:5000/pfp/${filename}`, data)
              .then((response) => {
                window.location.replace("/blog/u/" + resp.data._id);
                console.log(resp, response);
              })
              .catch((err) => console.log(err.message));
          } catch (err) {}
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="write">
      {/* <img
      className="writeImg"
      src="../pexels-jaime-reimer-2662116.jpg"
      alt=""
    /> */}
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <ImageIcon />
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Write something...."
            type="text"
            autoFocus={true}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Post
        </button>
      </form>
    </div>
  );
}
