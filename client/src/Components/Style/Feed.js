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
  box-shadow: 2px 2px 2px 1px gray;
`;

export const MainCont = styled.div`
  width: 100%;
  border: 1px solid black;
  grid-area: "main";
  border-radius: 10px;
  background-color: white;
  box-shadow: 2px 2px 2px 1px gray;
`;

export const RightCont = styled.div`
  width: 100%;
  border: 1px solid black;
  grid-area: "connect";
  border-radius: 10px;
  background-color: white;
  height: fit-content;
  padding: 20px 5px;
  box-shadow: 2px 2px 2px 1px gray;


  @media (max-width: 768px) {
    display: none;
  }
`;

export const Profile = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: -50px auto 50px;
  box-sizing: border-box;
`;
export const Cover = styled.img`
  height: 100px;
  width: 100%;
  box-sizing: border-box;
`;
export const Desc = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  position: relative;
  top: -50px;
`;

export const InputBox = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: auto;
  margin-top: 20px;
  border-radius: 35px;
  padding: 5px;

  & > img {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
  }

  & > button {
    width: calc(100% - 80px);
    height: 70px;
    border-radius: 35px;
    text-align: left;
    padding-left: 15px;
    font-size: 16px;
    margin: auto;
    border: 1px solid black;
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
  margin: 10px 0;
  border: 1px solid black;
  border-radius: 10px;
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
  }
`;
export const CardTitle = styled.div`
  width: 100%;
  padding: 10px 20px;
  &>h3{
    text-align: left;
  }
`;
export const CardPhoto = styled.img`
  width: 100%;
`;
export const CardLikes = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  border-bottom: 1px solid grey;

  &>h4{
    cursor: pointer;
  }
`;
export const CardActions = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const CommentContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  &>form>input{
    width: calc(100% - 70px);
    height: 40px;
    border-radius: 20px;
    border : 1px solid black;
    padding: 5px 15px;
    outline: none;
   
  }

  &>form{
    width: 100%;
  }

  &>form>button{
    width: 60px;
    height: 40px;
    border-radius: 20px;
    border : 1px solid black;
    padding: 5px 15px;
   
  }
`

export const Comments = styled.div`
width: 100%;
  height: 100px;
  border: 1px solid black;
`