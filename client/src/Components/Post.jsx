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
import CommentsModel from "./Models/CommentsModel";
import { Link } from "react-router-dom";
import LikesModel from "./Models/LikesModel";
import RedoRoundedIcon from "@mui/icons-material/RedoRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddPostModel from "./Models/AddPostModel";
import FullScreenLoader from "./Models/FullScreenLoader";
import { connect } from "react-redux";
import {
  commentAPost,
  deleteAPost,
  fetchAPost,
  likeAPost,
  unlikeAPost,
} from "../service/Actions/PostAction";

const Post = (props) => {
  const { state } = useContext(userContext);
  const [showLike, setShowLike] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [showEditPostModel, setShowEditPostModel] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
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

  const likePost = async (postId) => {
    if (state) {
      setShowLike(false);
      await props.likeAPost(postId);
      setShowLike(true);
    }
  };

  const unlikePost = async (postId) => {
    if (state) {
      await props.unlikeAPost(postId);
    }
  };

  const AddComment = async (postId, text) => {
    if (state) {
      await props.commentAPost(postId, text);
    }
  };

  const fetchPost = async (postid) => {
    await props.fetchAPost(postid);
  };

  const deletePost = async (postid) => {
    if (window.confirm("Delete Post ?")) {
      setShowLoader(true);
      await props.deleteAPost(postid);
      setShowLoader(false);
    }
  };

  return (
    <>
      {showLoader && <FullScreenLoader />}
      {state && showComments && (
        <CommentsModel model={setShowComments} post={props.post} />
      )}
      {state && showLikes && <LikesModel model={setShowLikes} />}
      {showEditPostModel && (
        <AddPostModel model={setShowEditPostModel} post={props.post} />
      )}

      <PostCard key={props.post._id}>
        {props.post.posted_By._id === state._id && showEditBox && (
          <EditPostIconContainer>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => {
                setShowEditBox(false);
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
            {props.post.posted_By._id === state._id && (
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

const mapStateToProps = (state) => ({
  Post: state.PostReducer,
});

const mapDispatchToProps = (dispatch) => ({
  likeAPost: (postId) => dispatch(likeAPost(postId)),
  unlikeAPost: (postId) => dispatch(unlikeAPost(postId)),
  commentAPost: (postId, text) => dispatch(commentAPost(postId, text)),
  deleteAPost: (postid) => dispatch(deleteAPost(postid)),
  fetchAPost: (postid) => dispatch(fetchAPost(postid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
