import React from "react";
import tw from "twin.macro";

const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

export default (props) => {
  const rlat = props.rlat
  const rlong = props.rlong
  const rname = props.rname.replace("&","and")
  const raddress = props.raddress
  const map = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCNXhRjNrie_08eXevDLR9UCPtcCGc0O90&q=${rname} ${raddress}&center=${rlat},${rlong}&zoom=18`
  return (
    <Container>
      <SingleColumn>
        <iframe title="map"width= "1300" height="500" src={map} />
      </SingleColumn>
    </Container>
  );
};
