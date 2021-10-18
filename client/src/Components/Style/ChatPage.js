import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1128px;
  height: calc(100vh - 102px);
  margin: auto;
  margin-top: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  border-radius: 10px;

  @media (max-width:768px){
    height: calc(100vh - 62px);
  margin: auto;
  margin-top: 60px;
  }
`;

export const ChatList = styled.div`
  width: 384px;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 10px 0 0 10px;
  background-color: white;
  z-index: 10;

  &>h2{
      text-align: left;
      padding: 10px;
  }



  @media (max-width: 768px) {
    width: 100%;
  z-index: 1;
  }
`;

export const ChatBox = styled.div`
  width: calc(100% - 384px);
  border: 1px solid lightgray;
  border-radius: 0 10px 10px 0;
  background-color: white;

  @media (max-width: 768px) {
    width: 0;
    display: none;
  }
`;

export const UserBox = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 5px;
  border: none;
  border-top: 1px solid lightgray;
  justify-content: flex-start;
  cursor: pointer;
  background-color: white;

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
  object-fit: cover;
  }

  & > h3 {
    padding-left: 20px;
    align-items: center;
    margin: auto 0;
  }
`;

