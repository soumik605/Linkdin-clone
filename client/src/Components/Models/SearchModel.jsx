import React, { useState, useEffect, useContext } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Close, Container, PopupBox, UserBox } from "../Style/SearchModel";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../../App";
import Loader1 from "../Loader1";

const SearchModel = (props) => {
  const [alluser, setAlluser] = useState([]);
  const history = useHistory();
  const { state } = useContext(userContext);

  useEffect(async () => {
    await fetch("/alluser", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAlluser(res.users);
      });
  }, []);

  return (
    <Container>
      <ClickAwayListener
        onClickAway={() => {
          props.showName("");
          props.model(false);
        }}
      >
        <PopupBox>
          <Close
            onClick={() => {
              props.showName("");
              props.model(false);
            }}
          >
            X
          </Close>
          <h3>Showing results of "{props.name}"</h3> <hr />
          <div style={{ overflowY: "scroll", overflowX: "hidden" }}>
            {alluser
              .filter((fuser) => {
                if (props.name === "") {
                  return null;
                } else if (
                  fuser.name.toLowerCase().includes(props.name.toLowerCase())
                ) {
                  return fuser;
                }
              })
              .map((user) => {
                return (
                  <UserBox key={user._id}>
                    <img src={user.profile_pic} alt="" />
                    <div>
                      <h3>
                        <a href={`/profile/${user._id}`}>{user.name}</a>
                      </h3>
                      <h5>{user.about}</h5>
                    </div>
                  </UserBox>
                );
              })}
          </div>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export default SearchModel;
