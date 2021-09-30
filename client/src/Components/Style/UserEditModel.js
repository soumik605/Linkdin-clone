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
  max-width: 1000px;
  margin: auto;
  height: 70vh;
  top: 15vh;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: 100vh;
    width: 100%;
    top: 0px;
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
  background-color: blue;
  color: white;
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 15px;
  border: none;
  width: fit-content;
  margin: auto;
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
    margin: 2px auto;
  }

  & > img {
    margin: auto;
    width: 300px;
    height: auto;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
