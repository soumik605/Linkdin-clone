import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  PopupBox,
  Close,
  Save,
  InputBox,
} from "../Style/AddPhotoModel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { userContext } from "../../App";

const UserProfileModel = (props) => {
  const [profile, setProfile] = useState("");
  const [addProfile, setAddProfile] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const { state, dispatch } = useContext(userContext);

  useEffect(() => {
    if (profileUrl) {
      fetch("/editdetails", {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          address: state.address,
          about: state.about,
          cover_pic: state.cover_pic,
          profile_pic: profileUrl,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert.error(data.error);
          } else {
            dispatch({
              type: "UPDATE_PHOTO",
              payload: {
                profile_pic: data.user.profile_pic,
                cover_pic: data.user.cover_pic,
              },
            });
            localStorage.setItem("user", JSON.stringify(data.user));
            props.model(false);
          }
        });
    }
  }, [profileUrl]);

  const addProfilePic = async () => {
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
  };

  return (
    <Container>
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <Close onClick={() => props.model(false)}>x</Close>
          <h2 style={{ float: "right" }}>Edit Profile Picture</h2>

          <InputBox>
            <input type="file" onChange={(e) => handleProfileChange(e)} />
            <img src={profile} />
          </InputBox>

          <Save onClick={() => addProfilePic()}>Save</Save>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export default UserProfileModel;
