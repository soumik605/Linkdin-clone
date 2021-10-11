import React, { useState, useContext } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { userContext } from "../../App";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import FullScreenLoader from "./FullScreenLoader";

const EditSkillModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  const [showLoader, setShowLoader] = useState(false);
  const [newSkills, setnewSkills] = useState(state.skills);

  const EditSkill = (skill) => {
    const UserSkills = newSkills.filter((item) => {
      if (item !== skill) {
        return item;
      } else {
        return null;
      }
    });

    setnewSkills(UserSkills);
  };

  const SaveSkill = async (skill) => {
    setShowLoader(true);
    await fetch(`/deleteskill`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        newSkills,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
          setShowLoader(false);
          props.model(false);
        } else {
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          setShowLoader(false);
          props.model(false);
        }
      });
  };

  return (
    <Container>
      {showLoader && <FullScreenLoader />}
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <div
            style={{
              borderBottom: "1px solid lightgray",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <h3>Edit skill</h3>
            <Close onClick={() => props.model(false)}>x</Close>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "20px",
            }}
          >
            {newSkills &&
              newSkills.map((skill) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 20px",
                    borderBottom: "1px solid lightgrey",
                  }}
                  key={skill}
                >
                  <h4 key={skill}>{skill}</h4>
                  <DeleteIcon onClick={() => EditSkill(skill)} />
                </div>
              ))}
          </div>
          <button onClick={() => SaveSkill()}>Save</button>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #00000050;
  top: 0px;
  left: 0px;
  z-index: 99;
  position: fixed;
  box-sizing: border-box;
  overflow: hidden;
`;

const PopupBox = styled.div`
  position: relative;
  width: 90%;
  max-width: 700px;
  min-height: 300px;
  margin: auto;
  top: 15vh;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  & > button {
    padding: 10px;
    background-color: #0a66c2;
    color: white;
    width: 70px;
    border-radius: 20px;
    margin: auto 10px 10px auto;
    border: none;
  }

  @media (max-width: 768px) {
    height: 60vh;
    width: 100%;
    top: 20vh;
    margin: auto;
  }
`;

const Close = styled.div`
  content: "x";
  cursor: pointer;
  position: relative;
  top: 0;
  margin-left: auto;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  font-size: 30px;
  display: inline-block;

  &:hover {
    background-color: lightgray;
  }
`;

export default EditSkillModel;
