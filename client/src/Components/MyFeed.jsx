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
import { useAlert } from "react-alert";
import NavBar from "./NavBar";
import Loader1 from "./Loader1";
import LeftProfile from "./LeftProfile";
import RightSugg from "./RightSugg";
import Post from "./Post";

const MyFeed = () => {
  const { state } = useContext(userContext);
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [allPost, setAllPost] = useState([]);
  const alert = useAlert();
  const [showFeedLoader, setShowFeedLoader] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state) {
        fetch("/allsubpost", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.err) {
              alert.error(data.err);
            } else {
              setAllPost(data.result);
              setShowFeedLoader(false);
            }
          });
      }
    }, 2000);
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
          {showFeedLoader && <Loader1 />}
          {allPost.map((post) => (
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

export default MyFeed;
