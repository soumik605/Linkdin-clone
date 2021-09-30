import React, { useContext, useState } from "react";
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

const UserEditModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  const alert = useAlert();
  const [details, setDetails] = useState({
    name: state.name,
    email: state.email,
    address: state.address,
    about: state.about,
  });


  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const SaveUserDetails = (e) => {
    fetch("/editdetails", {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name: details.name,
        email: details.email,
        address: details.address,
        about: details.about,
        profile_pic: state.profile_pic,
        cover_pic: state.cover_pic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          dispatch({
            type: "UPDATE",
            payload: {
              name: data.user.name,
              email: data.user.email,
              address: data.user.address,
              about: data.user.about,
            },
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          props.model(false);
        }
      });
  };

  return (
    <Container>
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <Close onClick={() => props.model(false)}>x</Close>
          <h2>Edit Intro</h2>
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
            <h4>About</h4>
            <input
              placeholder={state ? state.about : "Loading..."}
              name="about"
              value={details.about}
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

export default UserEditModel;
