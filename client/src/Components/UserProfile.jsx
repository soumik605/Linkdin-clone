import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Main,
  Adv,
  ImageContainer,
  Cover,
  Profile,
  Details,
  Education,
  Skills,
  Button,
  User,
  RightProfile,
  RightDetails,
  EduBox,
} from "./Style/MyProfile";
import { useParams, useHistory } from "react-router-dom";
import { userContext } from "../App";
import { ConnectBtn } from "./Style/MyConn";
import NavBar from "./NavBar";

const UserProfile = () => {
  const { userid } = useParams();
  const [data, setData] = useState(null);
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const [allUser, setAllUser] = useState([]);
  const [showConnBtn, setShowConnBtn] = useState(true);

  useEffect(() => {
    state && userid === state._id && history.push("/profile");

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

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
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
          setShowConnBtn(true);
        }
      });
  };

  const RemoveConnection = async () => {
    await fetch(`/removeconnect/${userid}`, {
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

  return (
    <>
      <NavBar />
      <Container>
        <Main>
          <ImageContainer>
            <Cover>
              <img src={data && data.cover_pic} alt="" />
            </Cover>
            <Profile>
              <img src={data && data.profile_pic} alt="" />
            </Profile>
          </ImageContainer>
          <Details>
            <h1>{data ? data.name : "loading.."}</h1>
            <h3>{data ? data.about : "loading.."}</h3>
            <h4>{data ? data.address : "loading.."}</h4>
            <h4>
              {data ? `${data.connections.length} connections` : "loading.."}{" "}
            </h4>
            <div style={{ display: "flex" }}>
              {data && data.connections.includes(state._id) ? (
                <>
                  {" "}
                  <Button
                    onClick={() => {
                      history.push("/chat");
                    }}
                  >
                    Message
                  </Button>
                  <Button onClick={() => RemoveConnection()}>
                    Remove Connection
                  </Button>
                </>
              ) : state && state.conrequests.includes(userid) ? (
                <Button>Accept connection</Button>
              ) : data && data.conrequests.includes(state._id) ? (
                <Button>Request sent..</Button>
              ) : data && showConnBtn ? (
                <Button
                  onClick={() => {
                    setShowConnBtn(false);
                    RequestConnection(data._id);
                  }}
                >
                  Connect
                </Button>
              ) : (
                <Button style={{ backgroundColor: "grey", color: "white" }}>
                  Connect
                </Button>
              )}
            </div>
          </Details>

          <Education>
            <div>
              <h2>Education</h2>
            </div>
            {data &&
              data.education.map((edu) => (
                <EduBox key={edu._id}>
                  <div>
                    <h3>{edu.institute}</h3>
                    <h4>{edu.course}</h4>
                    <h5>{edu.passyear}</h5>
                  </div>
                </EduBox>
              ))}
          </Education>
          <Skills>
            <h2>Skills</h2>
          </Skills>
        </Main>
        <Adv>
          <h2>Suggested For You</h2>
          {allUser &&
            allUser
              .filter((s_user) => {
                if (
                  s_user._id === state._id ||
                  s_user.connections.includes(state._id) ||
                  s_user.conrequests.includes(state._id) ||
                  s_user.myrequests.includes(state._id)
                ) {
                } else {
                  return s_user;
                }
              })
              .map((user) => (
                <User key={user._id}>
                  <RightProfile src={user.profile_pic} alt="" />
                  <RightDetails>
                    <h2>
                      {" "}
                      <a href={`/profile/${user._id}`}>{user.name}</a>
                    </h2>
                    <h4>{user.about}</h4>
                  </RightDetails>
                  {showConnBtn ? (
                    <ConnectBtn
                      onClick={() => {
                        setShowConnBtn(false);
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
                </User>
              ))}
        </Adv>
      </Container>
    </>
  );
};

export default UserProfile;
