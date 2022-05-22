import React, { useContext } from "react";
import ReactDOM from "react-dom";
 import "./App.css";
import Header from "./Header";
import Messenger from "./client/messenger/Messenger";
import Home from "./Home";
// import HomePage from "./HomePage"
import LoginPage from "./LoginPage"
import ForgotPassword from "./ForgotPassword";
import EnterOP from "./EnterOP";
import ResetPassword from "./ResetPassword";
import SignUpPage from "./SignUpPage";
import NotFound from './NotFound'
import ProfilePage from "./ProfilePage";
import Test from "./Profile";
import BlogRead from "./BlogRead";
import BlogWrite from "./BlogWrite";
import Profileedit from './Profileedit'
import Profile from "./Profile";
import { Context } from "./context/Context";
import Profile2 from "./Profile2";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import Sideprofile from "./Sideprofile";
function App() {
  const {user} = useContext(Context);
 
  return (
    <div className="app">
 <Router>
   {user && <Header className="head"/>}
      <Routes>
      <Route path="/" element={user ? <Home/> : <LoginPage/>}/>
        <Route path="/home" element={user ? <Home />  : <LoginPage />} />
        <Route path="/login" element={user ? <Home /> : <LoginPage />} />
        <Route path="/signup" element={user ? <Home />  : <SignUpPage />} />
        <Route path="/messenger" element ={user? <Messenger/> : <LoginPage/> } /> 
        <Route path="/r ecovery" element={<ForgotPassword />} />
        <Route path="/verification/:email" element={<EnterOP />} />
        <Route path="/resetpass/:email" element={<ResetPassword />} />
        <Route path='/profile/:uid' element={user ? <Profile/> : <LoginPage />} />
        <Route path='/user_profile/:uid' element={user ? <Profile2/> : <LoginPage />} />
        <Route path='/blog/u/:blogId' element={<BlogRead/>} />
        <Route path="/profileedit/:uid" element={user? <Profileedit />: <LoginPage />} />
        <Route path='/writeblog' element={user ? <BlogWrite/>:<LoginPage /> } /> 
        <Route path='/sideprofile' element={ <Sideprofile/>} /> 
        <Route path="*" element={<NotFound/>}/>
      </Routes> 
      </Router>
    </div>
  );
}

export default App;
