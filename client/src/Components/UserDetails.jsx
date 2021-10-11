import React, { useState,useEffect } from "react";
import {
  Container,
  Form,
  Header,
  Logo,
  Heading,
  Section,
  Input,
  Join,
  SigninLink,
} from "./Style/Signup";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import FullScreenLoader from "./Models/FullScreenLoader";

const UserDetails = () => {
  const alert = useAlert();
  const location = useLocation();
  const history = useHistory();
  const [showLoader, setShowLoader] = useState(false)
  const [details2, setDetails2] = useState({
    email: location.state.email,
    password: location.state.password,
    name: "",
    address: "",
  });


  const handleChange = (e) => {
    setDetails2({ ...details2, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    setShowLoader(true)
    fetch("/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: details2.name,
        email: details2.email,
        password: details2.password,
        address: details2.address,
        education: details2.education,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
          setShowLoader(false)
          history.push("/signup1");
        } else {
          alert.success(data.message);
          setShowLoader(false)
          history.push("/signin");
        }
      });
  };

  return (
    <Container>
      {showLoader && <FullScreenLoader />}
      <Form>
        <Header>
          <Logo>
            <Link to="/home" exact>
              <img src="/Images/login-icon.png" alt="" />
            </Link>
          </Logo>
          <Heading>
            <h1>Make the most of your professional life</h1>
          </Heading>
        </Header>

        <Section>
          <Input>
            <h1>Name*</h1>
            <input
              value={details2.name}
              name="name"
              onChange={(e) => handleChange(e)}
              autoFocus={true}
              style={{ textTransform: "capitalize" }}
            />
          </Input>
          <Input>
            <h1>Address</h1>
            <input
              value={details2.address}
              name="address"
              onChange={(e) => handleChange(e)}
            />
          </Input>

          {details2.name === "" ? (
            <Join
              style={{
                backgroundColor: "#b6ebf1",
                color: "#0066ff",
                cursor: "not-allowed",
              }}
            >
              Join
            </Join>
          ) : (
            <Join onClick={() => addUser()}>Join</Join>
          )}

          <SigninLink>
            Already on Linkedin?{" "}
            <Link to="/signin" exact>
              Sign in
            </Link>
          </SigninLink>
        </Section>
      </Form>
    </Container>
  );
};

export default UserDetails;
