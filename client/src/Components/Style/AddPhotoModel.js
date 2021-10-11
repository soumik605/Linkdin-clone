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
  height: 70vh;
  top: 15vh;
  background: #1d2226;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
  border-radius: 15px;
  display: flex;
  flex-direction: column;

  
  & button{
      background-color: #1d2226;
      border: none;
    }

  &>img{
    width: 300px;
    height: 300px;
    margin: auto;
    border-radius: 50%;
  }

  &>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    border-top: 1px solid grey;


    &>button, &>div>button, &>h3{
      color: white;
      cursor: pointer;
      padding: 10px 15px;

      &:hover{
        background-color:#2d343b;
      }
    }
  }

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
  color: white;
  box-sizing: border-box;
`;
