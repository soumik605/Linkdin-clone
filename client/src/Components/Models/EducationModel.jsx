import React, { useState, useContext } from "react";
import {
  Close,
  Container,
  PopupBox,
  InputBox,
  Save,
} from "../Style/EducationModel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { userContext } from "../../App";
import { useAlert } from "react-alert";




const EducationModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  const [education, setEducation] = useState(props.education);

  const handleChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const AddEducation = (e) => {
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
        } else {
          dispatch({
            type: "UPDATE_EDU",
            payload: {
              education: data.user.education,
            },
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          props.model(false);
        }
      });
  };

  const DeleteEducation = (e) => {
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
        } else {
          dispatch({
            type: "UPDATE_EDU",
            payload: {
              education: data.user.education,
            },
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          props.model(false);
        }
      });
  };
  const UpdateEducation = (e) => {
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
        } else {
          dispatch({
            type: "UPDATE_EDU",
            payload: {
              education: data.user.education,
            },
          });
          localStorage.setItem("user", JSON.stringify(data.user));
          props.model(false);
        }
      });
  };

  return (
    <Container>
      <ClickAwayListener
        onClickAway={() => {
          props.model(false);
          props.changeEdu([]);
        }}
      >
        <PopupBox>
          <Close
            onClick={() => {
              props.model(false);
              props.changeEdu([]);
            }}
          >
            X
          </Close>
          <InputBox>
            <h4>Course</h4>
            <input
              name="course"
              value={education.course}
              onChange={(e) => handleChange(e)}
            />
          </InputBox>

          <InputBox>
            <h4>Institute</h4>
            <input
              name="institute"
              value={education.institute}
              onChange={(e) => handleChange(e)}
            />
          </InputBox>

          <InputBox>
            <h4>Pass year</h4>
            <input
              name="passyear"
              value={education.passyear}
              onChange={(e) => handleChange(e)}
            />
          </InputBox>

          {props.education.length === 0 ? (
            <Save onClick={() => AddEducation()}>Save</Save>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
              }}
            >
              <Save onClick={() => DeleteEducation()}>Delete Education</Save>
              <Save onClick={() => UpdateEducation()}>Update</Save>
            </div>
          )}
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export default EducationModel;
