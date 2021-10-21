import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();
  return (
    <Container>
      <Navbar>
        <a href="/home" exact>
          <img src="/Images/login-icon.png" alt="" />
        </a>
        <div>
          <Join onClick={() => history.push("/signup1")}>Join now</Join>
          <Signin onClick={() => history.push("/signin")}>Sign in</Signin>
        </div>
      </Navbar>
      <Section>
        <Text>
          <h1>Welcome to your professional community</h1>
        </Text>
        <FrontImage>
          <img src="/Images/loginimage.svg" alt="" />
        </FrontImage>
      </Section>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 24px;
  overflow-x: hidden;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const Navbar = styled.nav`
  max-width: 1128px;
  padding: 12px 0 16px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: auto;
  & > a {
    height: 34px;
  }
  & > a > img {
    height: 34px;
  }
`;

const Join = styled.a`
  color: #7e7e7e;
  font-size: 16px;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #a09f9f;
    color: #000000;
    border-radius: 0.5rem;
  }
`;

const Signin = styled.a`
  color: #00687a;
  border: 1px solid #00687a;
  font-size: 16px;
  align-items: center;
  padding: 5px 12px;
  border-radius: 1rem;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #c4e5f8;
  }
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  align-content: center;
  align-items: center;
  margin: auto;
  padding-top: 30px;
  vertical-align: baseline;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  color: #793d3d;
  font-size: 40px;
  width: 40%;
  margin: auto;
  text-align: left;
  padding: 0 20px 20px;

  & > h1 {
    font-weight: 200;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 30px;
  }
`;

const FrontImage = styled.div`
  margin: auto;
  width: 700px;

  & > img {
    width: 700px;
  }

  @media (max-width: 1216px) and (min-width: 769px) {
    width: 600px;
    & > img {
      width: 600px;
    }
  }

  @media (max-width: 768px) {
    & > img {
      width: 400px;
    }
  }
`;

export default HomePage;
