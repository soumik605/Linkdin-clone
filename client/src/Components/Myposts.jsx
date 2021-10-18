import React, { useState, useEffect, useContext } from "react";
import LeftProfile from "./LeftProfile";
import NavBar from "./NavBar";
import {
  Container,
  LeftCont,
  MainCont,
  RightCont,
  PostCard,
  CardTop,
  CardTitle,
  CardPhoto,
  CardLikes,
  CardActions,
  CommentContainer,
  EditPostIconContainer,
} from "./Style/Feed";
import { userContext } from "../App";
import LikesModel from "./Models/LikesModel";
import CommentsModel from "./Models/CommentsModel";
import AddPostModel from "./Models/AddPostModel";
import Loader1 from "./Loader1";
import { useHistory, Link, useParams } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import CommentIcon from "@mui/icons-material/Comment";
import { Button } from "@material-ui/core";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import RightSugg from "./RightSugg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Myposts = () => {
  const { userid } = useParams();
  const [myposts, setMyPosts] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showEditPostModel, setShowEditPostModel] = useState(false);
  const [sendPost, setSendPost] = useState(null);
  const [showLikes, setShowLikes] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [showEditBox, setShowEditBox] = useState(false);
  const [showMyPostLoader, setShowMyPostLoader] = useState(true);
  const [showLike, setShowLike] = useState(true);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    if (userid) {
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
              setMyPosts(data.posts);
              setShowMyPostLoader(false);
            }
          });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [state, showEditPostModel]);

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
        <LeftCont>
          <LeftProfile />
        </LeftCont>

        <MainCont>
          {showMyPostLoader && <Loader1 />}
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
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    flexWrap: "nowrap",
                  }}
                >
                  {userid === state._id && showEditBox && (
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
                  {userid === state._id && (
                    <MoreVertIcon
                      style={{ marginLeft: "auto", width: "20px" }}
                      onClick={() => {
                        setShowEditBox(!showEditBox);
                      }}
                    />
                  )}
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
                <button>
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
                  <CommentIcon style={{ fontWeight: 450 }} />
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

export default Myposts;
