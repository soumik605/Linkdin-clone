import React, { useState } from "react";
import {
  Container,
  Form,
  Header,
  Logo,
  Heading,
  Section,
  Input,
  Agree,
  Join,
  GoogleJoin,
  SigninLink,
} from "./Style/Signup";
import { useHistory, Link } from "react-router-dom";

const SignupPage = () => {
  const history = useHistory();
  const [details1, setDetails1] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setDetails1({ ...details1, [e.target.name]: e.target.value });
  };

  return (
    <Container>
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
            <h1>Email address</h1>
            <input
              value={details1.email}
              name="email"
              onChange={(e) => handleChange(e)}
              autoFocus={true}
              style={{ textTransform: "lowercase" }}
            />
          </Input>
          <Input>
            <h1>Password (6 or more characters)</h1>
            <input
              value={details1.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </Input>
          <Agree>
            <p>
              By clicking Agree & Join, you agree to the LinkedIn
              <a href="#agreement">
                {" "}
                User Agreement, Privacy Policy, and Cookie Policy{" "}
              </a>
              .
            </p>
          </Agree>
          {details1.email !== "" && details1.password !== "" && (
            <Join
              onClick={(e) =>
                history.push({ pathname: "/signup2", state: details1 })
              }
            >
              Agree & Next
            </Join>
          )}

          {(details1.email === "" || details1.password === "") && (
            <Join
              style={{
                backgroundColor: "#b6ebf1",
                color: "#0066ff",
                cursor: "not-allowed",
              }}
            >
              Agree & Next
            </Join>
          )}

          <GoogleJoin>Join with Google</GoogleJoin>
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

export default SignupPage;
