import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  PopupBox,
  Close,
  Save,
  InputBox,
} from "../Style/UserEditModel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { userContext } from "../../App";
import { useAlert } from "react-alert";
import Loader2 from "./FullScreenLoader";
import { editDetails } from "../../service/Actions/UserActions";
import { connect } from "react-redux";

const UserEditModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  const [showLoader, setShowLoader] = useState(false);
  const [details, setDetails] = useState({
    name: state.name,
    email: state.email,
    address: state.address,
    headline: state.headline,
    about: state.about,
  });

  useEffect(() => {
    if (props.user.currentUser) {
      dispatch({
        type: "UPDATE",
        payload: {
          name: props.user.currentUser.name,
          email: props.user.currentUser.email,
          address: props.user.currentUser.address,
          headline: props.user.currentUser.headline,
          about: props.user.currentUser.about,
        },
      });
      localStorage.setItem("user", JSON.stringify(props.user.currentUser));
    }
  }, [props.user.currentUser]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const SaveUserDetails = async (e) => {
    setShowLoader(true);
    const userDetails = {
      name: details.name,
      email: details.email,
      address: details.address,
      about: details.about,
      headline: details.headline,
      profile_pic: state.profile_pic,
      cover_pic: state.cover_pic,
    };
    await props.editDetails(userDetails);
    setShowLoader(false);
    props.model(false);
  };

  return (
    <Container>
      {showLoader && <Loader2 />}
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid lightgrey",
              marginBottom: "20px",
            }}
          >
            <h2>Edit intro</h2>
            <Close onClick={() => props.model(false)}>x</Close>
          </div>

          <InputBox>
            <h4>Name*</h4>
            <input
              placeholder={state ? state.name : "Loading..."}
              name="name"
              value={details.name}
              onChange={(e) => handleChange(e)}
            />
          </InputBox>
          <InputBox>
            <h4>Email*</h4>
            <input
              placeholder={state ? state.email : "Loading..."}
              name="email"
              value={details.email}
              onChange={(e) => handleChange(e)}
            />
          </InputBox>
          <InputBox>
            <h4>Headline</h4>
            <input
              placeholder={state ? state.headline : "Loading..."}
              name="headline"
              value={details.headline}
              onChange={(e) => handleChange(e)}
            />
          </InputBox>

          <InputBox>
            <h4>Address</h4>
            <input
              placeholder={state ? state.address : "Loading..."}
              name="address"
              value={details.address}
              onChange={(e) => handleChange(e)}
            />
          </InputBox>
          <Save onClick={() => SaveUserDetails()}>Save</Save>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => ({
  editDetails: (userDetails) => dispatch(editDetails(userDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEditModel);
