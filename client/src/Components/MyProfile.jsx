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
  PostBox,
  EditPostIconContainer,
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
import { useHistory, Link } from "react-router-dom";
import {
  PostCard,
  CardTop,
  CardTitle,
  CardPhoto,
  CardLikes,
  CardActions,
  CommentContainer,
} from "./Style/Feed";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import LikesModel from "./Models/LikesModel";
import CommentsModel from "./Models/CommentsModel";
import { Button } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import AddPostModel from "./Models/AddPostModel";

const MyProfile = () => {
  const [editModel, setEditModel] = useState(false);
  const [profileModel, setProfileModel] = useState(false);
  const [coverModel, setCoverModel] = useState(false);
  const [showEduModel, setShowEduModel] = useState(false);
  const [sendEdu, setSendEdu] = useState([]);
  const [sendPost, setSendPost] = useState(null);
  const { state, dispatch } = useContext(userContext);
  const [allUser, setAllUser] = useState([]);
  const alert = useAlert();
  const [showConnBtn, setShowConnBtn] = useState(true);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [myposts, setMyPosts] = useState([]);
  const [showEditBox, setShowEditBox] = useState(false);
  const [showEditPostModel, setShowEditPostModel] = useState(false);

  const [showLike, setShowLike] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);

  useEffect(() => {
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
          }
        });
    }, 2000);
    return () => clearInterval(interval);
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/mypost`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert.error(data.error);
          } else {
            setMyPosts(data.posts);
          }
        });
    }, 2000);
    return () => clearInterval(interval);
  }, [state, showEditPostModel]);

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
        skill,
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

  const likePost = (postId) => {
    if (state) {
      setShowLike(false);
      fetch("/like", {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert.error(data.error);
          } else {
            const newdata = myposts.map((item) => {
              if (item._id === data.result._id) {
                return data.result;
              } else {
                return item;
              }
            });
            setMyPosts(newdata);
            setShowLike(true);
          }
        });
    }
  };

  const unlikePost = (postId) => {
    if (state) {
      fetch("/unlike", {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert.error(data.error);
          } else {
            const newdata = myposts.map((item) => {
              if (item._id === data.result._id) {
                return data.result;
              } else {
                return item;
              }
            });
            setMyPosts(newdata);
          }
        });
    }
  };

  const AddComment = (postId, text) => {
    if (state) {
      fetch("/comment", {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          postId,
          text,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert.error(data.error);
          } else {
            const newdata = myposts.map((item) => {
              if (item._id === data.result._id) {
                return data.result;
              } else {
                return item;
              }
            });
            setMyPosts(newdata);
          }
        });
    }
  };

  const fetchPost = (postid) => {
    console.log(postid);
    fetch(`/post/${postid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPostComments(res.post.comments);
        setPostLikes(res.post.likes);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const newdata = myposts.filter((item) => {
          if (item._id.toString() !== data.post._id.toString()) {
            return item;
          }
        });
        setMyPosts(newdata);
      })
      .catch((err) => console.log(err));
  };

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
      {state && showComments && (
        <CommentsModel model={setShowComments} comments={postComments} />
      )}
      {state && showLikes && (
        <LikesModel model={setShowLikes} likes={postLikes} />
      )}
      {showEditPostModel && (
        <AddPostModel model={setShowEditPostModel} post={sendPost} />
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
              <button
                onClick={() => {
                  setNewSkill("");
                  setShowAddSkill(!showAddSkill);
                }}
              >
                Add new skill
              </button>
            </div>
            {showAddSkill && (
              <ClickAwayListener
                onClickAway={() => {
                  setNewSkill("");
                  setShowAddSkill(false);
                }}
              >
                <div>
                  <input
                    autoFocus={true}
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button onClick={() => AddSkill()}>Add</button>
                </div>
              </ClickAwayListener>
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
                    <DeleteIcon
                      style={{ fontSize: "20px" }}
                      onClick={() => DeleteSkill(skill)}
                    />
                  </div>
                ))}
            </div>
          </Skills>
          <PostBox>
            <h2>My Posts</h2>
            {myposts.map((post) => (
              <PostCard key={post._id}>
                <CardTop>
                  <img src={post.posted_By.profile_pic} alt="" />
                  <div>
                    <h3>
                      <Link to={`/profile/${post.posted_By._id}`}>
                        {post.posted_By.name}
                      </Link>
                    </h3>
                  </div>
                  <div style={{marginLeft:"auto", display:"flex", flexWrap:"nowrap"}}>
                  {showEditBox && (
                    <EditPostIconContainer>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          setShowEditBox(false);
                          setSendPost(post);
                          setShowEditPostModel(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setShowEditBox(false);
                          deletePost(post._id);
                        }}
                      >
                        Delete
                      </Button>
                    </EditPostIconContainer>
                  )}
                  <MoreVertIcon
                    style={{ marginLeft: "auto", width:"20px" }}
                    onClick={() => {
                      setShowEditBox(!showEditBox);
                    }}
                  />
                  </div>
                </CardTop>
                {post.title && (
                  <CardTitle>
                    <h3>{post.title}</h3>
                  </CardTitle>
                )}
                {post.photo && <CardPhoto src={post.photo} alt="" />}
                <CardLikes>
                  <h4
                    onClick={() => {
                      fetchPost(post._id);
                      setShowLikes(true);
                    }}
                  >
                    {post.likes.length} Likes
                  </h4>
                  <h4>
                    <button
                      style={{ backgroundColor: "white", border: "none" }}
                      onClick={() => {
                        fetchPost(post._id);
                        setShowComments(true);
                      }}
                    >
                      {post.comments.length} Comments
                    </button>
                  </h4>
                </CardLikes>
                <CardActions>
                  {state && showLike ? (
                    post.likes.includes(state._id) ? (
                      <ThumbUpIcon
                        style={{ color: "blue" }}
                        onClick={() => unlikePost(post._id)}
                      />
                    ) : (
                      <ThumbUpAltOutlinedIcon
                        onClick={() => likePost(post._id)}
                      />
                    )
                  ) : (
                    <ThumbUpAltOutlinedIcon />
                  )}

                  <CommentIcon
                    onClick={() => setShowCommentInput(!showCommentInput)}
                  />
                </CardActions>

                {showCommentInput && (
                  <CommentContainer>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        AddComment(post._id, e.target[0].value);
                        e.target.reset();
                        setShowCommentInput(false);
                      }}
                    >
                      <input type="text" placeholder="Add a comment" />

                      <button
                        type="submit"
                        style={{ color: "white", backgroundColor: "blue" }}
                      >
                        Send
                      </button>
                    </form>
                  </CommentContainer>
                )}
              </PostCard>
            ))}
          </PostBox>
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
