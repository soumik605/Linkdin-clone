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
  border-radius: 0 10px 10px 0;
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
  object-fit: cover;
  }
`;

export const ChatBox = styled.div`
  width: 100%;
  height: calc(100vh - 50px - 50px - 100px);
  background-color: lightgray;
  overflow-y: scroll;
  transform: rotate(180deg);
  direction: rtl;

  & > div {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column-reverse;
    flex-direction: column-reverse;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;

    & > h2 {
      transform: rotate(180deg);
      direction: rtl;
    }
  }

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
  word-break: break-all;
  color: white;
  background: rgb(1, 93, 212);
  text-align: left;
  margin-top: auto;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  position: relative;
  word-break: break-all;
  transform: rotate(180deg);
  direction: ltr;
`;
export const MyBox = styled.div`
  border-radius: 40px;
  max-width: fit-content;
  margin: 6px;
  font-size: 12px;
  padding: 10px 30px;
  word-break: break-all;
  margin-left: auto;
  text-align: right;
  color: rgb(2, 0, 0);
  background: rgb(255, 255, 255);
  margin-top: auto;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  position: relative;
  word-break: break-all;
  transform: rotate(180deg);
  direction: ltr;
`;

/* export const FriendBox = styled.div`
  border-radius: 40px;
  max-width: fit-content;
  min-width: 100px;
  margin: 6px;
  font-size: 12px;
  padding: 10px 30px;
  word-break: break-all;
  color: white;
  background: rgb(1, 93, 212);
  text-align: left;
  margin-top: auto;
`;
export const MyBox = styled.div`
  border-radius: 40px;
  max-width: fit-content;
  min-width: 100px;
  margin: 6px;
  font-size: 12px;
  padding: 10px 30px;
  word-break: break-all;
  margin-left: auto;
  text-align: right;
  color: rgb(2, 0, 0);
  background: rgb(255, 255, 255);
  margin-top: auto;
`; */
