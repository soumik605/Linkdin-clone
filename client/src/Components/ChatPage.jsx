import React, { useState, useEffect, useContext } from "react";
import ChatModel from "./Models/ChatModel";
import NavBar from "./NavBar";
import { ChatBox, ChatList, Container, UserBox } from "./Style/ChatPage";
import { userContext } from "../App";
import { useHistory } from "react-router-dom";

const ChatPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [myRooms, setMyRooms] = useState([]);
  const [friend, setFriend] = useState("");
  const { state } = useContext(userContext);
  const history =  useHistory()
  const [mydetails, setMydetails] = useState(null);





  
  useEffect(() => {
    const interval = setInterval(() => {
      if (state) {
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
            }
          });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
 fetch(`/myrooms`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          setMyRooms(data.rooms);
        }
      });
  }, []);

  return (
    <>
      {showChat && <ChatModel model={setShowChat} data={friend} />}
      <NavBar />
      <Container>
        <ChatList>
          <h2>Messaging</h2>
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
