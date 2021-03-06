import React, { useState, useContext, useEffect } from "react";
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
import EditIcon from "@material-ui/icons/Edit";
import UserEditModel from "./Models/UserEditModel";
import { userContext } from "../App";
import UserProfileModel from "./Models/UserProfileModel";
import UserCoverModel from "./Models/UserCoverModel";
import NavBar from "./NavBar";
import AddIcon from "@mui/icons-material/Add";
import EducationModel from "./Models/EducationModel";
import RightSugg from "./RightSugg";
import { useHistory } from "react-router";
import Skeleton from "@mui/material/Skeleton";
import AddSkillModel from "./Models/AddSkillModel";
import EditSkillModel from "./Models/EditSkillModel";
import AboutModel from "./Models/AboutModel";

import { connect } from "react-redux";
import { fetchUserPosts } from "../service/Actions/UserActions";

const MyProfile = (props) => {
  const [editModel, setEditModel] = useState(false);
  const [profileModel, setProfileModel] = useState(false);
  const [coverModel, setCoverModel] = useState(false);
  const [showEduModel, setShowEduModel] = useState(false);
  const [showAboutModel, setShowAboutModel] = useState(false);
  const [sendEdu, setSendEdu] = useState([]);
  const { state } = useContext(userContext);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showEditSkill, setShowEditSkill] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (state) {
      props.fetchUserPosts(state._id);
    }
  }, [state]);

  return (
    <>
      {editModel && <UserEditModel model={setEditModel} />}
      {profileModel && <UserProfileModel model={setProfileModel} />}
      {coverModel && <UserCoverModel model={setCoverModel} />}
      {showAddSkill && <AddSkillModel model={setShowAddSkill} />}
      {showEditSkill && <EditSkillModel model={setShowEditSkill} />}
      {showAboutModel && <AboutModel model={setShowAboutModel} />}
      {showEduModel && (
        <EducationModel
          model={setShowEduModel}
          education={sendEdu}
          changeEdu={setSendEdu}
        />
      )}

      <NavBar />
      <Container>
        <Main>
          <ImageContainer>
            <Cover>
              {state ? (
                <img
                  src={state && state.cover_pic}
                  alt=""
                  onClick={() => setCoverModel(true)}
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
              {state ? (
                <img
                  src={state && state.profile_pic}
                  alt=""
                  onClick={() => setProfileModel(true)}
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
            <EditIcon
              style={{ float: "right", marginRight: "30px" }}
              onClick={() => setEditModel(true)}
            />
            <h2>{state ? state.name : "loading.."}</h2>
            <h4 style={{ fontWeight: "440" }}>
              {state && state.headline && state.headline}
            </h4>
            <h4 style={{ fontWeight: "350" }}>
              {state ? state.address : "loading.."}
            </h4>
            <h4 style={{ margin: "10px 0px" }}>
              {" "}
              <a href={"/connections"}>
                {state
                  ? `${state.connections.length} connections`
                  : "loading.."}{" "}
              </a>
            </h4>
            <div>
              <button>Open to</button>
              <button>Add Section</button>
              <button>More</button>
            </div>
          </Details>
          <Headline>
            <div>
              <h3>About</h3>
              <EditIcon onClick={() => setShowAboutModel(true)} />
            </div>
            <div>{state ? <h5>{state.about}</h5> : <h5>Loading..</h5>} </div>
          </Headline>
          <Activity>
            <h3>Activity</h3>
            <h5>
              {" "}
              <a href={"/connections"}>
                {state && state.connections.length} connections
              </a>
            </h5>

            <div>
              {props.user.userPosts &&
                props.user.userPosts.slice(0, 4).map((post) => (
                  <div key={post._id}>
                    {post.photo && <img src={post.photo} alt="" />}
                    <div>
                      {post.title && (
                        <h3
                          style={{
                            marginBottom: "5px",
                            overflow: "hidden",
                          }}
                        >
                          {post.title}
                        </h3>
                      )}
                      {state && (
                        <h5 style={{ fontWeight: "450" }}>
                          {state.name} shared this
                        </h5>
                      )}
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        {post.likes.length !== 0 && (
                          <>
                            {" "}
                            <h5>{post.likes.length} Reactions </h5>
                            <pre> </pre>
                          </>
                        )}

                        {post.comments.length !== 0 && (
                          <h5> {post.comments.length} Comments</h5>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <button
              onClick={() => {
                history.push(`/posts/${state._id}`);
              }}
            >
              See all activity
            </button>
          </Activity>
          <Education>
            <div>
              <h2>Education</h2>
              <AddIcon onClick={() => setShowEduModel(true)} />
            </div>

            {state &&
              state.education.map((edu) => (
                <EduBox key={edu._id}>
                  <div>
                    <img src="/Images/Education.png" alt="" />
                    <div>
                      <h3>{edu.institute}</h3>
                      <h4>{edu.course}</h4>
                      <h5>{edu.passyear}</h5>
                    </div>
                  </div>

                  <EditIcon
                    onClick={() => {
                      setSendEdu(edu);
                      setShowEduModel(true);
                    }}
                  />
                </EduBox>
              ))}
          </Education>
          <Skills>
            <div
              style={{
                paddingBottom: "5px",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
              }}
            >
              <h2>Skills </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <button
                  onClick={() => {
                    setShowAddSkill(true);
                  }}
                >
                  Add new skill
                </button>
                <EditIcon onClick={() => setShowEditSkill(true)} />
              </div>
            </div>

            <div
              style={{
                flexDirection: "column",
              }}
            >
              {state &&
                state.skills.map((skill) => (
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
  fetchUserPosts: (userId) => dispatch(fetchUserPosts(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
