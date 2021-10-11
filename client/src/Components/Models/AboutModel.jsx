import React, { useContext, useState } from "react";
import styled from "styled-components";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import TextField from "@mui/material/TextField";
import { userContext } from "../../App";
import FullScreenLoader from "./FullScreenLoader";

const AboutModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  const [about, setAbout] = useState(state.about);
  const [showLoader, setShowLoader] = useState(false);

  const SaveAbout = () => {
    setShowLoader(true);
    fetch("/editdetails", {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        address: state.address,
        about,
        headline: state.headline,
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
      {showLoader && <FullScreenLoader />}
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <div style={{ borderBottom: "1px solid lightgrey" }}>
            <h3>Edit About</h3>
            <Close onClick={() => props.model(false)}>x</Close>
          </div>
          <h4 style={{ textAlign: "left", marginTop: "30px" }}>Description</h4>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <button onClick={() => SaveAbout()}>Save</button>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #00000050;
  top: 0px;
  left: 0px;
  z-index: 99;
  position: fixed;
  box-sizing: border-box;
  overflow: hidden;
`;

export const PopupBox = styled.div`
  position: relative;
  width: 90%;
  max-width: 700px;
  margin: auto;
  height: 50vh;
  top: 15vh;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 10px;

  & > div {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }
  & > input {
    width: 100%;
    height: 150px;
  }

  & > button {
    padding: 10px;
    background-color: #0a66c2;
    color: white;
    width: 70px;
    border-radius: 20px;
    margin: auto 10px 10px auto;
    border: none;
  }

  @media (max-width: 768px) {
    height: 60vh;
    width: 100%;
    top: 20vh;
    margin: auto;
  }
`;

export const Close = styled.div`
  content: "x";
  cursor: pointer;
  position: relative;
  top: 0;
  margin-left: auto;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  font-size: 30px;
  display: inline-block;

  &:hover {
    background-color: lightgray;
  }
`;

export default AboutModel;
