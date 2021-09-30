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
  max-width: 500px;
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

 

  &>h3{
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    height: 60vh;
    width: 100%;
    top: 10vh;
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

export const UserBox = styled.button`
  width: 100%;
  max-width: 400px;
  margin: 5px auto;
  background-color: white;
  border: none;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  border-radius: 10px;

  &:hover{
    background-color: lightgray;
  }

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    margin: 5px;
  }
  & > div {
    display: flex;
    flex-direction: column;
    margin: auto 5px;
    align-items: center;
  }
`;
