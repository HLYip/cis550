import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;


export default (props) => {
  const rlat = props.rlat
  const rlong = props.rlong
  console.log(rlong)
  console.log(rlat)
  return (
    <Container>
      <SingleColumn>
        {/* TODO: insert map here */}
      </SingleColumn>
    </Container>
  );
};
