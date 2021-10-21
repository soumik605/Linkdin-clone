import React, { useState, useEffect, useContext } from "react";
import LeftProfile from "./LeftProfile";
import NavBar from "./NavBar";
import { Container, LeftCont, MainCont, RightCont } from "./Style/FeedStyle";
import { userContext } from "../App";
import Loader1 from "./Loader1";
import { useParams } from "react-router-dom";
import RightSugg from "./RightSugg";
import Post from "./Post";

const Myposts = () => {
  const { userid } = useParams();
  const [myposts, setMyPosts] = useState([]);
  const [showMyPostLoader, setShowMyPostLoader] = useState(true);
  const { state } = useContext(userContext);

  useEffect(() => {
    if (userid) {
      const interval = setInterval(() => {
        fetch(`/mypost/${userid}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert.error(data.error);
            } else {
              setMyPosts(data.posts);
              setShowMyPostLoader(false);
            }
          });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [state,userid]);

  return (
    <>
      <NavBar />

      <Container>
        <LeftCont>
          <LeftProfile />
        </LeftCont>

        <MainCont>
          {showMyPostLoader && <Loader1 />}
          {myposts.map((post) => (
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

export default Myposts;
