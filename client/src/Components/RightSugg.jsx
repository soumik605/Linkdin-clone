import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { userContext } from "../App";
import Loader1 from "./Loader1";
import Skeleton from "@mui/material/Skeleton";

const RightSugg = () => {
  const [allUser, setAllUser] = useState([]);
  const [showSuggestionLoader, setShowSuggestionLoader] = useState(true);
  const [showReqConnBtn, setShowReqConnBtn] = useState(true);
  const history = useHistory();
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    const interval = setInterval(() => {
      if (state) {
        fetch(`/alluser`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert.error(data.error);
            } else {
              setAllUser(data.users);
              setShowSuggestionLoader(false);
            }
          });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [state]);

  const RequestConnection = async (userid) => {
    setShowReqConnBtn(false);
    await fetch(`/reqconnect/${userid}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
        } else {
          localStorage.setItem("user", JSON.stringify(data.result2));
          dispatch({ type: "USER", payload: data.result2 });
          setShowReqConnBtn(true);
        }
      });
  };

  return (
    <>
      <h3>People you may know</h3>
      {showSuggestionLoader && (
        <User>
          <Skeleton
            variant="circular"
            animation="wave"
            width={50}
            height={50}
          />
          <RightDetails>
            <Skeleton variant="text" animation="wave" width={150} height={30} />
            <Skeleton variant="text" animation="wave" width={180} height={18} />
            <Skeleton
              variant="rectengular"
              animation="wave"
              width={80}
              height={30}
              style={{borderRadius:"15px", marginTop:"5px"}}
            />
          </RightDetails>
        </User>
      )}

      {allUser &&
        allUser
          .filter((s_user) => {
            if (
              s_user._id === state._id ||
              s_user.connections.includes(state._id) ||
              s_user.conrequests.includes(state._id) ||
              s_user.myrequests.includes(state._id)
            ) {
              return null;
            } else {
              return s_user;
            }
          })
          .map((user) => (
            <User key={user._id}>
              <RightProfile src={user.profile_pic} alt="" />
              <RightDetails>
                <h3>
                  {" "}
                  <a href={`/profile/${user._id}`}>{user.name}</a>
                </h3>
                <h5>{user.about}</h5>

                {showReqConnBtn ? (
                  <ConnectBtn onClick={() => RequestConnection(user._id)}>
                    Connect
                  </ConnectBtn>
                ) : (
                  <ConnectBtn style={{ cursor: "not-allowed" }}>
                    Connect
                  </ConnectBtn>
                )}
              </RightDetails>
            </User>
          ))}
    </>
  );
};

export const RightProfile = styled.img`
  height: 50px;
  width: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;
export const RightDetails = styled.div`
  width: calc(100% - 70px);
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  & > h5,
  & > h3 {
    text-align: left;
    
  }
`;
export const User = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
`;
export const ConnectBtn = styled.button`
  width: fit-content;
  padding: 5px 10px;
  margin: 5px 0px;
  background-color: white;
  color: grey;
  border: 1px solid gray;
  border-radius: 15px;

  &:hover {
    background-color: lightgray;
    color: black;
  }
`;

export default RightSugg;
