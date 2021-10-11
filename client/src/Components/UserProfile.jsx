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
  EduBox,
  Activity,
  Headline,
} from "./Style/MyProfile";
import { useParams, useHistory } from "react-router-dom";
import { userContext } from "../App";
import NavBar from "./NavBar";
import Loader1 from "./Loader1";
import RightSugg from "./RightSugg";
import Skeleton from "@mui/material/Skeleton";

const UserProfile = () => {
  const { userid } = useParams();
  const [data, setData] = useState(null);
  const { state, dispatch } = useContext(userContext);
  const history = useHistory();
  const [showConnBtn, setShowConnBtn] = useState(true);
  const [showAcceptConnBtn, setShowAcceptConnBtn] = useState(true);
  const [showEduLoader, setShowEduLoader] = useState(true);
  const [showSkillLoader, setShowSkillLoader] = useState(true);
  const [showActivityLoader, setShowActivityLoader] = useState(true);
  const [userposts, setUserPosts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/mypost/${userid}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert.error(data.error);
          } else {
            const newUserPost = data.posts.slice(0, 4);
            setUserPosts(newUserPost);
            setShowActivityLoader(false);
          }
        });
    }, 1000);
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
    }, 500);
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

  const rejectConnection = () => {
    fetch(`/rejectconnect/${userid}`, {
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
              {data ? (
                <img src={data && data.cover_pic} alt="" />
              ) : (
                <Skeleton
                  className="cover"
                  variant="rectangular"
                  animation="wave"
                />
              )}
            </Cover>
            <Profile>
              {data ? (
                <img src={data && data.profile_pic} alt="" />
              ) : (
                <Skeleton
                  className="profile"
                  variant="circular"
                  animation="wave"
                />
              )}
            </Profile>
          </ImageContainer>
          <Details>
            {data ? (
              <h2>{data.name}</h2>
            ) : (
              <Skeleton
                variant="text"
                animation="wave"
                width={180}
                height={40}
              />
            )}

            {data ? (
              <h4 style={{ fontWeight: "440" }}>{data.headline}</h4>
            ) : (
              <Skeleton
                variant="text"
                animation="wave"
                width={250}
                height={30}
              />
            )}

            {data ? (
              <h4 style={{ fontWeight: "350" }}>{data.address}</h4>
            ) : (
              <Skeleton
                variant="text"
                animation="wave"
                width={210}
                height={30}
              />
            )}

            {data ? (
              <h4 style={{ margin: "10px 0px" }}>
                {data.connections.length} connections
              </h4>
            ) : (
              <Skeleton
                variant="text"
                animation="wave"
                width={150}
                height={30}
                style={{ margin: "7px 0px" }}
              />
            )}

            <div>
              {!data && (
                <Skeleton
                  variant="button"
                  animation="wave"
                  width={80}
                  height={26}
                  style={{ borderRadius: "13px" }}
                />
              )}
              {data && data.connections.includes(state._id) && (
                <>
                  <button
                    onClick={() => {
                      history.push("/chat");
                    }}
                  >
                    Message
                  </button>
                  <button onClick={() => RemoveConnection()}>
                    Remove Connection
                  </button>
                </>
              )}

              {data &&
                data.myrequests.includes(state._id) &&
                (showAcceptConnBtn ? (
                  <>
                    <button
                      onClick={() => {
                        acceptConnection();
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        rejectConnection();
                      }}
                    >
                      Ignore
                    </button>
                  </>
                ) : (
                  <>
                    <button style={{ cursor: "not-allowed" }}>Accept</button>{" "}
                    <button>Ignore</button>
                  </>
                ))}

              {data && data.conrequests.includes(state._id) && (
                <button style={{ cursor: "not-allowed" }}>
                  Request sent..
                </button>
              )}

              {data &&
                !data.connections.includes(state._id) &&
                !data.myrequests.includes(state._id) &&
                !data.conrequests.includes(state._id) &&
                showConnBtn && (
                  <button
                    onClick={() => {
                      setShowConnBtn(false);
                      RequestConnection(data._id);
                    }}
                  >
                    Connect
                  </button>
                )}
            </div>
          </Details>

          <Headline>
            <div style={{ justifyContent: "flexStart" }}>
              <h3>About</h3>
            </div>
            <div>{data && data.about && <h5>{data.about}</h5>}</div>
          </Headline>

          <Activity>
            <h3>Activity</h3>
            <h5>{data && data.connections.length} connections</h5>
            {showActivityLoader && (
              <div>
                <div style={{ margin: "0px auto", justifyContent: "center" }}>
                  <Loader1 />
                </div>
              </div>
            )}

            <div>
              {userposts &&
                userposts.map((post) => (
                  <div key={post._id}>
                    {post.photo && <img src={post.photo} alt="" />}
                    <div>
                      {post.title && (
                        <h3 style={{ marginBottom: "5px" }}>{post.title}</h3>
                      )}
                      {post.posted_By && (
                        <h5 style={{ fontWeight: "450" }}>
                          {post.posted_By.name} shared this
                        </h5>
                      )}
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        {post.likes.length !== 0 && (
                          <>
                            <h5>{post.likes.length} Reactions </h5>
                            <pre> </pre>
                          </>
                        )}
                        {post.comments.length !== 0 && (
                          <h5> {post.comments.length} Comments </h5>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={() => {
                history.push({ pathname: "/myposts", userid: userid });
              }}
            >
              See all activity
            </button>
          </Activity>

          <Education>
            <div>
              <h2>Education</h2>
            </div>
            {showEduLoader && <Loader1 />}
            {data &&
              data.education.map((edu) => (
                <EduBox key={edu._id}>
                  <div>
                    <img src="/Images/Education.png" alt="" />
                    <div>
                      <h3>{edu.institute}</h3>
                      <h4>{edu.course}</h4>
                      <h5>{edu.passyear}</h5>
                    </div>
                  </div>
                </EduBox>
              ))}
          </Education>
          <Skills>
            <div style={{ paddingBottom: "5px" }}>
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
                      borderBottom: "1px solid lightgrey",
                      padding: "10px 0",
                    }}
                    key={skill}
                  >
                    <h3 style={{ marginRight: "auto" }}>{skill}</h3>
                  </div>
                ))}
            </div>
          </Skills>
        </Main>
        <Adv>
          <RightSugg />
        </Adv>
      </Container>
    </>
  );
};

export default UserProfile;
