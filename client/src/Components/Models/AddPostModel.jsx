import React, { useState, useContext, useEffect } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  Container,
  PopupBox,
  Close,
  Profile,
  Title,
  Photo,
  Add,
} from "../Style/CreatePostModel";
import { userContext } from "../../App";

const AddPostModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  const [photo, setPhoto] = useState("");
  const [addPhoto, setAddPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (photoUrl) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          photo: photoUrl,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert.error(data.error);
          } else {      
            props.model(false);
          }
        });
    }
  }, [photoUrl]);

  const handlePhotoChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
    setAddPhoto(e.target.files[0]);
  };

  const AddPost = async () => {
    const data1 = new FormData();
    data1.append("file", addPhoto);
    data1.append("upload_preset", "linkdin-clone");
    data1.append("cloud_name", "soumik");
    await fetch("https://api.cloudinary.com/v1_1/soumik/image/upload", {
      method: "post",
      body: data1,
    })
      .then((res) => res.json())
      .then((data) => {
        setPhotoUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <Close onClick={() => props.model(false)}>x</Close>
          <Profile>
            <img src={state && state.profile_pic} alt="" />
            <h2>{state && state.name}</h2>
          </Profile>
          <Title>
            <input placeholder="What do you want to talk about?" autoFocus onChange={(e)=>setTitle(e.target.value)} />
          </Title>
          <Photo>
            <img src={photo} alt="" />
          </Photo>

          <Add>
            <input type="file" onChange={(e) => handlePhotoChange(e)} />
            <button onClick={() => AddPost()}>Post</button>
          </Add>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export default AddPostModel;
