import React, { useEffect, useState, useContext, useRef } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
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
import Loader1 from "../Loader1";
import { fetchRoom, sendMessage } from "../../service/Actions/RoomAction";
import { connect } from "react-redux";

const ChatModel = (props) => {
  const [message, setMessage] = useState("");
  const { state } = useContext(userContext);
  const bottomRef = useRef();
  const [showChatLoader, setShowChatLoader] = useState(true);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const fetchMyRoom = async () => {
    await props.fetchRoom(props.data._id);
    setShowChatLoader(false);
  };

  useEffect(() => {
    if (props.data) {
      const interval = setInterval(() => {
        fetchMyRoom();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [props.data, props.room]);

  const SendMessage = async () => {
    setMessage("");
    await props.sendMessage(props.room._id, message);
    scrollToBottom();
  };

  return (
    <Container>
      <PopupBox>
        <ClickAwayListener onClickAway={() => props.model(false)}>
          <MainBox>
            <TopBox>
              <ArrowBackIcon onClick={() => props.model(false)} />
              <img src={props.data.profile_pic} alt="" />
              <h3>
                <a href={`/profile/${props.data._id}`}>{props.data.name}</a>
              </h3>
            </TopBox>
            <ChatBox>
              <div>
                {showChatLoader && <Loader1 />}
                {props.room && props.room.messages.length === 0 && (
                  <h2>?No Messages. Start chat</h2>
                )}

                {props.room &&
                  props.room.messages.length !== 0 &&
                  props.room.messages.map((item) => {
                    return item.posted_By._id === state._id ? (
                      <MyBox key={item._id}>
                        <h2>You</h2>
                        <h3>{item.message}</h3>
                      </MyBox>
                    ) : (
                      <FriendBox key={item._id}>
                        <h2>{item.posted_By.name}</h2>
                        <h3>{item.message}</h3>
                      </FriendBox>
                    );
                  })}
                <div ref={bottomRef}></div>
              </div>
            </ChatBox>
            <InputBox>
              <input
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {message === "" ? (
                <SendIcon style={{ fontSize: "50px" }} />
              ) : (
                <SendIcon
                  style={{ fontSize: "50px" }}
                  onClick={() => SendMessage()}
                />
              )}
            </InputBox>
          </MainBox>
        </ClickAwayListener>
      </PopupBox>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  room: state.RoomReducer.room,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRoom: (userid) => dispatch(fetchRoom(userid)),
  sendMessage: (roomid, message) => dispatch(sendMessage(roomid, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatModel);
