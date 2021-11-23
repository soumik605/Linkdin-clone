import React, { useState, useEffect, useContext } from "react";
import LeftProfile from "./LeftProfile";
import NavBar from "./NavBar";
import { Container, LeftCont, MainCont, RightCont } from "./Style/FeedStyle";
import { userContext } from "../App";
import Loader1 from "./Loader1";
import { useParams } from "react-router-dom";
import RightSugg from "./RightSugg";
import Post from "./Post";
import { connect } from "react-redux";
import { fetchUserPosts } from "../service/Actions/UserActions";

const Myposts = (props) => {
  const { userid } = useParams();
  const [showMyPostLoader, setShowMyPostLoader] = useState(true);
  const { state } = useContext(userContext);

  const FetchUserPosts = async () => {
    await props.fetchUserPosts(userid);
    setShowMyPostLoader(false);
  };

  useEffect(() => {
    if (userid && state) {
      const interval = setInterval(() => {
        FetchUserPosts();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [state, userid]);

  return (
    <>
      <NavBar />

      <Container>
        <LeftCont>
          <LeftProfile />
        </LeftCont>

        <MainCont>
          {!props.user.userPosts && showMyPostLoader && <Loader1 />}
          {props.user.userPosts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </MainCont>
        <RightCont>
          <RightSugg />
        </RightCont>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserPosts: (userid) => dispatch(fetchUserPosts(userid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Myposts);
