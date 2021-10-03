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



const LikesModel = (props) => {
    const { state, dispatch } = useContext(userContext);
    return (
        <Container>
        <ClickAwayListener onClickAway={() => props.model(false)}>
          <PopupBox>
            <Close onClick={() => props.model(false)}>x</Close>
            <h2>All Likes</h2>
            <CommentContainer>
              {props.likes.length !== 0 && props.likes.map((like) => (
                <CommentBox key={like._id}>
                  <Profile src={like.profile_pic} alt="" />
                  <div>
                    <h4>
                      {state && state._id === like._id ? (
                        <Link to="/profile">
                          {like.name}
                        </Link>
                      ) : (
                        <Link to={`/profile/${like._id}`}>
                          {like.name}
                        </Link>
                      )}
                    </h4>
                  
                  </div>
                </CommentBox>
              ))}
            </CommentContainer>
          </PopupBox>
        </ClickAwayListener>
      </Container>
    )
}

export default LikesModel
