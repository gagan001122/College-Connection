import React  , {useContext}from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import LockResetIconOutlinedIcon from "@mui/icons-material/LockReset";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import BadgeIconOutlinedIcon from "@mui/icons-material/Badge";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import "./profile.css";
import { Context } from "./context/Context";
import { Avatar } from "@mui/material";
export default function Profile() {
  const params = useParams()
  const curr_id = params.uid
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [uClass, setClass] = useState(0);
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const [userr, setUser] = useState({})
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  useEffect( ()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}/user/d/` + curr_id, {
      headers: {
        'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha2toYXR0YXIxc0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiRGVlcGFrIiwibGFzdF9uYW1lIjoiS2hhdHRhciIsImlhdCI6MTY1MTE2OTE1Mn0.t57e_E5UdDmfgSRLRWwhMJV1pAQ3q6PSiEQ7QnsYMC4"
      }
    }).then(
      (resp) => {
        const deets = (resp.data.deets)
        setUser(resp.data.deets)
        setFirstName(deets.first_name)
        setLastName(deets.last_name)
        setClass(deets.class)
        setMajor(deets.major)
        setBio(deets.bio)
      }
    ).catch(
      err => {
        console.log(err.response.data)
      }
    )
  }, [])

  const profileupdater = (event) => {
    event.preventDefault();
    const updatedetails = {
      first_name: firstName,
      last_name: lastName,
      class: uClass,
      major: major,
      bio: bio,
    };
    axios
      .patch(`${process.env.REACT_APP_BASE_URL}/user/update/`+user.uid, updatedetails, {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBha2toYXR0YXIxc0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiRGVlcGFrIiwibGFzdF9uYW1lIjoiS2hhdHRhciIsImlhdCI6MTY1MTE2OTE1Mn0.t57e_E5UdDmfgSRLRWwhMJV1pAQ3q6PSiEQ7QnsYMC4",
        },
      })
      .then((resp) => {
        if (file) {
          const data = new FormData();
          const filename = user.uid;
          data.append("pfp", file);
          try {
            axios
              .post(`http://localhost:5000/pfp/${filename}`, data)
              .then((response) => {
                console.log(resp, response);
                window.location.reload();
              })
              .catch((err) => console.log(err.message));
          } catch (err) {}
        }
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const card2 = {
    border: "none",
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
          <PersonOutlineIcon className="icons" /> Edit Profile
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
                  <a
                    className="nav-link"
                    style={{ color: "slategray" }}
                    onClick={() => {
                      navigate(`/profile/${curr_id}`);
                    }}
                  >
                    <PersonOutlineIcon style={{ color: "lightgreen" }} />{" "}
                    Profile
                  </a>
                  <a className="nav-link" style={{ color: "black" }}>
                    <ManageAccountsOutlinedIcon
                      style={{ color: "lightpink" }}
                    />{" "}
                    Edit Profile
                  </a>
                </div>
                <div className="row ">
                  <div
                    className="col-md-5 left_box"
                    style={{ marginTop: "8%" }}
                  >
                    <div className=" image d-flex flex-column justify-content-center align-items-center">
                    {file && (
        <img  className="rounded-circle"
        height="120"
        width="120" src={URL.createObjectURL(file)} alt="" />
      )}
                    </div>
                    <input
                      type="file"
                      id="upload"
                      hidden
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    <label className="label" htmlFor="upload">Choose Profile Picture</label>
                    <div className="about-avatar">
                      <div className="bio">
                        <br />
                        <div className="login__field">
                          <DriveFileRenameOutlineIcon
                            style={{ color: "#7875B5" }}
                          />
                          <input
                            type="text"
                            className="login__input"
                            defaultValue={userr.bio}
                            name="bio"
                            onChange={(event) => {
                              setBio(event.target.value);
                            }}
                            placeholder="Bio"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7 right_box">
                    <div className="row card" style={card2}>
                      <div className="col-sm-12">
                        <form className="login" />
                        <div className="login__field">
                          <BadgeIconOutlinedIcon style={{ color: "#7875B5" }} />
                          <input
                            type="text"
                            className="login__input"
                            defaultValue={userr.first_name}
                            name="firstname"
                            onChange={(event) => {
                              setFirstName(event.target.value);
                            }}
                            placeholder="Firstname"
                          />
                        </div>
                        <div className="login__field">
                          <DriveFileRenameOutlineIcon
                            style={{ color: "#7875B5" }}
                          />
                          <input
                            type="text"
                            className="login__input"
                            defaultValue={userr.last_name}
                            name="lastname"
                            onChange={(event) => {
                              setLastName(event.target.value);
                            }}
                            placeholder="Lastname"
                          />
                        </div>
                        <div className="login__field">
                          <DriveFileRenameOutlineIcon
                            style={{ color: "#7875B5" }}
                          />
                          <input
                            type="text"
                            className="login__input"
                            defaultValue={userr.major}
                            name="major"
                            onChange={(event) => {
                              setMajor(event.target.value);
                            }}
                            placeholder="Major"
                          />
                        </div>
                        <div className="login__field">
                          <DriveFileRenameOutlineIcon
                            style={{ color: "#7875B5" }}
                          />
                          <input
                            type="number"
                            className="login__input"
                            defaultValue={userr.class}
                            name="class"
                            onChange={(event) => {
                              setClass(event.target.value);
                            }}
                            placeholder="Class"
                          />
                        </div>
                        <button className="button chgbtn">
                          <span
                            className="button__text"
                            onClick={(event) => {
                              profileupdater(event);
                            }}
                          >
                            click to Change
                          </span>
                          <SendOutlinedIcon
                            style={{ marginLeft: "auto", color: "#7875B5" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
