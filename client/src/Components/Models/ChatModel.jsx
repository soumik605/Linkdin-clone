import React, { useEffect, useState, useContext, useRef } from "react";
import {
  ChatBox,
  Container,
  FriendBox,
  InputBox,
  MainBox,
  MyBox,
  PopupBox,
  TopBox,
} from "../Style/ChatModel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import { userContext } from "../../App";




const ChatModel = (props) => {
  const [room, setRoom] = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { state, dispatch } = useContext(userContext);
  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/room/${props.data._id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert.error(data.error);
          } else {
            setRoom(data.room);
            setAllMessages(data.room.messages)
          }
        });
    }, 2000);
    return () => clearInterval(interval);
  }, [room]);

  useEffect(() => {
    if (room) {
      scrollToBottom();
    }
  }, [allMessages.length]);

  const SendMessage = async () => {
    setMessage("");
    await fetch(`/addmessage/${room._id}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        message,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          scrollToBottom();
        }
      });
  };

  return (
    <Container>
      <PopupBox>
        <MainBox>
          <TopBox>
            <ArrowBackIcon onClick={() => props.model(false)} />
            <img src={props.data.profile_pic} alt="" />
            <h3>
              <a href={`/profile/${props.data._id}`}>{props.data.name}</a>
            </h3>
          </TopBox>
          <ChatBox>
            {room &&
              room.messages.map((item) => {
                return item.posted_By._id === state._id ? (
                  <MyBox>
                    <h2>You</h2>
                    <h3>{item.message}</h3>
                  </MyBox>
                ) : (
                  <FriendBox>
                    <h2>{item.posted_By.name}</h2>
                    <h3>{item.message}</h3>
                  </FriendBox>
                );
              })}
            <div ref={bottomRef}></div>
          </ChatBox>
          <InputBox>
            <input
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <SendIcon
              style={{ fontSize: "50px" }}
              onClick={() => SendMessage()}
            />
          </InputBox>
        </MainBox>
      </PopupBox>
    </Container>
  );
};

export default ChatModel;
