import React from "react";
import { withGlobalState } from 'react-globally'
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/MySearch.js";
import TabGrid from "components/cards/MyTabCardGrid.js";
import Footer from "components/footers/MyMiniCenteredFooter";

function HomePage(props) {
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`;
  return (
    <AnimationRevealPage>
      <Hero
        heading={<>Find Delicious & Healthy <br /> <HighlightedText>Meals Near You.</HighlightedText></>}
        authenticated={props.globalState.authenticated}
        username={props.globalState.username}
        userid={props.globalState.userid}
      />
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        heading={
          <>
            Today's <HighlightedText>Recommendation</HighlightedText>
          </>
        }
      />
      <Footer />
    </AnimationRevealPage>
  );
}

export default withGlobalState(HomePage)
