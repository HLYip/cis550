import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 lg:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-8 md:mt-0`,
  props.textOnLeft ? tw`md:mr-8 lg:mr-16 md:order-first` : tw`md:ml-8 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-cover bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8`;

const Heading = tw(SectionHeading)`text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.div`text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-4`

const Statistics = tw.div`flex flex-wrap`
const Statistic = tw.div`text-lg sm:text-2xl lg:text-3xl w-1/2 mt-4 lg:mt-10 text-center md:text-left`
const Value = tw.div`font-bold text-primary-500`
const Key = tw.div`font-medium text-gray-700`
const PrimaryButton = styled(PrimaryButtonBase)(props => [
  tw`text-sm inline-block mr-2 mt-2`,
  props.buttonRounded && tw`rounded-full`
]);

export default ({textOnLeft = false, restaurant}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  //Change the statistics variable as you like, add or delete objects
  let hours = {}

  // parse hours from string into objects
  if (restaurant && restaurant.hours) {
    let h = restaurant.hours
    h = h.replaceAll("{", "").replaceAll("'", "").replaceAll("}", "")
    const array = h.split(", ")
    array.map(day => {
      const dayArray = day.split(": ")
      hours[dayArray[0]] = dayArray[1]
    })
  }

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading>{restaurant.name}</Heading>
            <div tw="flex mt-5 items-end">
              {/* TODO: Like button put here, remove this line below */}
              <button>Like</button>
            </div>
            <div tw="mt-5 mb-5">
            {Object.keys(restaurant).map((key, index) => {
              if (restaurant[key]===1){
                return (
                  <PrimaryButton>
                    {key.replace("_"," ")}
                  </PrimaryButton>
                )
              }
            })}
            </div>
            <Description>
              <p tw="font-bold mb-3">Opening hours:</p>
              {Object.keys(hours).map((day, index) => (
                <div key={index}>   
                  {day}: {hours[day]}
                  <br/>
                </div>
              ))}
            </Description>
            <Statistics>
              <Statistic key={0}>
                <Value>{restaurant.stars}</Value>
                <Key>Stars</Key>
              </Statistic>
              <Statistic key={1}>
                <Value>{restaurant.review_count}</Value>
                <Key>Reviews</Key>
              </Statistic>
              <Statistic key={2}>
                <Value>{restaurant.average_pos_rate}%</Value>
                <Key>Positivity Rate</Key>
              </Statistic>
              <Statistic key={3}>
                <Value>{restaurant.average_vacc_pct}%</Value>
                <Key>Vaccination Rate</Key>
              </Statistic>
            </Statistics>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
