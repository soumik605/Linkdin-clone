import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";
import { signupUser } from "../service/Actions/AuthAction";

const UserDetails = (props) => {
  const alert = useAlert();
  const location = useLocation();
  const history = useHistory();
  const [showLoader, setShowLoader] = useState(false);
  const [details, setDetails] = useState({
    email: location.state.email,
    password: location.state.password,
    name: location.state.name,
    address: "",
    image: location.state.image,
  });

  useEffect(() => {
    if (props.authUser) {
      if (props.authUser.signupError) {
        alert.error(props.authUser.signupError);
        setShowLoader(false);
        history.push("/signup1");
      } else if (props.authUser.signupMessage) {
        alert.success(props.authUser.signupMessage);
        setShowLoader(false);
        history.push("/signin");
      }
    }
  }, [props.authUser]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    setShowLoader(true);
    await props.signupUser(details);
  };

  return (
    <Container>
      {showLoader && <FullScreenLoader />}
      <Form>
        <Header>
          <Logo>
            <Link to="/home">
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
              value={details.name}
              name="name"
              onChange={(e) => handleChange(e)}
              autoFocus={true}
              style={{ textTransform: "capitalize" }}
            />
          </Input>
          <Input>
            <h1>Address</h1>
            <input
              value={details.address}
              name="address"
              onChange={(e) => handleChange(e)}
            />
          </Input>

          {details.name === "" ? (
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
            Already on Linkedin? <Link to="/signin">Sign in</Link>
          </SigninLink>
        </Section>
      </Form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.AuthReducer,
});

const mapDispatchToProps = (dispatch) => ({
  signupUser: (details) => dispatch(signupUser(details)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
