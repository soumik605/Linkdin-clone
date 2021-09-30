import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #00000050;
  top: 0px;
  left: 0px;
  z-index: 99;
  position: fixed;
  box-sizing: border-box;
  overflow: hidden;
`;

export const PopupBox = styled.div`
  position: relative;
  width: 90%;
  max-width: 700px;
  margin: auto;
  height: 70vh;
  top: 15vh;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  @media (max-width: 768px) {
    height: 60vh;
    width: 100%;
    top: 20vh;
    margin: auto;
  }
`;

export const Close = styled.div`
  content: "x";
  cursor: pointer;
  position: relative;
  top: 0;
  margin-left: auto;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  font-size: 30px;
  display: inline-block;

  &:hover {
    background-color: lightgray;
  }
`;


export const CommentContainer = styled.div`
    height: 65vh;
    overflow: scroll;
`

export const CommentBox = styled.div`
  padding: 5px;
  margin: 5px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  & > div {
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }

  & > div > h5,
  & > div > h4 {
    text-align: left;
  }
`;

export const Profile = styled.img`
  background-size: cover;
  background-repeat: no-repeat;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`;
