import React, { useState, useContext } from "react";
import styled from "styled-components";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PeopleIcon from "@material-ui/icons/People";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { Link } from "react-router-dom";
import AddPostModel from "./Models/AddPostModel";
import SearchModel from "./Models/SearchModel";
import LogoutModel from "./Models/LogoutModel";
import { userContext } from "../App";

const NavBar = () => {
  const [showCreateModel, setShowCreateModel] = useState(false);
  const [showSearchModel, setShowSearchModel] = useState(false);
  const [showLogoutModel, setShowLogoutModel] = useState(false);
  const [name, setName] = useState("");
  const { state, dispatch } = useContext(userContext);

  return (
    <>
      {showCreateModel && <AddPostModel model={setShowCreateModel} />}
      {showLogoutModel && <LogoutModel model={setShowLogoutModel} />}
      {showSearchModel && (
        <SearchModel
          model={setShowSearchModel}
          name={name}
          showName={setName}
        />
      )}
      <NavContainer>
        <TopNavCont>
          <TopNav>
            <LeftDiv>
              <Logo>
                <a href="/">
                  <img src="/Images/in-icon.png" alt="" />
                </a>
              </Logo>
              <Input onClick={() => setShowSearchModel(true)}>
                <SearchIcon style={{ margin: "auto" }} />{" "}
                <InputBase
                  value={name}
                  placeholder="Search"
                  inputProps={{ "aria-label": "naked" }}
                  onChange={(e) => setName(e.target.value)}
                />
              </Input>
            </LeftDiv>

            <IconContainer>
              <Link to="/">
                <Home>
                  <HomeRoundedIcon />
                  <h5>Home</h5>
                </Home>
              </Link>

              <Link to="/connections">
                <MyNetwork>
                  <PeopleIcon />
                  <h5>My Network</h5>
                </MyNetwork>
              </Link>

              <Link to="/chat">
                <Message>
                  <MessageRoundedIcon />
                  <h5>Messages</h5>
                </Message>
              </Link>

              <button
                onClick={() => setShowLogoutModel(true)}
                style={{ border: "none", backgroundColor: "white" }}
              >
                <Me>
                  <img src={state && state.profile_pic} alt="" />
                  <h5>Me</h5>
                </Me>
              </button>
            </IconContainer>
          </TopNav>
        </TopNavCont>

        <DownNav>
          <Link to="/">
            <Home>
              <HomeRoundedIcon />
              <h5>Home</h5>
            </Home>
          </Link>

          <Link to="/connections">
            <MyNetwork>
              <PeopleIcon />
              <h5>My Network</h5>
            </MyNetwork>
          </Link>

          <button
            onClick={() => setShowCreateModel(true)}
            style={{
              border: "none",
              backgroundColor: "white",
             
              marginBottom: "auto",
            }}
          >
            <AddIcon>
              <AddBoxIcon />
              <h5>Add post</h5>
            </AddIcon>
          </button>

          <Link to="/chat">
            <Message>
              <MessageRoundedIcon />
              <h5>Messages</h5>
            </Message>
          </Link>

          <button
            onClick={() => setShowLogoutModel(true)}
            style={{ border: "none", backgroundColor: "white" }}
          >
            <Me>
              <img src={state && state.profile_pic} alt="" />
              <h5>Me</h5>
            </Me>
          </button>
        </DownNav>
      </NavContainer>
    </>
  );
};

const NavContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0px;
  background-color: white;
  z-index: 99;
`;

const TopNavCont = styled.nav`
  width: 100%;
  max-width: 1128px;
  margin: auto;
  border-bottom: 1px solid grey;
`;
const TopNav = styled.nav`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
`;

const DownNav = styled.div`
  display: none;
  width: 100%;
  padding: 5px 0;
  background-color: white;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0px;
  }
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0 15px;
  justify-content: space-evenly;
  width: 450px;

  @media (max-width: 767px) {
    display: none;
  }
`;

const Logo = styled.div`
  float: left;
  padding: 5px;
  margin: auto 0;

  & > a > img {
    height: 34px;
  }
`;

const Input = styled.div`
  float: left;
  margin: 10px;

  display: flex;
  flex-direction: row;
  border-radius: 5px;
  background-color: #d3d3ff;
`;

const Home = styled.div`
  color: #535353;
  margin-top: auto;
  margin-bottom: auto;

  & > h5 {
    font-weight: 500;
  }
  &:hover {
    color: black;
  }
`;
const MyNetwork = styled.div`
  color: #535353;
  margin-top: auto;
  margin-bottom: auto;

  & > h5 {
    font-weight: 500;
  }
  &:hover {
    color: black;
  }
`;
const Message = styled.div`
  color: #535353;
  margin-top: auto;
  margin-bottom: auto;

  & > h5 {
    font-weight: 500;
  }
  &:hover {
    color: black;
  }
`;
const Me = styled.div`
  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: auto;
    margin-bottom: auto;
  }

  & > h5 {
    font-weight: 500;
  }
  &:hover {
    color: black;
  }
`;

const AddIcon = styled.div`
  color: #535353;

  & > h5 {
    font-weight: 500;
  }
  &:hover {
    color: black;
  }
`;

export default NavBar;
