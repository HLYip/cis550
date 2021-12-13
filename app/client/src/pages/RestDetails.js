import React from "react";
import { Redirect, useLocation } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";

import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DarkHeader from "components/headers/MyDarkHeader"
import Footer from "components/footers/MyMiniCenteredFooter";
import Stats from "components/features/MyRestStats"
import Map from "components/features/MyRestMaps"
import MyRestHealth from "components/features/MyRestHealth"

const Container = styled.div`
  ${tw`relative -mt-8`}
`;
const Heading = tw.h2`ml-20 text-4xl sm:text-5xl font-black tracking-wide text-left`

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
      <Heading>Covid Statistics</Heading>
      <MyRestHealth county={state.county}/>
      <Heading>Find Direction</Heading>
      <Map rlat={state.r_lat} rlong={state.r_long} rname={state.name} raddress={state.address}/>
      <Footer />
    </AnimationRevealPage>
  );
}
