import React from "react";
import { useLocation } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DarkHeader from "components/headers/MyDarkHeader"
import MyExploreTabCardGrid from "components/cards/MyExploreTabCardGrid";
import Footer from "components/footers/MyMiniCenteredFooter";

const Container = styled.div`
  ${tw`relative -mt-8`}
`;

export default function ExploreResult() {
  const { state }  = useLocation();
  return (
    <AnimationRevealPage>
      <Container>
        <DarkHeader />
      </Container>
      <MyExploreTabCardGrid results={state.results} category={state.category} />
      <Footer />
    </AnimationRevealPage>
  );
  
}
