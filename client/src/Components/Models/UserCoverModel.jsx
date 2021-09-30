import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  PopupBox,
  Close,
  Save,
  InputBox,
} from "../Style/UserEditModel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { userContext } from "../../App";
import { useAlert } from "react-alert";


const UserCoverModel = (props) => {
  const [cover, setCover] = useState("");
  const [addCover, setAddCover] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const { state, dispatch } = useContext(userContext);

  
  useEffect(() => {
    if (coverUrl) {
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
          cover_pic: coverUrl,
          profile_pic: state.profile_pic
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
  }, [coverUrl]);

  const addCoverPic = async () => {
    const data2 = new FormData();
    data2.append("file", addCover);
    data2.append("upload_preset", "linkdin-clone");
    data2.append("cloud_name", "soumik");
    await fetch("https://api.cloudinary.com/v1_1/soumik/image/upload", {
      method: "post",
      body: data2,
    })
      .then((res) => res.json())
      .then((data) => {
        setCoverUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  const handleCoverChange = (e) => {
    setCover(URL.createObjectURL(e.target.files[0]));
    setAddCover(e.target.files[0]);
  };

  return (
    <Container>
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <Close onClick={() => props.model(false)}>x</Close>
          <h2 style={{ float: "right" }}>Edit Cover Picture</h2>

          <InputBox>
           
            <input type="file" onChange={(e) => handleCoverChange(e)} />
            <img src={cover} />
          </InputBox>

          <Save onClick={() => addCoverPic()}>Save</Save>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export default UserCoverModel;
