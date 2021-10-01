import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1128px;
  margin: 80px auto 80px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
  grid-gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: "left" "right";
    grid-gap: 0.2rem;
  }
`;

export const LeftDiv = styled.div`
  width: 100%;
  grid-area: left;
  height: fit-content;
  min-height: 100px;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const RightDiv = styled.div`
  width: 100%;
  grid-area: right;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const ReqCont = styled.div`
  width: 100%;
  padding: 20px 0px;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;

  & > h3 {
    margin: 0 auto 5px 10px;
    text-align: left;
  }
`;
export const RequestBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  border-top: 1px solid black;
  padding: 10px;
`;
export const ReqPic = styled.div`
  width: 80px;
  height: 80px;
  margin-top: auto;
  margin-bottom: auto;

  & > img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;

    & > img {
      width: 50px;
      height: 50px;
    }
  }
`;
export const ReqUser = styled.div`
  width: calc(100% - 100px - 200px);
  height: 100px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: auto;
  margin-bottom: auto;

  & > h3,
  & > h5 {
    text-align: left;
  }

  @media (max-width: 768px) {
    width: calc(100% - 80px - 150px);
    height: 80px;
  }
`;
export const CheckBox = styled.div`
  width: 200px;
  height: 100px;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
    width: 150px;
    height: 80px;
    flex-direction: column;
  }
`;
export const SuggestionBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 0;
  border-radius: 20px;
  background-color: white;

  & > h3 {
    margin: 5px auto 10px 15px;
  }
`;
export const UserBox = styled.div`
  width: 200px;
  margin: 5px auto;
  border-radius: 10px;
  padding-bottom: 5px;
  box-shadow: 2px 2px 2px 1px gray;
  box-sizing: border-box;
  border: 1px solid grey;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

export const ChBtn = styled.button`
  padding: 5px 15px;
  margin: 5px;
  color: blue;
  border: 1px solid blue;
  border-radius: 20px;
  margin: auto;
  font-size: 18px;
  background-color: white;

  &:hover {
    background-color: lightblue;
  }

  &:first-child {
    border: 1px solid white;
    color: grey;

    &:hover {
      background-color: grey;
      color: black;
    }
  }
`;

export const Cover = styled.div`
  width: 200px;
  height: 80px;
  border-radius: 10px;

  & > img {
    width: 200px;
    height: 80px;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 60px;

    & > img {
      width: 150px;
      height: 60px;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
`;
export const Profile = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: relative;
  top: -35px;
  margin: auto;
  border: 1px solid white;
  box-sizing: border-box;

  & > img {
    width: 68px;
    height: 68px;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: relative;
    top: -30px;
    margin: auto;
    border: 1px solid white;
    box-sizing: border-box;

    & > img {
      width: 60px;
      height: 60px;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
    }
  }
`;
export const Details = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -30px;

  & > h2,
  & > h4 {
    font-weight: 400;
  }
`;
export const ConnectBtn = styled.button`
  width: 80%;
  padding: 5px;
  background-color: white;
  color: blue;
  border: 1px solid blue;
  border-radius: 15px;

  &:hover {
    background-color: lightblue;
  }

  @media (max-width: 768px) {
    top: -20px;
  }
`;
export const LeftUserBox = styled.div`
  width: 100%;
  border-top: 1px solid black;
  display: flex;
  flex-wrap: nowrap;
  padding: 5px;
  justify-content: center;

  & > div {
    margin: auto;
  }
`;

export const LeftProfile = styled.img`
  height: 50px;
  width: 50px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;

export const Message = styled.button`
  background-color: white;
  color: blue;
  border: 1px solid blue;
  border-radius: 15px;
  padding: 2px 5px;
  height: 30px;
  margin: auto;

  &:hover {
    background-color: lightblue;
  }
`;
