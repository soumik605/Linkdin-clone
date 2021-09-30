import styled from "styled-components";

export const Container = styled.div`
  width: 95%;
  background-color: white;
  padding: 10px;
  margin: 60px auto;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 1px gray;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  margin: auto;
`;
export const Header = styled.header`
  display: flex;
  flex-direction: column;
`;
export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.div`
  margin: auto;
  height: 34px;
  padding: 16px;
  width: auto;
  & > a > img {
    height: 34px;
  }
`;
export const Heading = styled.div`
  margin: auto;
  width: 100%;

  & > h1 {
    font-size: 30px;
    font-weight: 400;
    padding: 12px 0;
  }
`;

export const Input = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 0 12px;

  & > h1 {
    text-align: left;
    font-size: 16px;
    font-weight: 200;
    padding: 10px 0;
  }

  & > input {
    height: 30px;
    border-radius: 5px;
    border: 1px solid black;
    padding: 2px 10px;
  }
`;

export const Agree = styled.div`
  & > p {
    font-size: 12px;
    margin: auto;
    font-weight: 400;
  }
`;

export const Join = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  color: white;
  background-color: #0066ff;
  margin: 15px 0;
  font-size: 16px;
  border: 1px solid #0066ff;

  &:hover {
    background-color: #0045ac;
  }
`;
export const GoogleJoin = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 20px;
  margin: 15px 0;
  font-size: 16px;
  border: 1px solid #0066ff;
  color: #0253cc;
  background-color: white;

  &:hover {
    background-color: #c0d5f3;
  }
`;

export const SigninLink = styled.div`
  padding: 10px 16px;
  margin: auto;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 280px;
  box-sizing: border-box;
  background-color: grey;
  border-radius: 5px;
  @media (max-width: 768px){
    height: 220px;
    }
`;

export const ProfileContainer = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid white;
  position: relative;
  top: -75px;
  z-index: 2;

  @media (max-width: 768px){
    width: 120px;
    height: 120px;
    top: -60px;
  }
`;

export const CoverContainer = styled.img`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  border: 1px solid black;
  box-sizing: border-box;

  @media (max-width: 768px){
    height: 150px;
    }
`;
