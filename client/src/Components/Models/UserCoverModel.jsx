import React, { useContext, useState, useEffect } from "react";
import { Container, PopupBox, Close } from "../Style/AddPhotoModel";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { userContext } from "../../App";
import { useAlert } from "react-alert";
import FullScreenLoader from "./FullScreenLoader";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

const UserCoverModel = (props) => {
  const { state, dispatch } = useContext(userContext);
  const [cover, setCover] = useState(state.cover_pic);
  const [addCover, setAddCover] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const alert = useAlert();
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);

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
          profile_pic: state.profile_pic,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert.error(data.error);
            setShowSubmitLoader(false);
          } else {
            dispatch({
              type: "UPDATE_PHOTO",
              payload: {
                profile_pic: data.user.profile_pic,
                cover_pic: data.user.cover_pic,
              },
            });
            localStorage.setItem("user", JSON.stringify(data.user));
            setShowSubmitLoader(false);
            props.model(false);
          }
        });
    }
  }, [coverUrl]);

  const addCoverPic = async () => {
    setShowSubmitBtn(false);
    setShowSubmitLoader(true);
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
    setShowSubmitBtn(true);
  };

  const removeCoverPic = () => {
    setShowSubmitLoader(true);
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
        cover_pic:
          "https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=790&h=196&q=90&fm=png",
        profile_pic: state.profile_pic,
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
  };

  return (
    <Container>
      {showSubmitLoader && <FullScreenLoader />}
      <ClickAwayListener onClickAway={() => props.model(false)}>
        <PopupBox>
          <div>
            <h3 style={{ float: "right" }}>Cover Photo</h3>
            <Close onClick={() => props.model(false)}>x</Close>
          </div>
          <img
            src={cover}
            alt=""
            style={{ width: "750px", height: "150px", borderRadius: "0px" }}
          />

          <div>
            <button>
              <label htmlFor="file-input">
                <CameraAltIcon />
                <h3>Add Photo</h3>
              </label>
              <input
                id="file-input"
                type="file"
                onChange={(e) => handleCoverChange(e)}
                style={{ display: "none" }}
              />
            </button>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <button onClick={() => removeCoverPic()}>
                <DeleteIcon />
                <h3>Delete</h3>
              </button>
              {showSubmitBtn && (
                <button
                  style={{ marginLeft: "15px" }}
                  onClick={() => addCoverPic()}
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

export default UserCoverModel;
