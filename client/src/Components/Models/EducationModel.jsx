import React, { useState, useContext, useEffect } from "react";
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
import { connect } from "react-redux";
import {
  addEducation,
  deleteEducation,
  updateEducation,
} from "../../service/Actions/UserActions";

const EducationModel = (props) => {
  const { dispatch } = useContext(userContext);
  const [education, setEducation] = useState(props.education);
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    if (props.user.currentUser) {
      dispatch({
        type: "UPDATE_EDU",
        payload: {
          education: props.user.currentUser.education,
        },
      });
      localStorage.setItem("user", JSON.stringify(props.user.currentUser));
    }
  }, [props.user.currentUser]);

  const handleChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const AddEducation = async (e) => {
    setShowSubmitLoader(true);
    await props.addEducation(education);
    setShowSubmitLoader(false);
    props.model(false);
  };

  const DeleteEducation = async (e) => {
    setShowSubmitLoader(true);
    await props.deleteEducation(education);
    setShowSubmitLoader(false);
    props.model(false);
  };

  const UpdateEducation = async (e) => {
    setShowSubmitLoader(true);
    await props.updateEducation(education);
    setShowSubmitLoader(false);
    props.model(false);
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
              borderBottom: "1px solid lightgrey",
              paddingBottom: "10px",
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
                marginTop: "50px",
              }}
            >
              <Delete onClick={() => DeleteEducation()}>
                Delete education
              </Delete>
              <Save onClick={() => UpdateEducation()}>Update</Save>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                justifyContent: "space-between",
                marginTop: "50px",
              }}
            >
              <Delete onClick={() => DeleteEducation()}>
                Delete Education
              </Delete>
              <Save onClick={() => alert.error("Add all fields")}>Update</Save>
            </div>
          )}
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => ({
  addEducation: (education) => dispatch(addEducation(education)),
  updateEducation: (education) => dispatch(updateEducation(education)),
  deleteEducation: (education) => dispatch(deleteEducation(education)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EducationModel);
