import React from "react";
import { useLocation } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DarkHeader from "components/headers/MyDarkHeader"
import Footer from "components/footers/MyMiniCenteredFooter";
import Stats from "components/features/MyRestStats"

const Container = styled.div`
  ${tw`relative -mt-8`}
`;

export default function RestDetails() {
  const { state }  = useLocation();
  console.log(state)
  return (
    <AnimationRevealPage>
      <Container>
        <DarkHeader />
      </Container>
      <Stats restaurant={state}/>
      <Footer />
    </AnimationRevealPage>
  );
  
}

