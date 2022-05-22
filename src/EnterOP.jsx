import React from 'react'
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import LockResetIconOutlinedIcon from '@mui/icons-material/LockReset';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import HdrWeakIcon from '@mui/icons-material/HdrWeak';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import './profile.css'

export default function EnterOP() {
  const params = useParams()
  const email = params.email
  const [rstr, setRstr] = useState("");
  const navigate = useNavigate()
  const OtHandler = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/forgot/verify`, {
        email: email,
        rstr: rstr,
      })
      .then(resp => {
        console.log(resp.data)
        navigate(`/resetpass/${email}`, { replace: true })
      })
      .catch((err) => {
        if (err.response.status) {
          if (err.response.status === 409) {
            toast.error(err.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      });
  };
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
        <h1 className='head1'>< HdrWeakIcon className="icons" /><ArrowForwardIosOutlinedIcon /></h1>
        <div className="mask"></div>
      </div>
      <div className="container-xxl">
        <div className="row d-flex justify-content-center mt-5">
          <div className="col-lg-10">
            <div className="card mb-5" style={{ marginTop: '-180px' }}>
              <div className="card-body">
                <div className="row ">
                  <div className="col-md-5 left_box" style={{ marginTop: '5%' }}>
                    <div className=" image d-flex flex-column justify-content-center align-items-center">
                      <img src="Project/login_signup/public/otp.png" height="200" width="auto" /></div>
                  </div>
                  <div className="col-md-7 right_box">
                    <div className="row card p-3" style={card2}>
                      <div className="col-sm-12">
                        <form className="login" />
                        <h4 className="login__field m-5" >Enter your OTP to reset your Password!</h4>
                        <div className="login__field">
                          <LockResetIconOutlinedIcon style={{ color: '#7875B5' }} />
                          <input type="text" name='otp' className="login__input" placeholder="Enter Your OTP"
                            onChange={(event) => {
                              setRstr(event.target.value);
                            }}
                          />
                        </div>
                        <button className="button chgbtn" onClick={(event) => {
                          OtHandler(event);
                        }}>
                          <span className="button__text">NEXT!</span>
                          <SendOutlinedIcon style={{ marginLeft: '65px', color: '#7875B5' }} />
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
