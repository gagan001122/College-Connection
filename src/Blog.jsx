import { Link } from "react-router-dom";
import "./blog.css";
import React from 'react';
import AuthContext from "./context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios"; 
export default function Blog({blog}) {
  return (
    <div className="blog">
      <img
      src={`http://localhost:5000/pfp/${blog._id}`}
        className="blogImg"
        alt=""
      />
      <div className="blogInfo">
        <span className="blogDate">{new Date (blog.created_at).toDateString()}</span>
          <Link to={`/blog/u/${blog._id}`} className="link">
            <span className="blogTitle">{blog.title}</span>
          </Link>
      
        <hr />
      </div>
      <p className="blogDesc">
        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi similique quisquam, nam expedita tempora dolorum voluptatibus? Cum ipsum a dignissimos possimus dolor quaerat ex, ipsam minima! Magnam nihil officiis nulla doloremque quas. Dolor tenetur fugiat laudantium vel consequuntur, reprehenderit, perferendis blanditiis dicta corrupti eveniet non eos odio, dolore labore maxime error eum consectetur dignissimos quas molestias nesciunt enim laborum quo. Officia non minus rerum? Sed, fuga earum quis consectetur magni natus! Deserunt tempora, repellendus voluptate delectus eos rerum natus quia. */}
        {blog.content}
      </p>

    </div>
  );
}
