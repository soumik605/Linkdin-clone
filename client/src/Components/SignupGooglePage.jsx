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
  SigninLink,
} from "./Style/Signup";
import { useHistory, Link, useLocation } from "react-router-dom";

const SignupGooglePage = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [details1, setDetails1] = useState({
    email: location.res.profileObj.email,
    password: "",
    name: location.res.profileObj.name,
    image: location.res.profileObj.imageUrl,
  });

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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              margin: "50px auto 20px auto",
            }}
          >
            <img
              src={location.res.profileObj && location.res.profileObj.imageUrl}
              alt=""
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <div style={{ paddingLeft: "20px", textAlign: "left" }}>
              <h2>{location.res.profileObj && location.res.profileObj.name}</h2>
              <h4>
                {location.res.profileObj && location.res.profileObj.email}
              </h4>
            </div>
          </div>

          <Input>
            <h1>Password (6 or more characters)</h1>
            <input
              value={details1.password}
              name="password"
              onChange={(e) => {
                setDetails1({ ...details1, password: e.target.value });
              }}
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
          {location.res.profileObj &&
            location.res.profileObj.email !== "" &&
            details1.password !== "" && (
              <Join
                onClick={(e) =>
                  history.push({ pathname: "/signup2", state: details1 })
                }
              >
                Agree & Next
              </Join>
            )}
          {((location.res.profileObj && location.res.profileObj.email === "") ||
            details1.password === "") && (
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

export default SignupGooglePage;
