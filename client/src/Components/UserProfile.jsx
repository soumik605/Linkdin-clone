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
import Loader1 from "./Loader1";

const UserProfile = () => {
  const { userid } = useParams();
  const [data, setData] = useState(null);
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const [allUser, setAllUser] = useState([]);
  const [showConnBtn, setShowConnBtn] = useState(true);
  const [showAcceptConnBtn, setShowAcceptConnBtn] = useState(true);
  const [showSuggestionLoader, setShowSuggestionLoader] = useState(true);
  const [showEduLoader, setShowEduLoader] = useState(true);
  const [showSkillLoader, setShowSkillLoader] = useState(true);

  useEffect(() => {
    state && userid === state._id && history.push("/profile");

    const interval = setInterval(() => {
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
            setAllUser(data.users);
            setShowSuggestionLoader(false);
          }
        });
    }, 4000);
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/user/${userid}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setData(res.user);
          setShowSkillLoader(false);
          setShowEduLoader(false);
        });
    }, 2000);
    return () => clearInterval(interval);
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

  const deleteRoom = () => {
    fetch(`/deleteroom`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        fid: userid,
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
          deleteRoom();
        }
      });
  };

  const createRoom = () => {
    fetch(`/createroom`, {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        fid: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          setShowAcceptConnBtn(true);
        }
      });
  };

  const acceptConnection = () => {
    setShowAcceptConnBtn(false);
    fetch(`/acceptconnect/${userid}`, {
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
          createRoom();
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
              {data && data.connections.includes(state._id) && (
                <>
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
              )}

              {data &&
                data.myrequests.includes(state._id) &&
                (showAcceptConnBtn ? (
                  <Button
                    onClick={() => {
                      acceptConnection();
                    }}
                  >
                    Accept connection
                  </Button>
                ) : (
                  <Button style={{ cursor: "not-allowed" }}>
                    Accept connection
                  </Button>
                ))}

              {data && data.conrequests.includes(state._id) && (
                <Button>Request sent..</Button>
              )}

              {data &&
                !data.connections.includes(state._id) &&
                !data.myrequests.includes(state._id) &&
                !data.conrequests.includes(state._id) &&
                showConnBtn && (
                  <Button
                    onClick={() => {
                      setShowConnBtn(false);
                      RequestConnection(data._id);
                    }}
                  >
                    Connect
                  </Button>
                )}
            </div>
          </Details>

          <Education>
            <div>
              <h2>Education</h2>
            </div>
            {showEduLoader && <Loader1 />}
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
            <div
              style={{ borderBottom: "1px solid grey", paddingBottom: "5px" }}
            >
              <h2>Skills</h2>
            </div>
            <div
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {showSkillLoader && <Loader1 />}
              {data &&
                data.skills.map((skill) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3 style={{ marginRight: "auto" }}>{skill}</h3>
                  </div>
                ))}
            </div>
          </Skills>
        </Main>
        <Adv>
          <h2>Suggested For You</h2>
          {showSuggestionLoader && <Loader1 />}
          {allUser &&
            allUser
              .filter((s_user) => {
                if (
                  s_user._id === state._id ||
                  s_user.connections.includes(state._id) ||
                  s_user.conrequests.includes(state._id) ||
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
                    <ConnectBtn style={{ cursor: "not-allowed" }}>
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
