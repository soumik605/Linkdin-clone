import React, { useContext } from "react";
import { Container, PopupBox } from "../Style/LogoutModel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { userContext } from "../../App";
import { Link, useHistory } from "react-router-dom";
import { border } from "@mui/system";

const LogoutModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  return (
    <Container>
      <ClickAwayListener
        onClickAway={() => {
          props.model(false);
        }}
      >
        <PopupBox>
          <img src={state && state.profile_pic} alt="" />
          <h3>{state && state.name}</h3>
          <Link
            to="/profile"
            style={{
              margin: "10px",
              border: "2px solid blue",
              padding: "5px",
              borderRadius: "20px",
              fontSize: "16px",
            }}
          >
            View Profile
          </Link>
          <button
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/home");
            }}
          >
            Sign out
          </button>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export default LogoutModel;
