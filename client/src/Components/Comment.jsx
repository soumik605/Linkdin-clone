import React, { useContext, useState } from "react";
import { CommentBox, Profile } from "./Style/CommentsModel";
import { Link } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { userContext } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import FullScreenLoader from "./Models/FullScreenLoader";
import { ClickAwayListener } from "@material-ui/core";
import { deleteAComment } from "../service/Actions/PostAction";
import { connect } from "react-redux";

const Comment = (props) => {
  const { state } = useContext(userContext);
  const [showMoreBox, setShowMoreBox] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const DeleteComment = async () => {
    setShowLoader(true);
    await props.deleteAComment(props.post._id, props.comment._id);
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && <FullScreenLoader />}
      {showMoreBox && (
        <PopupBox>
          <ClickAwayListener onClickAway={() => setShowMoreBox(false)}>
            <button onClick={() => DeleteComment()}>
              <DeleteIcon style={{ fontSize: "16px" }} />
              <h4>Delete</h4>
            </button>
          </ClickAwayListener>
        </PopupBox>
      )}
      <CommentBox key={props.comment._id}>
        <Profile src={props.comment.commented_By.profile_pic} alt="" />
        <div>
          <h4>
            {state && state._id === props.comment.commented_By._id ? (
              <Link to="/profile">{props.comment.commented_By.name}</Link>
            ) : (
              <Link to={`/profile/${props.comment.commented_By._id}`}>
                {props.comment.commented_By.name}
              </Link>
            )}
          </h4>
          <h5>{props.comment.text}</h5>
        </div>
        {props.comment.commented_By._id === state._id && (
          <MoreHorizIcon
            style={{ marginLeft: "auto" }}
            onClick={() => setShowMoreBox(!showMoreBox)}
          />
        )}
      </CommentBox>
    </>
  );
};

const PopupBox = styled.div`
  position: relative;
  margin: 20px 60px -48px auto;
  display: flex;
  flex-direction: column;
  width: 100px;
  border: 1px solid grey;

  & > button {
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: white;
    border: none;

    &:hover {
      background-color: lightgray;
    }
  }
`;

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  deleteAComment: (postId, commentId) =>
    dispatch(deleteAComment(postId, commentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
