import styled from "styled-components";

export const Container = styled.div`
  max-width: 1128px;
  margin: 100px auto 50px;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: "main adv";
  grid-gap: 2rem;

  @media (max-width: 768px) {
  margin: 60px auto 50px;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: "main " "adv";
  }
`;
export const Main = styled.div`
  grid-area: "main";
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  height: fit-content;
`;
export const Adv = styled.div`
  grid-area: "adv";
  height: 1000px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid lightgray;
  background-color: white;
  height: fit-content;
  padding: 20px 5px;

  & > h3 {
    margin-bottom: 10px;
    text-align: left;
  }
`;
export const ImageContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 10px 10px 0 0;
  border: 1px solid lightgray;
`;
export const Cover = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px 10px 0 0;

  & > img {
    width: 100%;
    height: 200px;
    border-radius: 10px 10px 0 0;
  }
  & > .cover {
    width: 100%;
    height: 200px;
    border-radius: 10px 10px 0 0;
  }

  @media (max-width: 768px) {
    height: 120px;

    & > img {
      height: 120px;
    }
    & > .cover {
      height: 120px;
    }
  }
`;
export const Profile = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 4px solid white;
  position: relative;
  top: -120px;
  left: 20px;
  z-index: 2;

  & > img {
    background-size: cover;
    background-repeat: no-repeat;
    width: 152px;
    height: 152px;
    border-radius: 50%;
    margin: auto;
  }
  & > .profile {
    background-size: cover;
    background-repeat: no-repeat;
    width: 152px;
    height: 152px;
    border-radius: 50%;
    margin: auto;
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
    top: -80px;
    left: 30px;

    & > img {
      width: 122px;
      height: 122px;
    }
    & > .profile {
      width: 122px;
      height: 122px;
    }
  }
`;
export const Details = styled.div`
  margin-top: -100px;
  width: 100%;
  padding-left: 30px;
  padding-bottom: 15px;
  background-color: white;
  border: 1px solid lightgray;
  border-top: none;
  border-radius: 0px 0px 10px 10px;

  @media (max-width: 768px) {
    margin-top: -60px;
  }
  & > * {
    text-align: left;
  }

  & > div > button {
    background-color: white;
    color: grey;
    padding: 5px 15px;
    margin-right: 10px;
    border: 1px solid grey;
    border-radius: 15px;

    &:first-child {
      background-color: #0a66c2;
      border: #0a66c2;
      color: white;

      &:hover {
        background-color: blue;
        color: white;
      }
    }

    &:hover {
      background-color: lightgray;
      color: black;
    }
  }

  & > h4 > a {
    color: blue;
    &:hover {
      text-decoration: underline;
    }
  }
`;
export const Education = styled.div`
  width: 100%;
  padding: 25px 30px;
  box-sizing: border-box;
  background-color: white;
  margin: 10px auto;
  border-radius: 10px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const Skills = styled.div`
  width: 100%;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    flex-wrap: nowrap;
    margin: 5px;


    & > div > button {
      padding: 5px 10px;
      border: none;
      background-color: white;
      border-radius: 15px;
      color: grey;
      margin-right: 15px;

      &:hover {
        background-color: lightgray;
        color: black;
      }
    }
  }
`;
export const Button = styled.button`
  float: left;
  color: white;
  background-color: blue;
  padding: 5px;
  width: 100px;
  border-radius: 20px;
  border: none;
  margin: 10px;
  font-size: 12px;
`;
export const EduBox = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > div > h3,
    & > div > h4,
    & > div > h5 {
      text-align: left;
    }
  }

  & > div > img {
    width: 70px;
    height: 70px;
    margin-right: 20px;
  }
`;
export const PostBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px gray;
  border: 1px solid lightgray;
  margin: 10px auto;
  padding: 10px;
`;

export const ConnectBtn = styled.button`
  width: fit-content;
  padding: 5px 10px;
  margin: 5px 20px;
  background-color: white;
  color: grey;
  border: 1px solid gray;
  border-radius: 15px;

  &:hover {
    background-color: lightgray;
    color: black;
  }
`;

export const Activity = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-top: 10px;
  padding-top: 10px;
  & > h3,
  & > h5 {
    text-align: left;
    margin-left: 30px;
  }

  & > button {
    width: 100%;
    background-color: white;
    border: none;
    border-top: 1px solid lightgray;
    padding: 10px;
    border-radius: 0 0 10px 10px;
    &:hover {
      background-color: lightgray;
    }
  }

  & > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 10px;
    padding: 10px 30px;

    & > div {
      width: 50%;
      display: flex;
      flex-direction: row;
      height: 80px;
      margin: 5px 0px;

      @media (max-width: 768px) {
        width: 100%;
      }

      & > img {
        height: 80px;
        margin-right: 10px;
      }

      & > div {
        margin: auto 0;
        & > * {
          text-align: left;
        }
      }
    }
  }
`;

export const Headline = styled.div`
  width: 100%;
  padding: 10px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
  margin-top: 10px;

  &>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 5px;
    padding-left: 20px;
  }
`
