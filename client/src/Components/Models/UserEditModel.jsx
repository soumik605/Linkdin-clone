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
import Loader2 from "./FullScreenLoader";

const UserEditModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  const alert = useAlert();
  const [showLoader, setShowLoader] = useState(false);
  const [details, setDetails] = useState({
    name: state.name,
    email: state.email,
    address: state.address,
    headline: state.headline,
    about: state.about,
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const SaveUserDetails = (e) => {
    setShowLoader(true);
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
        headline: details.headline,
        profile_pic: state.profile_pic,
        cover_pic: state.cover_pic,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
          setShowLoader(false);
        } else {
          dispatch({
            type: "UPDATE",
            payload: {
              name: data.user.name,
              email: data.user.email,
              address: data.user.address,
              headline: data.user.headline,
              about: data.user.about,
            },
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          setShowLoader(false);
          props.model(false);
        }
      });
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

export default UserEditModel;
