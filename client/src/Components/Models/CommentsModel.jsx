import React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  Container,
  PopupBox,
  Close,
  CommentContainer,
} from "../Style/CommentsModel";
import Comment from "../Comment";

const CommentsModel = (props) => {
  return (
    <Container>
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <Close onClick={() => props.model(false)}>x</Close>
          <h2>All Comments</h2>
          <CommentContainer>
            {props.comments.length === 0 && (
              <h3 style={{ top: "100px", position: "relative" }}>
                No comments yet
              </h3>
            )}
            {props.comments.map((comment) => (
              <Comment
                comment={comment}
                key={comment._id}
                post={props.post}
                model={props.model}
              />
            ))}
          </CommentContainer>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export default CommentsModel;
