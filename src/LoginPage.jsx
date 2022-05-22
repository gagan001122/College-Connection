import React from 'react'
import { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Context } from "./context/Context";
import './LoginPage.css'


export default function LoginPage() {
  let navigate = useNavigate();
  const {dispatch, isFetching } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [uClass, setClass] = useState(0)
  const [major, setMajor] = useState('')
  const [hidden, setHidden] = useState(true);
  const signupHangler = (event) => {
    event.preventDefault();
    if (email.length == 0) {
      toast.info('Email address Required!', {
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
    if (password.length < 6) {
      toast.info('Password Length must be atleast 6 Characters!', {
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
    setHidden(false);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        class: uClass,
        major: major
      })
      .then((resp) => {
        setHidden(true);
        console.log(resp.data);
        localStorage.setItem("authToken", resp.data.token);
        toast.success(resp.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        setHidden(true);
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
  const loginHandler = (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    setHidden(false);
    axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
      email: email,
      password: password,
    })
      .then((resp) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: resp.data });
        setHidden(true);
        console.log(resp.data);
        localStorage.setItem("cauth_token", resp.data.token)
        navigate('/home', { replace: true })
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_FAILURE" });
        setHidden(true);
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
            })
          }
        }
        else {
          toast.error('Something Went Wrong!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      });
  };
  const mailSender = (event) => {
    event.preventDefault();
    setHidden(false);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/forgot/mailer`, {
        email: email,
      })
      .then((resp) => {
        setHidden(true);
        navigate(`/verification/${email}`, { replace: true })
        console.log(resp.data)
      })
      .catch((err) => {
        setHidden(true);
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
      });
  };

  const cclogo = <img src="cclogin.png" style={{ width: '80px' }} alt='' />

  function openForm() {
    document.getElementById("forget").style.display = "block";
    document.getElementById("hide1").style.display = "none";

  }

  function closeForm() {
    document.getElementById("forget").style.display = "none";
    document.getElementById("hide1").style.display = "block";
  }

  const lgin={
    border: 'none',
    borderBottom: '2px solid #D1D1D4',
    background: 'none',
    padding: '10px',
    paddingLeft: '24px',
    fontWeight: '700',
    width: '75%',
  }
  
  const chgbtn1 ={
    marginLeft: '70%',
    background: '#fff',
    fontSize: '14px',
    marginTop: '30px',
    padding: '16px 20px',
    borderRadius: '26px',
    border: '1px solid #D4D3E8',
    textTransform: 'uppercase',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    color: '#4C489D',
    boxShadow: '0px 2px 2px #5C5696',
    cursor: 'pointer',
  }
  return (
    <div style={{backgroundColor : "#AB90BF"}}>
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

      <div className="container  Login" style={{width: '70%'}} >
        <div className="row">
          <div className="col-md-3 Left_Box">
            <img src="https://img.icons8.com/external-flaticons-flat-flat-icons/512/1FB141/external-ballons-festivals-and-holidays-flaticons-flat-flat-icons.png" alt="" />
            <h3>Welcome To</h3>
            <h2>College Connection</h2>
          </div>
          <div className="col-md-9  Right_Box">
            <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
              <li className="nav-item">
                <a className="nav-link active"
                  id="home-tab"
                  data-toggle="tab"
                  href="#home"
                  role="presentation"
                  aria-controls="home"
                  aria-selected="true">Singup</a>
              </li>
              <li className="nav-item">
                <a className="nav-link"
                  id="profile-tab"
                  data-toggle="tab"
                  href="#profile"
                  role="presentation"
                  aria-controls="profile"
                  aria-selected="false">Login</a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="home"
                role="tabpanel" aria-labelledby="home-tab">
                <h3 className="Heading">{cclogo}Signup</h3>
                <div className="row register-form">
                  <div className="col-md-6">
                    <div className="form-group  ">
                      <input type="text" required
                        className="form-control "style={lgin}
                        name='firstname'
                        placeholder="First Name"
                        onChange={(event) => {
                          setFirstName(event.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group ">
                      <input type="email"
                        className="form-control "style={lgin}
                        name='email'
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                        placeholder="Email" />
                    </div>
                    <div className="form-group ">
                      <input type="password"
                        className="form-control "style={lgin}
                        name='password'
                        placeholder="Password"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group ">
                      <input type="text"
                        className="form-control "style={lgin}
                        name='lastname'
                        onChange={(event) => {
                          setLastName(event.target.value);
                        }}
                        placeholder="Last Name" />
                    </div>
                    <div className="form-group ">
                      <input type="text"
                        className="form-control "style={lgin}
                        name='Class'
                        onChange={(event) => {
                          setClass(event.target.value)
                        }}
                        placeholder="Class" />
                    </div>
                    <div className="form-group ">
                      <input type="text"
                        className="form-control "style={lgin}
                        name='Major'
                        onChange={(event) => {
                          setMajor(event.target.value)
                        }}
                        placeholder="Major" />
                    </div>
                    <button type="button"
                      onClick={(event) => {
                        signupHangler(event);
                      }}
                      className="btn btn-outline-info"style={chgbtn1} ><span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                      hidden={hidden}
                    ></span>Register</button>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade show" id="profile" role="tabpanel"
                aria-labelledby="profile-tab">
                <div><h3 style={{ paddingRight: '32%' }} className="Heading">{cclogo}Login</h3></div>
                <div className="row register-form" id="hide1">
                  <div className="col-md-7">
                    <div className="form-group">
                      <input type="text"
                        className="form-control "style={lgin}
                        placeholder="Email"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input type="password"
                        className="form-control "style={lgin}
                        placeholder="Password"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <button type="button"
                        onClick={openForm}
                        className="btn chgbtn2 btn-outline-info">Forget Password ?</button>
                    </div>
                    <div className="form-group">
                      <button type="button"
                        className="btn btn-outline-info" style={chgbtn1}
                        onClick={(event) => {
                          loginHandler(event);
                        }}
                        disabled={isFetching}
                      >Login  <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                        hidden={hidden}
                      ></span></button>
                    </div>
                  </div>
                </div>
                <div className="col register-form hero " id="forget">
                  <div className="col-md-8">
                    <div className="form-group">
                      <input type="text"
                        className="form-control "style={lgin}
                        placeholder="Recovery Email id"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }} />
                    </div>
                    <div className="form-group">
                      <button type="button"
                        onClick={(event) => {
                          mailSender(event);
                        }}
                        className="btn chgbtn2 btn-outline-info">Send mail</button>
                    </div>
                    <div className="form-group">
                      <button type="submit"
                        className="btn btn-outline-info" style={chgbtn1}
                        onClick={closeForm}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )

}
