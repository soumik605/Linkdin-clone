import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
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
  max-width: 300px;
  margin-right: 200px;
  margin-left: auto;
  height: 40vh;
  top: 65px;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 2px 2px 2px 1px gray;

  &>img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      margin: 10px auto;
  }

  &>button{
      border: 1px solid black;
      background-color: white;
      margin: auto;
      font-size: 16px;
      padding: 5px;
      border-radius: 15px;

      &:hover{
          background-color: grey;
          color: white;
      }
  }

  @media (max-width: 1128px) {
    margin-right: 10px;
  }


  @media (max-width: 768px) {
   top: calc(100vh - 60px - 43vh);
  
  }
`;