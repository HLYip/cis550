import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import DarkHeader from "components/headers/MyDarkHeader"
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MyMiniCenteredFooter";
import MyTwoColWithSteps from "components/features/MyTwoColWithSteps";
import MySingleCol from "components/faqs/MySingleCol";

const Container = styled.div`
  ${tw`relative -mt-8`}
`;

export default function About() {
  return (
    <AnimationRevealPage>
      <Container>
        <DarkHeader />
      </Container>
      <MyTwoColWithSteps />
      <MySingleCol />
      <Footer />
    </AnimationRevealPage>
  );
}

