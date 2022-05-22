import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [hidden, setHidden] = useState(true);
  const mailSender = (event) => {
    event.preventDefault();
    setHidden(false);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/forgot/mailer`, {
        email: email,
      })
      .then((resp) => {
        setHidden(true);
        navigate(`/verification/${email}`, {replace: true})
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
  return (
    <Wrapper>
      <Container>
        <h3 className="text-center mb-3">Forgot your Password?</h3>
        <hr/>
        <div className="mb-3 text-center">
          Please enter your email address to search for your account.
        </div>
        <Form style={{ display: "flex", flexDirection: "column" }}>
          <FormGroup className="mb-3">
            <Input
              autoComplete="email"
              name="email"
              placeholder="Email address"
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </FormGroup>
          <button
            className="btn btn-primary mb-3"
            style={{
              backgroundColor: "#7CCEAB",
              border: "none",
              borderRadius: 25,
            }}
            onClick={(event) => {
              mailSender(event);
            }}
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              hidden={hidden}
            ></span>
            Send OTP
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  height: 40vh;
  width: 50vh;
  @media(min-height: 900px){
    height: 27.5vh;
  }
  @media (max-height: 800px) and (min-height: 751px) {
    height: 35vh;
  }
  @media (max-height: 750px) and (min-height: 680px) {
    height: 40vh;
  }
  @media (max-height: 679px) {
    height: 45vh;
  }
  @media (max-width: 500px) {
    width: 70vw;
  }
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
`;

export default ForgotPassword;
