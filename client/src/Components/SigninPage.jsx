import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { userContext } from "../App";
import { useHistory, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FullScreenLoader from "./Models/FullScreenLoader";
import GoogleLogin from "react-google-login";

const SigninPage = () => {
  const { dispatch } = useContext(userContext);
  const [showPwd, setShowPwd] = useState(false);
  const alert = useAlert();
  const [showLoader, setShowLoader] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const addUserDetails = () => {
    setShowLoader(true);
    fetch("/signin", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: details.email,
        password: details.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
          setShowLoader(false);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          setShowLoader(false);

          alert.success("Login Successful");
          history.push("/");
        }
      });
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const responseGoogle = (response) => {
    setDetails({ ...details, ["email"]: response.profileObj.email });
  };

  return (
    <MainContainer>
      {showLoader && <FullScreenLoader />}
      <Navbar>
        <Logo>
          <Link to="/home" exact>
            <img src="/Images/login-icon.png" alt="" />
          </Link>
        </Logo>
      </Navbar>
      <Container>
        <Header>
          <h1>Sign in</h1>
          <h4>Stay updated on your professional world</h4>
        </Header>
        <Section>
          <EmailField>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              onChange={(e) => handleChange(e)}
              name="email"
              value={details.email}
              autoFocus={true}
            />
          </EmailField>

          <PasswordField>
            <FormControl sx={{ width: "100%" }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Password
              </InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPwd ? "text" : "password"}
                value={details.password}
                name="password"
                onChange={(e) => handleChange(e)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPwd(!showPwd)}
                      edge="end"
                    >
                      {showPwd ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </PasswordField>
          <Forgot>
            <a href="#forgotpassword">Forgot password ?</a>
          </Forgot>
          {details.email !== "" && details.password !== "" && (
            <Signin onClick={() => addUserDetails()}>Signin</Signin>
          )}
          {(details.email === "" || details.password === "") && (
            <Signin
              style={{
                backgroundColor: "#fff",
                color: "#0066ff",
                cursor: "not-allowed",
                border: "1px solid #0066ff",
              }}
            >
              Signin
            </Signin>
          )}
           <GoogleLogin
            clientId="988766958233-i59rm3i38at06gqvr1e89slamjsrrj1m.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Section>
      </Container>
      <Join>
        New to Linkedin?{" "}
        <Link to="/signup1" exact>
          Join now 
        </Link>
      </Join>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const Navbar = styled.nav`
  top: 0px;
  width: 100%;
  display: flex;
`;
const Logo = styled.div`
  float: left;
  padding: 15px 40px;

  & > a > img {
    height: 34px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
  box-shadow: 2px 2px 2px 1px gray;
  border-radius: 10px;
  background-color: #fdfdfd;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Header = styled.header`
  display: "flex";
  flex-direction: "column";
  padding: 10px 0;

  & > h1 {
    text-align: left;
    font-weight: 500;
  }

  & > h4 {
    text-align: left;
    font-weight: 400;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const EmailField = styled.div`
  margin: auto;
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const PasswordField = styled.div`
  margin: auto;
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Forgot = styled.div`
  padding: 5px 0;
  width: 100%;

  & > a {
    float: left;
    font-weight: 500;
  }
`;

const Signin = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 25px;
  background-color: #0044ff;
  color: white;
  margin: 10px 0;
  font-size: 20px;
  border: none;

  &:hover {
    background-color: #0037ce;
  }
`;

const Join = styled.div`
  margin: auto;
  padding: 30px 0 0;

  & > a {
    font-weight: 500;
  }
`;
export default SigninPage;
