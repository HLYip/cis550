import React from "react";
import { withGlobalState } from 'react-globally'
import tw from "twin.macro";
import styled from "styled-components";
import DarkHeader from "components/headers/MyDarkHeader"
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Footer from "components/footers/MyMiniCenteredFooter";
import MyStateInfo from "components/features/MyStateInfo";

const Container = styled.div`
  ${tw`relative -mt-8`}
`;

export default function Health(props) {
  return (
    <AnimationRevealPage>
      <Container>
        <DarkHeader />
      </Container>
      <MyStateInfo />
      <Footer />
    </AnimationRevealPage>
  );
}

