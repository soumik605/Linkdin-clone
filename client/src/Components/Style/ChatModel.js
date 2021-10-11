import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  top: 0px;
  right: 0px;
  z-index: 99;
  position: fixed;
  box-sizing: border-box;
  overflow: hidden;
`;

export const PopupBox = styled.div`
  width: 100%;
  max-width: 1128px;
  position: relative;
  margin: auto;
  height: calc(100vh - 100px);
  border-radius: 10px;
  top: 100px;

  @media (max-width: 768px) { 
    top: 60px;
    height: calc(100vh - 60px - 60px);
  }
`;

export const MainBox = styled.div`
  width: calc(100% - 384px);
  height: calc(100vh - 100px);
  margin-left: auto;
  background-color: white;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 60px - 60px);
  }
`;

export const TopBox = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 1px solid lightgray;

  & > h3 {
    margin: auto 10px;
  }

  & > img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-left: 20px;
  }
`;

export const ChatBox = styled.div`
  width: 100%;
  height: calc(100vh - 50px - 50px - 100px);
  background-color: lightgray;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: 768px) {
    height: calc(100vh - 50px - 50px - 60px - 60px);
  }
`;

export const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  background-color: lightgray;

  & > input {
    width: calc(100% - 70px);
    height: 48px;
    border-radius: 25px;
    margin: auto;
    outline: none;
    padding: 5px 15px;
    border: 1px solid lightgray;
  }
`;

export const FriendBox = styled.div`
  border-radius: 40px;
  max-width: fit-content;
  min-width: 100px;
  margin: 6px;
  font-size: 12px;
  padding: 10px 30px;
  overflow: hidden;
  word-break: break-all;
  color: white;
  background: rgb(1, 93, 212);
  text-align: left;

`;
export const MyBox = styled.div`
  border-radius: 40px;
  max-width: fit-content;
  min-width: 100px;
  margin: 6px;
  font-size: 12px;
  padding: 10px 30px;
  overflow: hidden;
  word-break: break-all;
  margin-left: auto;
  text-align: right;
  color: rgb(2, 0, 0);
  background: rgb(255, 255, 255);
  
`;
