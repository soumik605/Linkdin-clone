import React, { useState, useEffect, useContext } from "react";
import ChatModel from "./Models/ChatModel";
import NavBar from "./NavBar";
import { ChatBox, ChatList, Container, UserBox } from "./Style/ChatPage";
import { userContext } from "../App";
import Loader1 from "./Loader1";

const ChatPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [friend, setFriend] = useState("");
  const { state } = useContext(userContext);
  const [mydetails, setMydetails] = useState(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (state) {
      const interval = setInterval(() => {
        fetch(`/mydetails`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert.error(data.error);
            } else {
              setMydetails(data.user);
              setShowLoader(false);
            }
          });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state]);

  return (
    <>
      {showChat && <ChatModel model={setShowChat} data={friend} />}
      <NavBar />
      <Container>
        <ChatList>
          <h2>Messaging</h2>
          {showLoader && <Loader1 />}
          {mydetails &&
            mydetails.connections.map((user) => (
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

export default ChatPage;
