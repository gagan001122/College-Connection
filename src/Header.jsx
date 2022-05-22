import React ,{useContext} from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@mui/icons-material/Home";
import "./HeaderOption.css";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import Messenger from "./client/messenger/Messenger";
import Home from "./Home";
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from "@mui/icons-material/Article";
import { Context } from "./context/Context";
export default function Header() {
  const { user, dispatch } = useContext(Context);
  let navigate = useNavigate();
  const gomessenger = () => {
    navigate("/messenger");
  };
  const goHome = () => {
    navigate("/home");
  };
  const goprofile = () => {
    navigate(`/profile/${user.uid}`);
  };
  const gowriteblog = () => {
    navigate("/writeblog");
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };



  return (
    <div className="Header">
      <div className="header_left">
        {/* <h1>this is header left</h1> */}
        {/* Logo */}
        <img src="cc.png" alt="" />
      </div>
      <div className="header_right">
        <button onClick={goHome}>
          <HeaderOption Icon={HomeIcon} title="Home" onClick={goHome} />
        </button>
        {/* <button>
          <HeaderOption Icon={PeopleIcon} title="Community" />
  </button>*/}
        <button onClick={gowriteblog} >
          <HeaderOption Icon={ArticleIcon} title="Blog" onClick={gowriteblog} />
        </button> 
        <button onClick={gomessenger}>
          {" "}
          <HeaderOption
            Icon={ChatIcon}
            title="Messages"
            onClick={gomessenger}
          />
        </button>
        {/* <button>
          <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        </button> */}
        <button onClick={goprofile}>
        {user && <HeaderOption avatar={`http://localhost:5000/pfp/`+user.uid} title="Profile"  onClick={goprofile}/>}
        </button>

        <button onClick={handleLogout} className="logoutbutton" >
        {user &&  <HeaderOption Icon={LogoutIcon} title="LOGOUT" />}
        </button>

      </div>
    </div>
  );
}
