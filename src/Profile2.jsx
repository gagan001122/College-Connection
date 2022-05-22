import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LockResetIconOutlinedIcon from "@mui/icons-material/LockReset";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import "./profile.css";
import { Context } from "./context/Context";
export default function Profile2() {
  const params = useParams();
  const curr_uid = params.uid;
  const navigate = useNavigate();
  const [userr, setuser] = useState({});
  const [numblogs, setnumBlogs] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const { user } = useContext(Context);
  const [followed, setFollowed] = useState(false)
  const uuid = user.uid;
  const fetchuserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/d/` + curr_uid, {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha2toYXR0YXIxc0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiRGVlcGFrIiwibGFzdF9uYW1lIjoiS2hhdHRhciIsImlhdCI6MTY1MTE2OTE1Mn0.t57e_E5UdDmfgSRLRWwhMJV1pAQ3q6PSiEQ7QnsYMC4",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setuser(resp.data.deets);
        setnumBlogs(resp.data.numeros);
        setFollowers(resp.data.followers);
        setFollowing(resp.data.following);
        setBlogs(resp.data.blogs);
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    fetchuserInfo();
  }, []);

  const handleFollow = (event) => {
    event.preventDefault();
    const details = {
      follower_id: uuid,
      user_id: curr_uid,
    };
    if(!followed){axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/follow/`, details, {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha2toYXR0YXIxc0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiRGVlcGFrIiwibGFzdF9uYW1lIjoiS2hhdHRhciIsImlhdCI6MTY1MTE2OTE1Mn0.t57e_E5UdDmfgSRLRWwhMJV1pAQ3q6PSiEQ7QnsYMC4",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        toast.success("You've Followed The User!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setFollowed(true)
      })
      .catch((err) => {
        setFollowed(true)
        toast.error("You've Already Followed The User!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      });}
      else{
        axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/unfollow/`, details, {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha2toYXR0YXIxc0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiRGVlcGFrIiwibGFzdF9uYW1lIjoiS2hhdHRhciIsImlhdCI6MTY1MTE2OTE1Mn0.t57e_E5UdDmfgSRLRWwhMJV1pAQ3q6PSiEQ7QnsYMC4",
        },
      })
      .then((resp) => {
        console.log(resp.data);
        toast.success("You've Unfollowed The User!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setFollowed(false)
      })
      .catch((err) => {
        setFollowed(false)
        toast.error("You've Already Followed The User!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      });
      }
      fetchuserInfo();
  };

  const card2 = {
    border: "none",
  };
  const cd1 = {
    border: "none",
    backgroundColor: "whitesmoke",
  };
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="head-colr">
        <h1 className="head1">
          <PersonOutlineIcon className="icons" /> User Profile
          <ArrowForwardIosOutlinedIcon />
        </h1>
        <div className="mask"></div>
      </div>
      <div className="container-xxl">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-lg-10">
            <div className="card mb-5" style={{ marginTop: "-180px" }}>
              <div className="card-body">
                <div className="nav">
                  <a className="nav-link" style={{ color: "black" }}>
                    <PersonOutlineIcon style={{ color: "lightgreen" }} />{" "}
                    Profile
                  </a>
                  {/* <a className='nav-link' href="#" style={{ color: 'slategray' }} data-toggle="modal" onClick={() => {
                    navigate('/profileedit')
                  }}> */}
                  {/* <ManageAccountsOutlinedIcon style={{ color: 'lightpink' }} /> Edit Profile</a> */}
                </div>
                <div className="row ">
                  <div className="col-md-5 left_box">
                    <div className=" image d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={`http://localhost:5000/pfp/` + curr_uid}
                        className="rounded-circle"
                        height="120"
                        width="120"
                      />
                    </div>
                    <div className="about-avatar">
                      <div className="bio">
                        {/* <h3>{userr.first_name}{userr.last_name}</h3> */}
                        <h5>{userr.userName}</h5>
                        <br />
                        <p>{userr.bio}</p>
                      </div>
                    </div>
                    {uuid == curr_uid ? null : ( followed ?<button className="followButton" onClick={handleFollow}>
                        Unfollow
                      </button>:
                      <button className="followButton" onClick={handleFollow}>
                        Follow
                      </button>
                    )}
                  </div>
                  <div
                    className="col-md-7 right_box"
                    style={{ marginTop: "35px" }}
                  >
                    <div className="row card p-3" style={cd1}>
                      <div className="col-sm-12">
                        <h6 className="">
                          Name
                          <span className="spac">
                            {userr.first_name} {userr.last_name}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div className="row card p-3" style={card2}>
                      <div className="col-sm-12">
                        <h6 className="">
                          Email<span className="spac">{userr.email}</span>
                        </h6>
                      </div>
                    </div>
                    <div className="row card p-3" style={cd1}>
                      <div className="col-sm-12">
                        <h6 className="">
                          Class<span className="spac1">{userr.class}</span>
                        </h6>
                      </div>
                    </div>
                    <div className="row card p-3" style={card2}>
                      <div className="col-sm-12">
                        <h6 className="">
                          Major<span className="spac1">{userr.major}</span>
                        </h6>
                      </div>
                    </div>

                    <div className="counter count">
                      <div className="row">
                        <div className="col-6 col-lg-3">
                          <div className="text-center">
                            <h4>{numblogs}</h4>
                            <p>Blogs</p>
                          </div>
                        </div>
                        <div className="col-6 col-lg-3">
                          <div className="text-center">
                            <h4>{followers}</h4>
                            <p>Followers</p>
                          </div>
                        </div>
                        <div className="col-6 col-lg-3">
                          <div className="text-center">
                            <h4>{following}</h4>
                            <p>Following</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body p-5">
          <h1>Blogs</h1>
          {blogs.map((value) => {
            return (
              <section className="m-5">
                <div className="container cox">
                  <img
                    className="left"
                    src={`http://localhost:5000/pfp/${value._id}`}
                    height="600px"
                  />
                  <div className="right">
                    <div className="content">
                      <Link to={`/blog/u/${value._id}`}>
                        <h1>{value.title}</h1>
                      </Link>
                      <p>{value.content}</p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
