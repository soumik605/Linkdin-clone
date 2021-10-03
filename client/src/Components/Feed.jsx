import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  LeftCont,
  MainCont,
  RightCont,
  Profile,
  Cover,
  Desc,
  InputBox,
  PostCard,
  CardTop,
  CardTitle,
  CardPhoto,
  CardLikes,
  CardActions,
  CommentContainer,
} from "./Style/Feed";
import { User, RightProfile, RightDetails } from "./Style/MyProfile";
import { userContext } from "../App";
import { ConnectBtn } from "./Style/MyConn";
import AddPostModel from "./Models/AddPostModel";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import { useAlert } from "react-alert";
import CommentsModel from "./Models/CommentsModel";
import NavBar from "./NavBar";
import { Link, useHistory } from "react-router-dom";
import LikesModel from "./Models/LikesModel";

const Feed = () => {
  const [allUser, setAllUser] = useState([]);
  const { state, dispatch } = useContext(userContext);
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [showLike, setShowLike] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [allPost, setAllPost] = useState([]);
  const alert = useAlert();
  const [postComments, setPostComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const history = useHistory();

  useEffect(() => {

    const interval = setInterval(() => {
      if (state) {
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
      }
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
        }
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (state) {
        fetch("/allsubpost", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.err) {
              alert.error(data.err);
            } else {
              setAllPost(data.result);
            }
          });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [state]);

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
            const newdata = allPost.map((item) => {
              if (item._id === data.result._id) {
                return data.result;
              } else {
                return item;
              }
            });
            setAllPost(newdata);
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
            const newdata = allPost.map((item) => {
              if (item._id === data.result._id) {
                return data.result;
              } else {
                return item;
              }
            });
            setAllPost(newdata);
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
            const newdata = allPost.map((item) => {
              if (item._id === data.result._id) {
                return data.result;
              } else {
                return item;
              }
            });
            setAllPost(newdata);
          }
        });
    }
  };

  const fetchPost = (postid) => {
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

  return (
    <>
      {state && showCreateModel && (
        <AddPostModel model={setShowCreateModel} post={null} />
      )}
      {state && showComments && (
        <CommentsModel model={setShowComments} comments={postComments} />
      )}
      {state && showLikes && (
        <LikesModel model={setShowLikes} likes={postLikes} />
      )}
      <NavBar />
      <Container>
        <LeftCont>
          <Cover src={state && state.cover_pic} alt="" />
          <Profile src={state && state.profile_pic} alt="" />
          <Desc>
            <h2>
              <a href={"/profile"}>{state && state.name}</a>
            </h2>
            <h4>{state && state.about}</h4>
            <h4>
              <a href={"/connections"}>
                {state && state.connections.length} Connections
              </a>
            </h4>
          </Desc>
        </LeftCont>
        <MainCont>
          <InputBox>
            <img src={state && state.profile_pic} alt="" />
            <button onClick={() => setShowCreateModel(true)}>
              Start a post
            </button>
          </InputBox>
          {allPost.map((post) => (
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
        </MainCont>
        <RightCont>
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
                  <ConnectBtn onClick={() => RequestConnection(user._id)}>
                    Connect
                  </ConnectBtn>
                </User>
              ))}
        </RightCont>
      </Container>
    </>
  );
};

export default Feed;
