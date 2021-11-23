import React, { useEffect } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { Close, Container, PopupBox, UserBox } from "../Style/SearchModel";
import { connect } from "react-redux";
import { allUser } from "../../service/Actions/UserActions";

const SearchModel = (props) => {
  useEffect(() => {
    props.allUser();
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
            {props.user.allUser
              .filter((fuser) => {
                if (props.name === "") {
                  return null;
                } else if (
                  fuser.name.toLowerCase().includes(props.name.toLowerCase())
                ) {
                  return fuser;
                } else {
                  return null;
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

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => ({
  allUser: () => dispatch(allUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchModel);
