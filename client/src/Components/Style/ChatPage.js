import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1128px;
  height: calc(100vh - 60px);
  margin: auto;
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border-radius: 10px;
`;

export const ChatList = styled.div`
  width: 384px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;

  &>h2{
      text-align: left;
      padding: 10px;
  }



  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ChatBox = styled.div`
  width: calc(100% - 384px);
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;

  @media (max-width: 768px) {
    width: 0;
    display: none;
  }
`;

export const UserBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 5px;
  border-top: 1px solid black;
  justify-content: flex-start;
  cursor: pointer;

  &:hover{
      background-color: lightgray;
  }
  &:active{
      background-color: lightgray;
  }

  & > img {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin-left: 15px;
  }

  & > h3 {
    padding-left: 20px;
    align-items: center;
    margin: auto 0;
  }
`;

