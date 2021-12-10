import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import DarkHeader from "components/headers/MyDarkHeader"
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MyMiniCenteredFooter";
import MyThreeColSlider from "components/cards/MyThreeColSlider";

const Container = styled.div`
  ${tw`relative -mt-8`}
`;

export default function Collections() {
  return (
    <AnimationRevealPage>
      <Container>
        <DarkHeader />
      </Container>
      <MyThreeColSlider />
      <Footer />
    </AnimationRevealPage>
  );
}

