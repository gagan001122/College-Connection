import React,{useContext} from 'react'
import "./App.css";
import Header from "./Header";
import Sideprofile from "./Sideprofile";
import Blogs from "./Blogs"
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Context } from  "./context/Context";
export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const {user} = useContext(Context);
  // const { search } = useLocation();
  // //  const location = useLocation();
  // // const path = search.pathname.split("/")[1];
  // console.log(userid); 
  useEffect(() => {
    const fetchBlogs = async () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/blog/all/`, {
        headers : {
          'authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha2toYXR0YXIxc0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiRGVlcGFrIiwibGFzdF9uYW1lIjoiS2hhdHRhciIsImlhdCI6MTY1MTE2OTE1Mn0.t57e_E5UdDmfgSRLRWwhMJV1pAQ3q6PSiEQ7QnsYMC4"
        }
      }).then(
        (resp)=>{
          console.log(resp.data)
          setBlogs(resp.data)
        }
      ).catch(
        err=>{
          console.log(err.response.data)
        }
      )
    };
    fetchBlogs();
  }, []);
  return (
   <>
       {/* <Header /> */}
      <div className="app_body">
        <Blogs blogs={blogs} />
        <Sideprofile />
      </div>
      </>
  )
}
