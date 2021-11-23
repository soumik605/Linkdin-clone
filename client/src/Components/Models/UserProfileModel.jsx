import React, { useContext, useState, useEffect } from "react";
import { Container, PopupBox, Close } from "../Style/AddPhotoModel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { userContext } from "../../App";
import { useAlert } from "react-alert";
import FullScreenLoader from "./FullScreenLoader";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { editDetails } from "../../service/Actions/UserActions";
import { connect } from "react-redux";

const UserProfileModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  const [profile, setProfile] = useState(state.profile_pic);
  const [addProfile, setAddProfile] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const alert = useAlert();
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);

  useEffect(() => {
    if (props.user.currentUser) {
      dispatch({
        type: "UPDATE_PHOTO",
        payload: {
          profile_pic: props.user.currentUser.profile_pic,
          cover_pic: props.user.currentUser.cover_pic,
        },
      });
      localStorage.setItem("user", JSON.stringify(props.user.currentUser));
    }
  }, [props.user.currentUser]);

  const CallAddProfile = async (userDetails) => {
    await props.editDetails(userDetails);
    props.model(false);
    setShowSubmitLoader(false);
  };

  useEffect(() => {
    if (profileUrl) {
      const details = {
        name: state.name,
        email: state.email,
        address: state.address,
        about: state.about,
        cover_pic: state.cover_pic,
        profile_pic: profileUrl,
      };
      CallAddProfile(details);
    }
  }, [profileUrl]);

  const addProfilePic = async () => {
    setShowSubmitLoader(true);
    const data2 = new FormData();
    data2.append("file", addProfile);
    data2.append("upload_preset", "linkdin-clone");
    data2.append("cloud_name", "soumik");
    await fetch("https://api.cloudinary.com/v1_1/soumik/image/upload", {
      method: "post",
      body: data2,
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const handleProfileChange = (e) => {
    setProfile(URL.createObjectURL(e.target.files[0]));
    setAddProfile(e.target.files[0]);
    setShowSubmitBtn(true);
  };

  const removeProfilePic = () => {
    setShowSubmitLoader(true);
    const details = {
      name: state.name,
      email: state.email,
      address: state.address,
      about: state.about,
      cover_pic: state.cover_pic,
      profile_pic:
        "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg",
    };
    CallAddProfile(details);
  };

  return (
    <Container>
      {showSubmitLoader && <FullScreenLoader />}
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <div>
            <h3 style={{ float: "right" }}>Profile Photo</h3>
            <Close onClick={() => props.model(false)}>x</Close>
          </div>
          <img src={profile} alt="" />

          <div>
            <button>
              <label for="file-input">
                <CameraAltIcon />
                <h3>Add Photo</h3>
              </label>
              <input
                id="file-input"
                type="file"
                onChange={(e) => handleProfileChange(e)}
                style={{ display: "none" }}
              />
            </button>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <button onClick={() => removeProfilePic()}>
                <DeleteIcon />
                <h3>Delete</h3>
              </button>
              {showSubmitBtn && (
                <button
                  style={{ marginLeft: "15px" }}
                  onClick={() => addProfilePic()}
                >
                  <SaveIcon />
                  <h3>Submit</h3>
                </button>
              )}
            </div>
          </div>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

const mapDispatchToProps = (dispatch) => ({
  editDetails: (userDetails) => dispatch(editDetails(userDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileModel);
