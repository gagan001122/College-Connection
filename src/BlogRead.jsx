import "./blogread.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from  "./context/Context";
export default function BlogRead() {
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [blog, setBlog] = useState({});
  const params = useParams();
  const blogId = params.blogId
  const [userr, setUser] = useState({});
  const {user} = useContext(Context);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  useEffect(() => {
    const fetchBlogInfo = async () => {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/blog/u/` + path,
          {
            headers: {
              authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha2toYXR0YXIxc0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiRGVlcGFrIiwibGFzdF9uYW1lIjoiS2hhdHRhciIsImlhdCI6MTY1MTE2OTE1Mn0.t57e_E5UdDmfgSRLRWwhMJV1pAQ3q6PSiEQ7QnsYMC4",
            },
          }
        )
        .then((resp) => {
          console.log(resp.data);
          console.log(blogId);
          setBlog(resp.data.blog);
          setUser(resp.data.author_details);
          setTitle(resp.data.blog.title);
          setContent(resp.data.blog.content)
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    fetchBlogInfo();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/blog/u/${blog._id}`);
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/blog/u/${blog._id}` , {
        title: title,
        content:content,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="blogRead">
      <div className="blogReadWrapper">
        {
          updateMode ? <input type="text" value={title} className="blogReadTitleInput" autoFocus 
          onChange={(e) => setTitle(e.target.value)} /> : (
            <h1 className="blogReadTitle">
            {title}
            {userr._id === user.uid  && ( 
            <div className="blogReadEdit">
              <EditIcon className="blogReadIcon"  onClick={() => setUpdateMode(true)} />
              <DeleteIcon className="blogReadIcon"  onClick={handleDelete} />
            </div>
            )}
          </h1>
          )
        }
  
        <div className="blogReadInfo">
          <span>
            Author:
            <b className="blogReadAuthor">
              <Link className="link" to={`/user_profile/${userr._id}`}>
                 { userr.userName}
              </Link>
            </b>
          </span>
        </div>
        <span className="blogdate">
          {new Date(blog.created_at).toDateString()}
        </span>
        <img src={`http://localhost:5000/pfp/${blogId}`} className="blogReadImg" alt="" /> 

       { updateMode ? ( <textarea className="blogReadDescInput" value={content} onChange={(e) => setContent(e.target.value)}/> ) : (
            <p className="blogReadDesc">{content}</p>
       ) }

{updateMode && (
          <button className="blogReadUpdateButton" onClick={handleUpdate} >
            Update Blog
          </button>
        )}
      </div>
    </div>
  );
}
