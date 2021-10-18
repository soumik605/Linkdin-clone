import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #00000050;
  top: 0px;
  left: 0px;
  z-index: 20;
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

export const Profile = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  align-items: center;

  & > img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
  }
`;
export const Title = styled.div`
  width: 100%;
  min-height: 50px;

  & > input {
    width: 100%;
    border: none;
    padding: 10px 20px;
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }
`;
export const Photo = styled.div`
  width: 80%;
  max-width: 400px;
  height: 300px;
  margin: auto;
  overflow-y: auto;
  overflow-x: hidden;

  & > img {
    width: 400px;
    object-fit: cover;
    overflow-y: auto;
    overflow-x: hidden;
    background-repeat: no-repeat;
  }

  @media (max-width: 768px) {
    max-width: 300px;
  }
`;
export const Add = styled.div`
  width: 100%;
  padding: 10px 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-size: 16px;
  }
`;
