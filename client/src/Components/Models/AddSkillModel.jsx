import React, { useState, useContext, useEffect } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { userContext } from "../../App";
import styled from "styled-components";
import { addSkill } from "../../service/Actions/UserActions";
import { connect } from "react-redux";

const AddSkillModel = (props) => {
  const [newSkill, setNewSkill] = useState("");
  const { state, dispatch } = useContext(userContext);
  const [showAddInput, setShowAddInput] = useState(false);

  useEffect(() => {
    if (props.user.currentUser) {
      localStorage.setItem("user", JSON.stringify(props.user.currentUser));
      dispatch({ type: "USER", payload: props.user.currentUser });
    }
  }, [props.user.currentUser]);

  const AddSkill = async () => {
    await props.addSkill(newSkill)
     props.model(false);
    setNewSkill("");
  };

  return (
    <Container>
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <div style={{ borderBottom: "1px solid lightgray" }}>
            <h3>Add skill</h3>
            <Close onClick={() => props.model(false)}>x</Close>
          </div>
          <div
            style={{
              justifyContent: "flex-start",
              marginBottom: "30px",
              maxHeight: "60px",
            }}
          >
            {state.skills &&
              state.skills.map((skill) => (
                <h4
                  style={{
                    margin: "10px",
                    border: "1px solid grey",
                    padding: "2px 10px",
                    borderRadius: "15px",
                  }}
                  key={skill}
                >
                  {skill}
                </h4>
              ))}
          </div>
          <div>
            {showAddInput ? (
              <input
                autoFocus={true}
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
            ) : (
              <button onClick={() => setShowAddInput(true)}>
                <h3>+ add new skill</h3>
              </button>
            )}
          </div>
          <button onClick={() => AddSkill()}>Save</button>
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
  width: 80%;
  max-width: 700px;
  margin: auto;
  height: 40vh;
  top: 25vh;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 15px;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > button {
      background-color: white;
      border: none;
      color: blue;
    }
    & > input {
      width: 90%;
      height: 30px;
      padding-left: 10px;
      margin: auto;
    }
    & > h4 {
      &:hover {
        background-color: lightgray;
      }
    }
  }

  & > button {
    padding: 10px;
    background-color: #0a66c2;
    color: white;
    width: 70px;
    border-radius: 20px;
    margin: auto 0 0 auto;
    border: none;
  }

  @media (max-width: 768px) {
    height: 35vh;
    width: 100%;
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

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addSkill: (newSkill) => dispatch(addSkill(newSkill)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSkillModel);
