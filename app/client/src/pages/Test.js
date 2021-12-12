import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import DarkHeader from "components/headers/MyDarkHeader"
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MyMiniCenteredFooter";
import Fblogin from "components/login/Fblogin";
import Login from "components/login/login"

const Container = styled.div`
  ${tw`relative -mt-8`}
`;

export default function Test() {
  return (
    <AnimationRevealPage>
      <Container>
        <DarkHeader />
      </Container>
      <Fblogin />
      <Login />
      <Footer />
    </AnimationRevealPage>
  );
}