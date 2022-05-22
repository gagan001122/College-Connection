import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, FormGroup, FormText} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [uClass, setClass] = useState(0)
  const [major, setMajor] = useState('')
  const [hidden, setHidden] = useState(true);
  const signupHangler = (event) => {
    event.preventDefault();
    setHidden(false);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
        class: uClass,
        major:major
      })
      .then((resp) => {
        setHidden(true);
        console.log(resp.data);
        localStorage.setItem("authToken", resp.data.token);
        navigate('/home', {replace : true})
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
  return (
    <Wrapper>
      <h1 style={{ color: "#000" }}>College-Connection</h1>
      <Container className="mb-3">
        <Form style={{ display: "flex", flexDirection: "column" }}>
          <FormGroup className="mb-3">
            <Input
              autoComplete="email"
              name="email"
              placeholder="Email"
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup style={{display: "flex"}}>
            <Input
              autoComplete="first_name"
              name="first_name"
              placeholder="First Name"
              type="text"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <Input
              autoComplete="last_name"
              name="last_name"
              placeholder="Last Name"
              type="text"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Input
              autoComplete="current-password"
              name="password"
              placeholder="Password"
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup style={{display: "flex"}}>
            <Input
              autoComplete="Class"
              name="Class"
              placeholder="Class"
              type="number"
              onChange={(event) => {
                setClass(event.target.value)
              }}
            />
            <Input
              autoComplete="Major"
              name="Major"
              placeholder="Major"
              type="text"
              onChange={(event) => {
                setMajor(event.target.value)
              }}
            />
          </FormGroup>
          {/*Signup Button goes Here*/}
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "#019F87",
              border: "none",
              borderRadius: 25,
              width: '75%',
              alignSelf: 'center'
            }}
            onClick={(event) => {
              signupHangler(event);
            }}
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              hidden={hidden}
            ></span>
            Signup
          </button>
          <hr className="mb-3" />
          <FormText className="mb-3" style={{ alignSelf: "center" }}>
            Have An Existing Account?
          </FormText>
          <button
            className="btn btn-primary mb-3"
            style={{
              backgroundColor: "#205567",
              border: "none",
              borderRadius: 25,
              width: '75%',
              alignSelf: 'center'
            }}
            onClick={(event) => {
              event.preventDefault();
              console.log("Login Button Was Clicked");
              navigate('/login', { replace: true })
            }} 
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              hidden={true}
            ></span>
            Login
          </button>
        </Form>
      </Container>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  height: 100vh;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Container = styled.div`
  height: 50vh;
  width: 75vw;
  @media(min-width: 750px){
    width: 50vh;
  }
  @media(min-height: 1000px){
    height: 37.5vh;
  }
  @media(max-height: 999px) and (min-height: 901px){
    height: 45vh;
  }
  @media(max-height: 900px) and (min-height: 801px){
    height: 50vh;
  }
  @media (max-height: 800px) and (min-height: 700px) {
    height: 57.5vh;
  }
  @media (max-height: 699px) and (min-height: 600px) {
    height: 65vh;
  }
  @media (max-height: 599px) and (min-height: 500px) {
    height: 70vh;
  }
  @media (max-height: 499px) and (min-height: 400px) {
    height: 75vh;
  }
  @media (max-height: 399px) {
    height: 75vh;
  }
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
`;

export default SignUpPage;
