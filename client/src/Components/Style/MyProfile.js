import styled from "styled-components";

export const Container = styled.div`
  max-width: 1128px;
  margin: 60px auto 50px;
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: "main adv";
  grid-gap: 2rem;

  @media (max-width: 768px) {
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
  border: 1px solid grey;
  background-color: white;
  height: fit-content;
  padding: 20px 5px;
  box-shadow: 2px 2px 2px 1px gray;
`;

export const ImageContainer = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid grey;
  box-shadow: 2px 2px 2px 1px gray;
  border-radius: 10px 10px 0 0;
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

  @media (max-width: 768px) {
    height: 150px;

    & > img {
      height: 150px;
    }
  }
`;

export const Profile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid white;
  position: relative;
  top: -75px;
  left: 40px;
  z-index: 2;
  box-shadow: 2px 2px 10px 1px gray;

  & > img {
    background-size: cover;
    background-repeat: no-repeat;
    width: 142px;
    height: 142px;
    border-radius: 50%;
    margin: auto;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    top: -60px;
    left: 30px;

    & > img {
      width: 112px;
      height: 112px;
    }
  }
`;

export const Details = styled.div`
  margin-top: -40px;
  width: 100%;
  padding-left: 10px;
  padding-bottom: 15px;
  background-color: white;
  border: 1px solid grey;
  border-top: none;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 2px 2px 2px 1px gray;
  & > * {
    text-align: left;
  }
`;

export const Education = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
  margin: 10px auto;
  border-radius: 10px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 2px 1px gray;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const Skills = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 1px gray;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin: 5px;

    & > input {
      width: 80%;
      padding: 5px;
    }

    & > button {
      padding: 5px 10px;
      border: 1px solid grey;
      background-color: white;
      border-radius: 15px;

      &:hover {
        background-color: grey;
        color: white;
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

export const RightProfile = styled.img`
  height: 70px;
  width: 70px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;
export const RightDetails = styled.div`
  width: calc(100% - 70px);
  display: flex;
  flex-direction: column;
  &>h2, &>h4{
    text-align: left;
    padding-left: 20px;
  }
`;
export const User = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 5px auto 10px;
  margin: 10px auto;
  border-bottom: 1px solid black;
`;

export const EduBox = styled.div`
  width: 100%;
  padding: 15px;

  & > div > h3,
  & > div > h4,
  & > div > h5 {
    text-align: left;
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
  border: 1px solid grey;
  margin: 10px auto;
  padding: 10px;
`

export const EditPostIconContainer = styled.div`
    background-color: white;
    border: 1px solid black;
    position: relative;
    top: 5px;
    margin-left: auto;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    z-index: 2;

`
