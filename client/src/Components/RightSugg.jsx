import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { userContext } from "../App";
import Skeleton from "@mui/material/Skeleton";

import { connect } from "react-redux";
import {
  allUser,
  requestConnection,
  withdrawConnection,
} from "../service/Actions/UserActions";

const RightSugg = (props) => {
  const [showSuggestionLoader, setShowSuggestionLoader] = useState(true);
  const [showReqConnBtn, setShowReqConnBtn] = useState(true);
  const { state } = useContext(userContext);

  const fetchAllUser = async () => {
    await props.allUser();
    setShowSuggestionLoader(false);
  };

  useEffect(() => {
    if (state) {
      const interval = setInterval(() => {
        fetchAllUser();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [state]);

  const WithdrawRequest = async (user) => {
    if (window.confirm("Withdraw Connection Request ? ")) {
      await props.withdrawConnection(user._id);
    }
  };

  const RequestConnection = async (userid) => {
    setShowReqConnBtn(false);
    await props.requestConnection(userid);
    setShowReqConnBtn(true);
  };

  return (
    <>
      <h3 style={{ marginLeft: "10px" }}>People you may know</h3>
      {props.user.allUser.length === 0 && showSuggestionLoader && (
        <User>
          <Skeleton
            variant="circular"
            animation="wave"
            width={50}
            height={50}
          />
          <RightDetails>
            <Skeleton variant="text" animation="wave" width={150} height={30} />
            <Skeleton variant="text" animation="wave" width={180} height={18} />
            <Skeleton
              variant="rectengular"
              animation="wave"
              width={80}
              height={30}
              style={{ borderRadius: "15px", marginTop: "5px" }}
            />
          </RightDetails>
        </User>
      )}

      {props.user.allUser.length !== 0 &&
        props.user.allUser
          .filter((s_user) => {
            if (
              s_user._id === state._id ||
              s_user.connections.includes(state._id) ||
              s_user.myrequests.includes(state._id)
            ) {
              return null;
            } else {
              return s_user;
            }
          })
          .map((user) => (
            <User key={user._id}>
              <RightProfile src={user.profile_pic} alt="" />
              <RightDetails>
                <h3>
                  {" "}
                  <a href={`/profile/${user._id}`}>{user.name}</a>
                </h3>
                <h5>{user.headline}</h5>

                {user.conrequests.includes(state._id) ? (
                  <ConnectBtn onClick={() => WithdrawRequest(user)}>
                    Pending
                  </ConnectBtn>
                ) : showReqConnBtn ? (
                  <ConnectBtn
                    onClick={() => {
                      setShowReqConnBtn(false);
                      RequestConnection(user._id);
                    }}
                  >
                    Connect
                  </ConnectBtn>
                ) : (
                  <ConnectBtn style={{ cursor: "not-allowed" }}>
                    Connect
                  </ConnectBtn>
                )}
              </RightDetails>
            </User>
          ))}
    </>
  );
};

export const RightProfile = styled.img`
  height: 50px;
  width: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;
export const RightDetails = styled.div`
  width: calc(100% - 70px);
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  & > h5,
  & > h3 {
    text-align: left;
  }
`;
export const User = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
`;
export const ConnectBtn = styled.button`
  width: fit-content;
  padding: 5px 10px;
  margin: 5px 0px;
  background-color: white;
  color: grey;
  border: 1px solid gray;
  border-radius: 15px;

  &:hover {
    background-color: lightgray;
    color: black;
  }
`;

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => ({
  requestConnection: (userid) => dispatch(requestConnection(userid)),
  withdrawConnection: (userid) => dispatch(withdrawConnection(userid)),
  allUser: () => dispatch(allUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RightSugg);
