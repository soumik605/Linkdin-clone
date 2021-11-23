import React, { useState, useEffect, useContext } from "react";
import ChatModel from "./Models/ChatModel";
import NavBar from "./NavBar";
import { ChatBox, ChatList, Container, UserBox } from "./Style/ChatPage";
import { userContext } from "../App";
import Loader1 from "./Loader1";
import { connect } from "react-redux";
import { myDetails } from "../service/Actions/UserActions";

const ChatPage = (props) => {
  const [showChat, setShowChat] = useState(false);
  const [friend, setFriend] = useState("");
  const { state } = useContext(userContext);
  const [showLoader, setShowLoader] = useState(true);

  const callMyDetails = async () => {
    await props.myDetails();
    setShowLoader(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (state) {
        callMyDetails();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <>
      {showChat && <ChatModel model={setShowChat} data={friend} />}
      <NavBar />
      <Container>
        <ChatList>
          <h2>Messaging</h2>
          {!props.user.myDetails && showLoader && <Loader1 />}
          {props.user.myDetails &&
            props.user.myDetails.connections.map((user) => (
              <UserBox
                key={user._id}
                onClick={() => {
                  setFriend(user);
                  setShowChat(true);
                }}
              >
                <img src={user.profile_pic} alt="" />
                <h3>{user.name}</h3>
              </UserBox>
            ))}
        </ChatList>
        <ChatBox></ChatBox>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => ({
  myDetails: () => dispatch(myDetails()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
