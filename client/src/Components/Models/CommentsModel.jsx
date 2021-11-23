import React from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  Container,
  PopupBox,
  Close,
  CommentContainer,
} from "../Style/CommentsModel";
import Comment from "../Comment";
import { connect } from "react-redux";

const CommentsModel = (props) => {
  return (
    <Container>
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <Close onClick={() => props.model(false)}>x</Close>
          <h2>All Comments</h2>
          <CommentContainer>
            {props.PostComments && props.PostComments.length === 0 && (
              <h3 style={{ top: "100px", position: "relative" }}>
                No comments yet
              </h3>
            )}
            {props.PostComments &&
              props.PostComments.map((comment) => (
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

const mapStateToProps = (state) => ({
  PostComments: state.PostReducer.postComments,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsModel);
