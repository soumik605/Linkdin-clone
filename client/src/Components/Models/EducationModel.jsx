import React, { useState, useContext } from "react";
import {
  Close,
  Container,
  PopupBox,
  InputBox,
  Save,
  Delete,
} from "../Style/EducationModel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { userContext } from "../../App";
import { useAlert } from "react-alert";
import FullScreenLoader from "./FullScreenLoader";

const EducationModel = (props) => {
  const {dispatch } = useContext(userContext);
  const [education, setEducation] = useState(props.education);
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const alert = useAlert();

  const handleChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const AddEducation = (e) => {
    setShowSubmitLoader(true);
    fetch("/addeducation", {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        education,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
          setShowSubmitLoader(false);
        } else {
          dispatch({
            type: "UPDATE_EDU",
            payload: {
              education: data.user.education,
            },
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          setShowSubmitLoader(false);
          props.model(false);
        }
      });
  };

  const DeleteEducation = (e) => {
    setShowSubmitLoader(true);
    fetch(`/deleteeducation`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        education: props.education,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
          setShowSubmitLoader(false);
        } else {
          dispatch({
            type: "UPDATE_EDU",
            payload: {
              education: data.user.education,
            },
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          setShowSubmitLoader(false);
          props.model(false);
        }
      });
  };
  const UpdateEducation = (e) => {
    setShowSubmitLoader(true);
    fetch(`/updateeducation`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        education,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
          setShowSubmitLoader(false);
        } else {
          dispatch({
            type: "UPDATE_EDU",
            payload: {
              education: data.user.education,
            },
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          setShowSubmitLoader(false);
          props.model(false);
        }
      });
  };

  return (
    <Container>
      {showSubmitLoader && <FullScreenLoader />}
      <ClickAwayListener
        onClickAway={() => {
          props.model(false);
          props.changeEdu([]);
        }}
      >
        <PopupBox>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom:"1px solid lightgrey",
              paddingBottom:"10px"
            }}
          >
            {props.education.course ? (
              <h2>Edit Education</h2>
            ) : (
              <h2>Add Education</h2>
            )}

            <Close
              onClick={() => {
                props.model(false);
                props.changeEdu([]);
              }}
            >
              x
            </Close>
          </div>

          <InputBox>
            <h4>Course*</h4>
            <input
              name="course"
              value={education.course}
              onChange={(e) => handleChange(e)}
            />
          </InputBox>

          <InputBox>
            <h4>Institute*</h4>
            <input
              name="institute"
              value={education.institute}
              onChange={(e) => handleChange(e)}
            />
          </InputBox>

          <InputBox>
            <h4>Pass year*</h4>
            <input
              name="passyear"
              value={education.passyear}
              onChange={(e) => handleChange(e)}
            />
          </InputBox>

          {props.education.length === 0 ? (
            education.course && education.institute && education.passyear ? (
              <Save onClick={() => AddEducation()}>Save</Save>
            ) : (
              <Save onClick={() => alert.error("Add all fields")}>Save</Save>
            )
          ) : education.course && education.institute && education.passyear ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                marginTop:"50px"
              }}
            >
              <Delete onClick={() => DeleteEducation()}>Delete education</Delete>
              <Save onClick={() => UpdateEducation()}>Update</Save>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                marginTop:"50px"
              }}
            >
              <Delete onClick={() => DeleteEducation()}>Delete Education</Delete>
              <Save onClick={() => alert.error("Add all fields")}>Update</Save>
            </div>
          )}
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export default EducationModel;
