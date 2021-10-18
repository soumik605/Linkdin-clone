import React, { useContext } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { userContext } from "../App";

const LeftProfile = () => {
  const { state, dispatch } = useContext(userContext);
  const history = useHistory()
  return (
    <>
      <Cover src={state && state.cover_pic} alt="" />
      <Profile src={state && state.profile_pic} alt="" />
      <Desc>
        <h4>
          <a href={"/profile"}>{state && state.name}</a>
        </h4>
        <h5 style={{ fontWeight: 400 }}>{state && state.headline}</h5>
        <button onClick={() => history.push("/connections")}>
          <h4>Connections</h4>
          <span> {state && state.connections.length}</span><br />
          <h4>Grow Your Network</h4>
        </button>
      </Desc>
    </>
  );
};

export const Profile = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: -50px auto 50px;
  box-sizing: border-box;
  object-fit: cover;
`;
export const Cover = styled.img`
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  object-fit: cover;
`;
export const Desc = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -50px;

  & > h4,
  & > h5 {
    padding: 2px 10px;
  }

  & > button {
    background-color: white;
    border: 1px solid lightgray;
    padding: 15px 10px;
    margin-top: 20px;

    & > h4 {
      float: left;
    }
    & > span {
      float: right;
    }
    &:hover {
      background-color: lightgray;
    }
  }
`;

export default LeftProfile;
