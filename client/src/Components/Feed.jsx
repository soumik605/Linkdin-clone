import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  LeftCont,
  MainCont,
  RightCont,
  InputBox,
  PostCard,
  CardTop,
  CardTitle,
  CardPhoto,
  CardLikes,
  CardActions,
  CommentContainer,
} from "./Style/Feed";

import { userContext } from "../App";
import AddPostModel from "./Models/AddPostModel";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import { useAlert } from "react-alert";
import CommentsModel from "./Models/CommentsModel";
import NavBar from "./NavBar";
import { Link, useHistory } from "react-router-dom";
import LikesModel from "./Models/LikesModel";
import Loader1 from "./Loader1";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import LeftProfile from "./LeftProfile";
import RightSugg from "./RightSugg";

const Feed = () => {
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
  const [showFeedLoader, setShowFeedLoader] = useState(true);

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
              setShowFeedLoader(false);
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
          <LeftProfile />
        </LeftCont>
        <MainCont>
          <InputBox>
            <img src={state && state.profile_pic} alt="" />
            <button onClick={() => setShowCreateModel(true)}>
              Start a post
            </button>
          </InputBox>
          {showFeedLoader && <Loader1 />}
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
                  <h5 style={{ fontWeight: "400" }}>
                    {post.posted_By.headline}
                  </h5>
                </div>
              </CardTop>
              {post.title && (
                <CardTitle>
                  <h3>{post.title}</h3>
                </CardTitle>
              )}
              {post.photo && <CardPhoto src={post.photo} alt="" />}
              {(post.likes.length !== 0 || post.comments.length !== 0) && (
                <CardLikes>
                  {post.likes.length !== 0 && (
                    <button
                      style={{ backgroundColor: "white", border: "none" }}
                      onClick={() => {
                        fetchPost(post._id);
                        setShowLikes(true);
                      }}
                    >
                      {post.likes.length === 1
                        ? "1 Like"
                        : `${post.likes.length} Likes`}
                    </button>
                  )}
                  {post.comments.length !== 0 && (
                    <button
                      style={{ backgroundColor: "white", border: "none" }}
                      onClick={() => {
                        fetchPost(post._id);
                        setShowComments(true);
                      }}
                    >
                      {post.comments.length === 1
                        ? "1 Comment"
                        : `${post.comments.length} Comments`}
                    </button>
                  )}
                </CardLikes>
              )}
              <CardActions>
                <button style={{ backgroundColor: "white", border: "none" }}>
                  {state && showLike ? (
                    post.likes.includes(state._id) ? (
                      <ThumbUpIcon
                        style={{ color: "blue" }}
                        onClick={() => unlikePost(post._id)}
                      />
                    ) : (
                      <ThumbUpAltOutlinedIcon
                        style={{ fontWeight: 450 }}
                        onClick={() => likePost(post._id)}
                      />
                    )
                  ) : (
                    <ThumbUpAltOutlinedIcon style={{ fontWeight: 450 }} />
                  )}
                  <h4>Like</h4>
                </button>

                <button onClick={() => setShowCommentInput(!showCommentInput)}>
                  <CommentIcon style={{ fontWeight: 250 }} />
                  <h4>Comment</h4>
                </button>

                <button>
                  <RedoRoundedIcon style={{ fontWeight: 500 }} />
                  <h4>Share</h4>
                </button>

                <button>
                  <SendRoundedIcon style={{ fontWeight: 350 }} />
                  <h4>Send</h4>
                </button>
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
          <RightSugg />
        </RightCont>
      </Container>
    </>
  );
};

export default Feed;
