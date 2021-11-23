import React, { useState, useContext, useEffect } from "react";
import {
  ChBtn,
  CheckBox,
  Container,
  LeftDiv,
  ReqCont,
  ReqPic,
  RequestBox,
  ReqUser,
  RightDiv,
  SuggestionBox,
  UserBox,
  Cover,
  Profile,
  Details,
  ConnectBtn,
  LeftUserBox,
  LeftProfile,
  Message,
} from "./Style/MyConn";
import { userContext } from "../App";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Loader1 from "./Loader1";
import { connect } from "react-redux";
import {
  fetchUserPosts,
  fetchUserDetails,
  requestConnection,
  withdrawConnection,
  rejectConnection,
  acceptConnection,
  removeConnection,
  myDetails,
  allUser,
} from "../service/Actions/UserActions";
import { createRoom, deleteRoom } from "../service/Actions/RoomAction";

const MyConnections = (props) => {
  const { state } = useContext(userContext);
  const [showAcceptConnBtn, setShowAcceptConnBtn] = useState(true);
  const [showAddConnBtn, setShowAddConnBtn] = useState(true);
  const history = useHistory();
  const [showMyConnLoader, setShowMyConnLoader] = useState(true);
  const [showConnReqLoader, setShowConnReqLoader] = useState(true);
  const [showSuggestionLoader, setShowSuggestionLoader] = useState(true);

  const acceptConnection = async (userid) => {
    setShowAcceptConnBtn(false);
    await props.acceptConnection(userid);
    await props.createRoom(userid);
    setShowAcceptConnBtn(true);
  };

  const rejectConnection = async (userid) => {
    if (window.confirm("Reject Connection Request ? ")) {
      setShowAcceptConnBtn(false);
      await props.rejectConnection(userid);
      setShowAcceptConnBtn(true);
    }
  };

  const WithdrawRequest = async (userid) => {
    if (window.confirm("Withdraw Connection Request ? ")) {
      await props.withdrawConnection(userid);
    }
  };

  const callAllUserAndMyDetails = async () => {
    await props.allUser();
    setShowSuggestionLoader(false);
    await props.myDetails();
    setShowMyConnLoader(false);
    setShowConnReqLoader(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (state) {
        callAllUserAndMyDetails();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [state]);

  const RequestConnection = async (userid) => {
    setShowAddConnBtn(false);
    await props.requestConnection(userid);
    setShowAddConnBtn(true);
  };

  return (
    <>
      <NavBar />
      <Container>
        <LeftDiv>
          <h3>My Connections</h3>
          {!props.user.myDetails && showMyConnLoader && <Loader1 />}
          {props.user.myDetails &&
            props.user.myDetails.connections.map((user) => (
              <LeftUserBox key={user._id}>
                <LeftProfile src={user.profile_pic} alt="" />
                <div>
                  <h4>
                    {" "}
                    <a href={`/profile/${user._id}`}>{user.name}</a>
                  </h4>
                  <h5>{user.headline}</h5>
                </div>
                <Message onClick={() => history.push("/chat")}>Message</Message>
              </LeftUserBox>
            ))}
        </LeftDiv>
        <RightDiv>
          <ReqCont>
            <h3>Invitations</h3>
            {!props.user.myDetails && showConnReqLoader && <Loader1 />}
            {props.user.myDetails &&
              props.user.myDetails.conrequests.map((user) => (
                <RequestBox key={user._id}>
                  <ReqPic>
                    <img src={user.profile_pic} alt="" />
                  </ReqPic>
                  <ReqUser>
                    <h3>
                      <a href={`/profile/${user._id}`}>{user.name}</a>
                    </h3>
                    <h5 style={{ fontWeight: 450 }}>{user.headline}</h5>
                  </ReqUser>
                  <CheckBox>
                    <ChBtn onClick={() => rejectConnection(user._id)}>
                      Ignore
                    </ChBtn>
                    {showAcceptConnBtn ? (
                      <ChBtn
                        onClick={() => {
                          setShowAcceptConnBtn(false);
                          acceptConnection(user._id);
                        }}
                      >
                        Accept
                      </ChBtn>
                    ) : (
                      <ChBtn style={{ cursor: "not-allowed" }}>Accept</ChBtn>
                    )}
                  </CheckBox>
                </RequestBox>
              ))}
          </ReqCont>
          <SuggestionBox>
            <h3>Suggested For You</h3>
            {props.user.allUser.length === 0 && showSuggestionLoader && (
              <Loader1 />
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
                  <UserBox key={user._id}>
                    <Cover>
                      <img src={user.cover_pic} alt="" />
                    </Cover>
                    <Profile>
                      <img src={user.profile_pic} alt="" />
                    </Profile>
                    <Details>
                      <h3>
                        <a href={`/profile/${user._id}`}>{user.name}</a>
                      </h3>
                      <h5 style={{ fontWeight: 450 }}>{user.headline}</h5>
                    </Details>

                    {user.conrequests.includes(state._id) ? (
                      <ConnectBtn onClick={() => WithdrawRequest(user._id)}>
                        pending
                      </ConnectBtn>
                    ) : showAddConnBtn ? (
                      <ConnectBtn
                        onClick={() => {
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
                  </UserBox>
                ))}
          </SuggestionBox>
        </RightDiv>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserPosts: (userid) => dispatch(fetchUserPosts(userid)),
  fetchUserDetails: (userid) => dispatch(fetchUserDetails(userid)),
  requestConnection: (userid) => dispatch(requestConnection(userid)),
  withdrawConnection: (userid) => dispatch(withdrawConnection(userid)),
  rejectConnection: (userid) => dispatch(rejectConnection(userid)),
  acceptConnection: (userid) => dispatch(acceptConnection(userid)),
  removeConnection: (userid) => dispatch(removeConnection(userid)),

  createRoom: (userid) => dispatch(createRoom(userid)),
  deleteRoom: (userid) => dispatch(deleteRoom(userid)),

  myDetails: () => dispatch(myDetails()),
  allUser: () => dispatch(allUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyConnections);
