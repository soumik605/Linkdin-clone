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
} from "./Style/ProfileStyle";
import { useParams, useHistory } from "react-router-dom";
import { userContext } from "../App";
import NavBar from "./NavBar";
import Loader1 from "./Loader1";
import RightSugg from "./RightSugg";
import Skeleton from "@mui/material/Skeleton";
import { connect } from "react-redux";
import {
  fetchUserPosts,
  fetchUserDetails,
  requestConnection,
  withdrawConnection,
  rejectConnection,
  acceptConnection,
  removeConnection,
} from "../service/Actions/UserActions";
import { createRoom, deleteRoom } from "../service/Actions/RoomAction";

const UserProfile = (props) => {
  const { userid } = useParams();
  const { state } = useContext(userContext);
  const history = useHistory();
  const [showConnBtn, setShowConnBtn] = useState(true);
  const [showAcceptConnBtn, setShowAcceptConnBtn] = useState(true);
  const [showEduLoader, setShowEduLoader] = useState(true);
  const [showSkillLoader, setShowSkillLoader] = useState(true);
  const [showActivityLoader, setShowActivityLoader] = useState(true);

  const fetchUserPostAndDetails = async () => {
    await props.fetchUserPosts(userid);
    await props.fetchUserDetails(userid);
  };

  useEffect(() => {
    if (userid && state) {
      if (userid === state._id) {
        history.push("/profile");
      }
      const interval = setInterval(() => {
        fetchUserPostAndDetails();
        setShowActivityLoader(false);
        setShowEduLoader(false);
        setShowSkillLoader(false);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state, userid]);

  const RequestConnection = async (userid) => {
    setShowConnBtn(false);
    await props.requestConnection(userid);
    setShowConnBtn(true);
  };

  const WithdrawRequest = async () => {
    if (window.confirm("Withdraw Connection Request ? ")) {
      await props.withdrawConnection(userid);
    }
  };

  const RemoveConnection = async () => {
    if (window.confirm("Remove Connection ? ")) {
      await props.removeConnection(userid);
      await props.deleteRoom(userid);
    }
  };

  const acceptConnection = async () => {
    setShowAcceptConnBtn(false);
    await props.acceptConnection(userid);
    await props.createRoom(userid);
    setShowAcceptConnBtn(true);
  };

  const rejectConnection = async () => {
    if (window.confirm("Reject Connection Request ? ")) {
      setShowAcceptConnBtn(false);
      await props.rejectConnection(userid);
      setShowAcceptConnBtn(true);
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <Main>
          <ImageContainer>
            <Cover>
              {props.user.userDetails ? (
                <img
                  src={
                    props.user.userDetails && props.user.userDetails.cover_pic
                  }
                  alt=""
                />
              ) : (
                <Skeleton
                  className="cover"
                  variant="rectangular"
                  animation="wave"
                />
              )}
            </Cover>
            <Profile>
              {props.user.userDetails ? (
                <img
                  src={
                    props.user.userDetails && props.user.userDetails.profile_pic
                  }
                  alt=""
                />
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
            {props.user.userDetails ? (
              <h2>{props.user.userDetails.name}</h2>
            ) : (
              <Skeleton
                variant="text"
                animation="wave"
                width={180}
                height={40}
              />
            )}

            {props.user.userDetails ? (
              <h4 style={{ fontWeight: "440" }}>
                {props.user.userDetails.headline}
              </h4>
            ) : (
              <Skeleton
                variant="text"
                animation="wave"
                width={250}
                height={30}
              />
            )}

            {props.user.userDetails ? (
              <h4 style={{ fontWeight: "350" }}>
                {props.user.userDetails.address}
              </h4>
            ) : (
              <Skeleton
                variant="text"
                animation="wave"
                width={210}
                height={30}
              />
            )}

            {props.user.userDetails ? (
              <h4 style={{ margin: "10px 0px" }}>
                {props.user.userDetails.connections.length} connections
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
              {!props.user.userDetails && (
                <Skeleton
                  variant="button"
                  animation="wave"
                  width={80}
                  height={26}
                  style={{ borderRadius: "13px" }}
                />
              )}

              {props.user.userDetails &&
                props.user.userDetails.connections.includes(state._id) && (
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

              {props.user.userDetails &&
                props.user.userDetails.myrequests.includes(state._id) &&
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

              {props.user.userDetails &&
                props.user.userDetails.conrequests.includes(state._id) && (
                  <button
                    style={{
                      backgroundColor: "white",
                      color: "grey",
                      border: "1px solid grey",
                    }}
                    onClick={() => WithdrawRequest()}
                  >
                    Pending
                  </button>
                )}

              {props.user.userDetails &&
                !props.user.userDetails.connections.includes(state._id) &&
                !props.user.userDetails.myrequests.includes(state._id) &&
                !props.user.userDetails.conrequests.includes(state._id) &&
                showConnBtn && (
                  <button
                    onClick={() => {
                      RequestConnection(props.user.userDetails._id);
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
            <div>
              {props.user.userDetails && props.user.userDetails.about && (
                <h5>{props.user.userDetails.about}</h5>
              )}
            </div>
          </Headline>

          <Activity>
            <h3>Activity</h3>
            <h5>
              {props.user.userDetails &&
                props.user.userDetails.connections.length}{" "}
              connections
            </h5>
            {showActivityLoader && (
              <div>
                <div style={{ margin: "0px auto", justifyContent: "center" }}>
                  <Loader1 />
                </div>
              </div>
            )}

            <div>
              {props.user.userPosts &&
                props.user.userPosts.slice(0, 4).map((post) => (
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
                history.push(`/posts/${userid}`);
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
            {props.user.userDetails &&
              props.user.userDetails.education.map((edu) => (
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
              {props.user.userDetails &&
                props.user.userDetails.skills.map((skill) => (
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
