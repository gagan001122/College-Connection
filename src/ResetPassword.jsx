import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';
import LockResetIconOutlinedIcon from '@mui/icons-material/LockReset';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import './profile.css'

export default function Chgpass() {
  const navigate = useNavigate();
  const params = useParams();
  const email = params.email
  const [password, setPassword] = useState('')
  const [conPassword, setConfirm] = useState('')
  const [hidden, setHidden] = useState(true)
  const submitHandler = (event)=>{
      event.preventDefault();
      if(password.length<6){
          toast.warn('Password Length must be atleast 6 Characters!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
      }
      if(password!==conPassword){
          toast.warn('Password Confirmation Doesn\'t Match!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
      }
      setHidden(false)
      axios.patch(`${process.env.REACT_APP_BASE_URL}/forgot/reset`, {
          email : email,
          newpassword : password
      }).then(
          resp=>{
              setHidden(true)
              toast.success(resp.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              navigate('/login', {replace: true })
              console.log(resp.data)
          }
      ).catch(
          err=>{
              setHidden(true)
              console.log(err.response.data.message)
              toast.error('Something Went Wrong!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
          }
      )
  }
  const card2 = {
    border: 'none'
  }
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
        <h1 className='head1 pl-5'>< LockResetIconOutlinedIcon className="icons" />Change Password<ArrowForwardIosOutlinedIcon /></h1>
        <div className="mask"></div>
      </div>
      <div className="container-xxl p-5">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-lg-10">
            <div className="card mb-5" style={{ marginTop: '-180px' }}>
              <div className="card-body">
                <div className="row ">
                  <div className="col-md-5 left_box"style={{marginTop:'5%'}}>
                    <div className=" image d-flex flex-column justify-content-center align-items-center">
                      <img src="forget.png" height="200" width="auto"/></div>
                    <div className="about-avatar">
                    </div>
                  </div>
                  <div className="col-md-7 right_box">
            <div className="row card p-3" style={card2}>
              <div className="col-sm-12">
                <form className="login" />
                <div className="login__field">
                <PasswordOutlinedIcon  style={{ color: '#7875B5' }}/>
                  <input type="password" name="newpassword" className="login__input" placeholder="New Password"
                   onChange={(event) => {
                  setPassword(event.target.value)
              }} />
                </div>
                <div className="login__field">
                <KeyOutlinedIcon  style={{ color: '#7875B5' }}/>
                  <input type="password" name="confirmnewpassword" className="login__input" placeholder="Confirm Password" 
                  onChange={(event) => {
                  setConfirm(event.target.value)
              }} />
                </div>

                <button className="button chgbtn" onClick={(event) => {
                submitHandler(event)
            }}>
					<span className="button__text">click to Change</span>
					<SendOutlinedIcon style={{ marginLeft:'auto',color: '#7875B5' }}/>
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
  )
}
