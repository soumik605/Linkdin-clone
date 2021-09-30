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
  User,
  RightProfile,
  RightDetails,
  EduBox,
} from "./Style/MyProfile";
import EditIcon from "@material-ui/icons/Edit";
import UserEditModel from "./Models/UserEditModel";
import { userContext } from "../App";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import UserProfileModel from "./Models/UserProfileModel";
import UserCoverModel from "./Models/UserCoverModel";
import { ConnectBtn } from "./Style/MyConn";
import NavBar from "./NavBar";
import { useAlert } from "react-alert";
import AddIcon from "@mui/icons-material/Add";
import EducationModel from "./Models/EducationModel";
import DeleteIcon from "@mui/icons-material/Delete";


const MyProfile = () => {
  const [editModel, setEditModel] = useState(false);
  const [profileModel, setProfileModel] = useState(false);
  const [coverModel, setCoverModel] = useState(false);
  const [showEduModel, setShowEduModel] = useState(false);
  const [sendEdu, setSendEdu] = useState([]);
  const { state, dispatch } = useContext(userContext);
  const [allUser, setAllUser] = useState([]);
  const alert = useAlert();
  const [showConnBtn, setShowConnBtn] = useState(true);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");

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
    setShowConnBtn(false);
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

  const AddSkill = async () => {
    setShowAddSkill(false);
    setNewSkill("");
    await fetch(`/addskill`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        skill: newSkill,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
        }
      });
  };


  const DeleteSkill = async (skill) => {
    await fetch(`/deleteskill`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        skill
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
        }
      });
  }

  return (
    <>
      {editModel && <UserEditModel model={setEditModel} />}
      {profileModel && <UserProfileModel model={setProfileModel} />}
      {coverModel && <UserCoverModel model={setCoverModel} />}
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
              <img src={state && state.cover_pic} alt="" />
              <CameraAltIcon onClick={() => setCoverModel(true)} />
            </Cover>
            <Profile>
              <img src={state && state.profile_pic} alt="" />
              <CameraAltIcon onClick={() => setProfileModel(true)} />
            </Profile>
          </ImageContainer>
          <Details>
            <EditIcon
              style={{ float: "right" }}
              onClick={() => setEditModel(true)}
            />
            <h1>{state ? state.name : "loading.."}</h1>
            <h3>{state ? state.about : "loading.."}</h3>
            <h4>{state ? state.address : "loading.."}</h4>
            <h4>
              {" "}
              <a href={"/connections"}>
                {state
                  ? `${state.connections.length} connections`
                  : "loading.."}{" "}
              </a>
            </h4>
          </Details>
          <Education>
            <div style={{ borderBottom: "1px solid grey" }}>
              <h2>Education</h2>
              <AddIcon onClick={() => setShowEduModel(true)} />
            </div>
            {state &&
              state.education.map((edu) => (
                <EduBox key={edu._id}>
                  <div>
                    <h3>{edu.institute}</h3>
                    <h4>{edu.course}</h4>
                    <h5>{edu.passyear}</h5>
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
              style={{ borderBottom: "1px solid grey", paddingBottom: "5px" }}
            >
              <h2>Skills</h2>
              <button onClick={() => setShowAddSkill(!showAddSkill)}>
                Add new skill
              </button>
            </div>
            {showAddSkill && (
              <div>
                <input
                autoFocus="true"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button onClick={() => AddSkill()}>Add</button>
              </div>
            )}
            <div
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
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
                    }}
                  >
                    <h3 style={{ marginRight: "auto" }}>{skill}</h3>
                    <DeleteIcon style={{fontSize:"20px"}} onClick={()=>DeleteSkill(skill)} />
                  </div>
                ))}
            </div>
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

export default MyProfile;
