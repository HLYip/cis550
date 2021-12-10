import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DarkHeader from "components/headers/MyDarkHeader"
import MyExploreSelection from "components/cards/MyExploreSelection";
import Footer from "components/footers/MyMiniCenteredFooter";

const Container = styled.div`
  ${tw`relative -mt-8`}
`;

export default function Explore() {
  return (
    <AnimationRevealPage>
      <Container>
        <DarkHeader />
      </Container>
      <MyExploreSelection />
      <Footer />
    </AnimationRevealPage>
  );
  
}
