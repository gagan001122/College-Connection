import { Avatar } from "@mui/material";
import React ,{useContext} from "react";
import "./Sideprofile.css";
import AuthContext from "./context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { Context } from  "./context/Context";
import { Link } from "react-router-dom";
export default function Sideprofile() {
  const {user} = useContext(Context);
  const uuid = user.uid;
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [userr, setUser] = useState({});
  console.log(AuthContext.auth, "SHEEEEEEEEEEEEEEEEEEEEESH")
  useEffect(() => { 
    const fetchUserInfo = async () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/user/d/` + uuid, {
        headers : {
          'authorization' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha2toYXR0YXIxc0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiRGVlcGFrIiwibGFzdF9uYW1lIjoiS2hhdHRhciIsImlhdCI6MTY1MTE2OTE1Mn0.t57e_E5UdDmfgSRLRWwhMJV1pAQ3q6PSiEQ7QnsYMC4"
        }
      }).then(
        (resp)=>{
          console.log(resp.data, "SHESH")
          setUser(resp.data.deets)
          setFollowers(resp.data.followers)
          setFollowing(resp.data.following)
        }
      ).catch(
        err=>{
          console.log(err.response.data)
        }
      )
    };
    fetchUserInfo();
  }, []); 

  const popular = (item) => (
    <div className="sideprofile_item">
      <span className="sideprofile_tags">#</span>
      <p>{item}</p>
    </div>
  );
  return (
    <div className="sideprofile">
      <div className="sideprofile_top">
        <Link to="/sideprofile" /> 
        <img src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHw%3D&w=1000&q=80"  /*{user.coverPhoto}*/ alt="" />
        <Avatar src={`http://localhost:5000/pfp/`+user.uid} className="sideprofile_avatar" />
        <h2 className="userName">{userr.userName}</h2>
        <h4 className="userBio">{userr.bio}</h4>
      </div>

      <div className="sideprofile_bottom">
        <div className="sideprofile_stats">
          <p>Followers</p>
          <p className="sideprofile_stat_number">{followers}</p>
        </div>

        <div className="sideprofile_stats">
          <p>Following</p>
          <p className="sideprofile_stat_number">{following}</p>
        </div>
      </div>
    </div>
  );
}
