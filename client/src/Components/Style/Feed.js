import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1128px;
  display: grid;
  grid-template-columns: 2fr 6fr 3fr;
  grid-template-rows: auto;
  grid-template-areas: "profile main connect";
  grid-gap: 2rem;
  box-sizing: border-box;
  margin: 80px auto;
  padding: 0 5px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr;
    grid-template-areas: "profile main";
    grid-gap: 1rem;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: 0.2fr auto;
    grid-template-areas: "profile" "main ";
    grid-gap: 0;
  }
`;

export const LeftCont = styled.div`
  width: 100%;
  grid-area: "profile";
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: white;
  border: 1px solid lightgray;
`;

export const MainCont = styled.div`
  width: 100%;
  grid-area: "main";
`;

export const RightCont = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  grid-area: "connect";
  border-radius: 10px;
  background-color: white;
  height: fit-content;
  padding: 20px 5px;
  border: 1px solid lightgray;

  & > h3 {
    text-align: left;
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: auto;
  padding: 15px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  margin-bottom: 10px;

  & > img {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover;
  }

  & > button {
    width: calc(100% - 80px);
    height: 70px;
    border-radius: 35px;
    text-align: left;
    padding-left: 15px;
    font-size: 16px;
    margin: auto;
    border: 1px solid gray;
    background-color: white;

    &:hover {
      background-color: lightgray;
    }
  }
`;

export const PostCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: white;
  border: 1px solid lightgray;
`;
export const CardTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;

  & > img {
    height: 45px;
    width: 45px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
  }

  & > div > h3,
  & > div > h5 {
    text-align: left;
  }
`;
export const CardTitle = styled.div`
  width: 100%;
  padding: 10px 20px;

  & > h3 {
    text-align: left;
  }
`;
export const CardPhoto = styled.img`
  width: 100%;
  object-fit: cover;
`;
export const CardLikes = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 10px;
  border-top: 1px solid lightgray;

  & > button {
    cursor: pointer;
    padding-right: 15px;
    background-color: white;
    border: none;
  }
`;
export const CardActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid lightgray;

  & > button {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: white;
    border: none;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    color: #383838;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    &:hover {
      background-color: lightgray;
      color: black;
    }
  }
`;

export const CommentContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  & > form > input {
    width: calc(100% - 70px);
    height: 40px;
    border-radius: 20px;
    border: 1px solid lightgray;
    padding: 5px 15px;
    outline: none;
  }

  & > form {
    width: 100%;
  }

  & > form > button {
    width: 60px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid lightgray;
    padding: 5px 15px;
  }
`;

export const Comments = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid lightgray;
`;
export const EditPostIconContainer = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  position: relative;
  top: 5px;
  margin-left: auto;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;
