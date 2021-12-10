import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DarkHeader from "components/headers/MyDarkHeader"
import Footer from "components/footers/MyMiniCenteredFooter";
import Stats from "components/features/MyRestStats"
import Map from "components/features/MyRestMaps"

const Container = styled.div`
  ${tw`relative -mt-8`}
`;

export default function RestDetails() {
  const { state }  = useLocation();
  if ( state == null ) {
    return (
      <Redirect to={{
        pathname: '/',
      }}/>
    )
  }
  return (
    <AnimationRevealPage>
      <Container>
        <DarkHeader />
      </Container>
      <Stats restaurant={state}/>
      <Map rlat={state.r_lat} rlong={state.r_long}/>
      <Footer />
    </AnimationRevealPage>
  );
}
