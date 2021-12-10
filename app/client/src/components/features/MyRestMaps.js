import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import GoogleMapReact from 'google-map-react';

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default (props) => {
  const rlat = props.rlat
  const rlong = props.rlong
  const rname = props.rname
  const raddress = props.raddress
  console.log(rlong)
  console.log(rlat)
  const map = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCNXhRjNrie_08eXevDLR9UCPtcCGc0O90&q=${rname} ${raddress}&center=${rlat},${rlong}&zoom=18`
  return (
    <Container>
      <SingleColumn>
        {/* TODO: insert map here */}
        <iframe width= "1300" height="500" src={map}>
        
      </iframe>  
      </SingleColumn>
    </Container>
  );
};
