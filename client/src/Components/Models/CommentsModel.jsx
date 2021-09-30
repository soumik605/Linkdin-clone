import React, { useContext } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  Container,
  PopupBox,
  Close,
  CommentBox,
  Profile,
  CommentContainer,
} from "../Style/CommentsModel";
import { userContext } from "../../App";
import { Link } from "react-router-dom";




const CommentsModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  return (
    <Container>
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <Close onClick={() => props.model(false)}>x</Close>
          <h2>All Comments</h2>
          <CommentContainer>
            {props.comments.map((comment) => (
              <CommentBox key={comment._id}>
                <Profile src={comment.commented_By.profile_pic} alt="" />
                <div>
                  <h4>
                    {state && state._id === comment.commented_By._id ? (
                      <Link to="/profile" exact>
                        {comment.commented_By.name}
                      </Link>
                    ) : (
                      <Link to={`/profile/${comment.commented_By._id}`} exact>
                        {comment.commented_By.name}
                      </Link>
                    )}
                  </h4>
                  <h5>{comment.text}</h5>
                </div>
              </CommentBox>
            ))}
          </CommentContainer>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export default CommentsModel;
