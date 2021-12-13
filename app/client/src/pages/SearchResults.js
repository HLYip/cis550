import React from "react";
import { useLocation } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DarkHeader from "components/headers/MyDarkHeader"
import TabGrid from "components/cards/MySearchTabCardGrid.js";
import Footer from "components/footers/MyMiniCenteredFooter";

const Container = styled.div`
  ${tw`relative -mt-8`}
`;

export default function SearchResults() {
  const { state }  = useLocation();
  return (
    <AnimationRevealPage>
      <Container>
        <DarkHeader />
      </Container>
        <TabGrid results={state.results} finput={state.input} noResult={state.noResult}/>
      <Footer />
    </AnimationRevealPage>
  );
}
