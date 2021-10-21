import React, { useState, useContext, useEffect } from "react";
import {
  PostCard,
  CardTop,
  CardTitle,
  CardPhoto,
  CardLikes,
  CardActions,
  CommentContainer,
  EditPostIconContainer,
} from "./Style/FeedStyle";
import { userContext } from "../App";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { Button } from "@material-ui/core";
import CommentIcon from "@mui/icons-material/Comment";
import { useAlert } from "react-alert";
import CommentsModel from "./Models/CommentsModel";
import { Link, useParams } from "react-router-dom";
import LikesModel from "./Models/LikesModel";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddPostModel from "./Models/AddPostModel";
import FullScreenLoader from "./Models/FullScreenLoader";

const Post = (props) => {
  const { userid } = useParams();
  const { state } = useContext(userContext);
  const [showLike, setShowLike] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [allPost, setAllPost] = useState([]);
  const alert = useAlert();
  const [postComments, setPostComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [showEditPostModel, setShowEditPostModel] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [sendPost, setSendPost] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const [monthDiff, setMonthDiff] = useState(0);
  const [dayDiff, setDayDiff] = useState(0);
  const [hourDiff, setHourDiff] = useState(0);
  const [minDiff, setMinDiff] = useState(0);

  useEffect(() => {
    const d1 = new Date(props.post.createdAt);
    const d2 = new Date();
    const diff = d2.getTime() - d1.getTime();
    const minDiffer = diff / (1000 * 60);

    if (minDiffer > 30 * 24 * 60) {
      setMonthDiff(Math.floor(minDiffer / (60 * 24 * 30)));
    } else if (minDiffer > 24 * 60) {
      setDayDiff(Math.floor(minDiffer / (60 * 24)));
    } else if (minDiffer > 60) {
      setHourDiff(Math.floor(minDiffer / 60));
    } else if (minDiffer > 1) {
      setMinDiff(Math.floor(minDiffer));
    }
  }, [props.post]);

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

  const deletePost = (postid) => {
    if (window.confirm("Delete Post ?")) {
      setShowLoader(true)
      fetch(`/deletepost/${postid}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert.success("Post Deleted !");
          setShowLoader(false)
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
    {
      showLoader && <FullScreenLoader />
    }
      {state && showComments && (
        <CommentsModel model={setShowComments} comments={postComments} post={props.post} />
      )}
      {state && showLikes && (
        <LikesModel model={setShowLikes} likes={postLikes} />
      )}
      {showEditPostModel && (
        <AddPostModel model={setShowEditPostModel} post={sendPost} />
      )}

      <PostCard key={props.post._id}>
        {userid === state._id && showEditBox && (
          <EditPostIconContainer>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => {
                setShowEditBox(false);
                setSendPost(props.post);
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
                deletePost(props.post._id);
              }}
            >
              Delete
            </Button>
          </EditPostIconContainer>
        )}

        <CardTop>
          <img src={props.post.posted_By.profile_pic} alt="" />
          <div>
            <h3>
              <Link to={`/profile/${props.post.posted_By._id}`}>
                {props.post.posted_By.name}
              </Link>
            </h3>
            <h5> {props.post.posted_By.headline}</h5>
            {monthDiff > 0 ? (
              <h5> {monthDiff} months ago</h5>
            ) : dayDiff > 0 ? (
              <h5> {dayDiff}d</h5>
            ) : hourDiff > 0 ? (
              <h5> {hourDiff}h</h5>
            ) : minDiff >= 1 ? (
              <h5> {minDiff}m</h5>
            ) : (
              <h5>Just now</h5>
            )}
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              flexWrap: "nowrap",
            }}
          >
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
        {props.post.title && (
          <CardTitle>
            <h3>{props.post.title}</h3>
          </CardTitle>
        )}
        {props.post.photo && <CardPhoto src={props.post.photo} alt="" />}
        {(props.post.likes.length !== 0 ||
          props.post.comments.length !== 0) && (
          <CardLikes>
            {props.post.likes.length !== 0 && (
              <button
                style={{ backgroundColor: "white", border: "none" }}
                onClick={() => {
                  fetchPost(props.post._id);
                  setShowLikes(true);
                }}
              >
                {props.post.likes.length === 1
                  ? "1 Like"
                  : `${props.post.likes.length} Likes`}
              </button>
            )}
            {props.post.comments.length !== 0 && (
              <button
                style={{ backgroundColor: "white", border: "none" }}
                onClick={() => {
                  fetchPost(props.post._id);
                  setShowComments(true);
                }}
              >
                {props.post.comments.length === 1
                  ? "1 Comment"
                  : `${props.post.comments.length} Comments`}
              </button>
            )}
          </CardLikes>
        )}
        <CardActions>
          <button style={{ backgroundColor: "white", border: "none" }}>
            {state && showLike ? (
              props.post.likes.includes(state._id) ? (
                <ThumbUpIcon
                  style={{ color: "blue" }}
                  onClick={() => unlikePost(props.post._id)}
                />
              ) : (
                <ThumbUpAltOutlinedIcon
                  style={{ fontWeight: 450 }}
                  onClick={() => likePost(props.post._id)}
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
                AddComment(props.post._id, e.target[0].value);
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
    </>
  );
};

export default Post;
