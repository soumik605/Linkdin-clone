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
import { useAlert } from "react-alert";
import NavBar from "./NavBar";

const MyConnections = () => {
  const { state, dispatch } = useContext(userContext);
  const [allUser, setAllUser] = useState([]);
  const [showAcceptConnBtn, setShowAcceptConnBtn] = useState(true);
  const [showAddConnBtn, setShowAddConnBtn] = useState(true);
  const history = useHistory();
  const alert = useAlert();

  const createRoom = (userId) => {
    fetch(`/createroom`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        user1: state._id,
        user2: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
        }
      });
  };

  const acceptConnection = (user) => {
    fetch(`/acceptconnect/${user._id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.result1));
          dispatch({ type: "USER", payload: data.result1 });
          createRoom(user._id);
          setShowAcceptConnBtn(true);
        }
      });
  };

  const rejectConnection = (user) => {
    fetch(`/rejectconnect/${user._id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.result1));
          dispatch({ type: "USER", payload: data.result1 });
        }
      });
  };

  useEffect(() => {
    fetch(`/alluser`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          let list = data.users;
          list = list.sort(() => Math.random() - 0.5);
          setAllUser(list);
        }
      });
  }, [state]);

  const RequestConnection = async (userid) => {
    await fetch(`/reqconnect/${userid}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.result2));
          dispatch({ type: "USER", payload: data.result2 });
          setShowAddConnBtn(true);
        }
      });
  };

  return (
    <>
      <NavBar />
      <Container>
        <LeftDiv>
          <h3>My Connections</h3>
          {state &&
            state.connections.map((user) => (
              <LeftUserBox key={user._id}>
                <LeftProfile src={user.profile_pic} alt="" />
                <div>
                  <h3>
                    {" "}
                    <a href={`/profile/${user._id}`}>{user.name}</a>
                  </h3>
                  <h5>{user.about}</h5>
                </div>
                <Message onClick={() => history.push("/chat")}>Message</Message>
              </LeftUserBox>
            ))}
        </LeftDiv>
        <RightDiv>
          <ReqCont>
            <h3>Invitations</h3>
            {state &&
              state.conrequests.map((user) => (
                <RequestBox>
                  <ReqPic>
                    <img src={user.profile_pic} />
                  </ReqPic>
                  <ReqUser>
                    <h2>
                      <a href={`/profile/${user._id}`}>{user.name}</a>
                    </h2>
                    <h4>{user.about}</h4>
                  </ReqUser>
                  <CheckBox>
                    <ChBtn onClick={() => rejectConnection(user)}>Ignore</ChBtn>
                    {showAcceptConnBtn ? (
                      <ChBtn
                        onClick={() => {
                          setShowAcceptConnBtn(false);
                          acceptConnection(user);
                        }}
                      >
                        Accept
                      </ChBtn>
                    ) : (
                      <ChBtn
                        style={{ backgroundColor: "grey", color: "white" }}
                      >
                        Accept
                      </ChBtn>
                    )}
                  </CheckBox>
                </RequestBox>
              ))}
          </ReqCont>
          <SuggestionBox>
            <h3>Suggested For You</h3>
            {allUser &&
              allUser
                .filter((s_user) => {
                  if (
                    s_user._id === state._id ||
                    s_user.connections.includes(state._id) ||
                    s_user.myrequests.includes(state._id)
                  ) {
                  } else {
                    return s_user;
                  }
                })
                .map((user) => (
                  <UserBox>
                    <Cover>
                      <img src={user.cover_pic} alt="" />
                    </Cover>
                    <Profile>
                      <img src={user.profile_pic} alt="" />
                    </Profile>
                    <Details>
                      <h2>
                        <a href={`/profile/${user._id}`}>{user.name}</a>
                      </h2>
                      <h4>{user.about}</h4>
                    </Details>
                    {user.conrequests.includes(state._id) ? (
                      <ConnectBtn style={{ cursor: "not-allowed" }}>
                        Request sent..
                      </ConnectBtn>
                    ) : showAddConnBtn ? (
                      <ConnectBtn
                        onClick={() => {
                          setShowAddConnBtn(false);
                          RequestConnection(user._id);
                        }}
                      >
                        Connect
                      </ConnectBtn>
                    ) : (
                      <ConnectBtn
                        style={{ backgroundColor: "grey", color: "white" }}
                      >
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

export default MyConnections;
