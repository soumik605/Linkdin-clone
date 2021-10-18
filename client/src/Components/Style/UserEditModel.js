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
  max-width: 800px;
  margin: auto;
  max-height: 70vh;
  top: 15vh;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;


  @media (max-width: 768px) {
    width: 100%;
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

export const Save = styled.button`
  background-color: #0a66c2;
  color: white;
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 25px;
  border: none;
  width: fit-content;
  margin: 10px 25px 10px auto;

  &:hover{
    background-color: blue;
  }
`;

export const InputBox = styled.div`
  padding: 10px 25px;

  & > h4 {
    float: left;
    font-weight: 400;
  }

  & > input {
    width: 100%;
    height: 30px;
    padding: 2px 10px;
    box-sizing: border-box;
    margin: 5px auto;
    border-radius: 5px;
    border: 1px solid grey;
  }

  & > img {
    margin: auto;
    width: 300px;
    height: auto;
    background-repeat: no-repeat;
    background-size: cover;
  object-fit: cover;
  }
`;
