import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  LeftCont,
  MainCont,
  RightCont,
  InputBox,
} from "./Style/FeedStyle";
import { userContext } from "../App";
import AddPostModel from "./Models/AddPostModel";
import NavBar from "./NavBar";
import Loader1 from "./Loader1";
import LeftProfile from "./LeftProfile";
import RightSugg from "./RightSugg";
import Post from "./Post";
import { connect } from "react-redux";
import { fetchSubPosts } from "../service/Actions/PostAction";

const MyFeed = (props) => {
  const { state } = useContext(userContext);
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [showFeedLoader, setShowFeedLoader] = useState(true);

  const FetchSubPosts = async () => {
    await props.fetchSubPosts();
    setShowFeedLoader(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (state) {
        FetchSubPosts();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <>
      {state && showCreateModel && (
        <AddPostModel model={setShowCreateModel} post={null} />
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
          {props.subPosts.length === 0 && showFeedLoader && <Loader1 />}
          {props.subPosts.length !== 0 &&
            props.subPosts.map((post) => <Post post={post} key={post._id} />)}
        </MainCont>
        <RightCont>
          <RightSugg />
        </RightCont>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  subPosts: state.PostReducer.subPosts,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSubPosts: () => dispatch(fetchSubPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFeed);
