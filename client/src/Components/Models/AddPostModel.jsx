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
import { useAlert } from "react-alert";
import FullScreenLoader from "./FullScreenLoader";

const AddPostModel = (props) => {
  const { state } = useContext(userContext);
  const [photo, setPhoto] = useState("");
  const [addPhoto, setAddPhoto] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [editPhotoChanged, setEditPhotoChanged] = useState(false);
  const [title, setTitle] = useState("");
  const alert = useAlert();
  const [showAddBtn, setShowAddBtn] = useState(true);
  const [showAddPostLoader, setShowAddPostLoader] = useState(false);

  useEffect(() => {
    if (props.post) {
      setPhoto(props.post.photo);
      setTitle(props.post.title);
    }
  }, [props.post]);

  const CreatePost = () => {
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
          setShowAddPostLoader(false);
        } else {
          props.model(false);
          setShowAddBtn(true);
          setShowAddPostLoader(false);
        }
      });
  };

  const EditPost = (url) => {
    fetch(`/editpost/${props.post._id}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title,
        photo: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert.error(data.error);
          setShowAddPostLoader(false);
        } else {
          props.model(false);
          setShowAddBtn(true);
          setShowAddPostLoader(false);
        }
      });
  };

  useEffect(() => {
    if (photoUrl && !props.post) {
      CreatePost();
    }
    if (photoUrl && props.post) {
      EditPost(photoUrl);
    }
  }, [photoUrl, props.post]);

  const handlePhotoChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
    setAddPhoto(e.target.files[0]);
    setEditPhotoChanged(true);
  };

  const AddPost = async () => {
    setShowAddBtn(false);
    setShowAddPostLoader(true);
    if (editPhotoChanged) {
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
    } else {
      if (props.post) {
        EditPost(props.post.photo);
      } else {
        CreatePost();
      }
    }
  };

  return (
    <Container>
      {showAddPostLoader && <FullScreenLoader />}
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <Close onClick={() => props.model(false)}>x</Close>
          <Profile>
            <img src={state && state.profile_pic} alt="" />
            <h2>{state && state.name}</h2>
          </Profile>

          <Title>
            <input
              placeholder="What do you want to talk about?"
              autoFocus={true}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Title>
          <Photo>
            <img src={photo} alt="" />
          </Photo>
          <Add>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handlePhotoChange(e)}
            />
            {showAddBtn && props.post ? (
              <button onClick={() => AddPost()}>Save</button>
            ) : (
              showAddBtn && <button onClick={() => AddPost()}>Post</button>
            )}
          </Add>
        </PopupBox>
      </ClickAwayListener>
    </Container>
  );
};

export default AddPostModel;
