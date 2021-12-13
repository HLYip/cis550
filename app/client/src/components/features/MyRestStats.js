import React, { useState, useEffect } from "react";
import { withGlobalState } from 'react-globally'
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postAddLike, deleteRemoveLike, getIsLike } from "fetcher";
import images from "helpers/food_images";


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

function Stats(props) {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  //Change the statistics variable as you like, add or delete objects
  let hours = {}
  const [liked, setliked] = useState(false)
  const { restaurant } = props
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

  let image = images.food_images[0]
  if (restaurant) {
    if (restaurant.image) {
      image = restaurant.image
    } else {
      image = images.food_images[restaurant.photo%images.food_images.length]
    }
  }

  console.log(image)
  const user_id = window.localStorage.getItem('userId');

  useEffect(() => {
    if (user_id) {
    getIsLike(user_id, restaurant.business_id).then(likeResult => {
      if (likeResult.status === 200) {
        console.log(typeof(likeResult.result.results))
        setliked(likeResult.result.results)
      } else {
        alert('Error. Please contact developers')
      }
    })
  }
  }, [user_id])

  const toggle = async () => {
    if (!liked) {
      const likeResults = await postAddLike(restaurant.business_id, user_id)
      if (likeResults.status === 200) {
        setliked(!liked)
      } else {
        alert("error")
      }
    } else {
      const likeResults = await deleteRemoveLike(restaurant.business_id, user_id)
      if (likeResults.status === 200) {
        setliked(!liked)
      } else {
        alert("error")
      }
    }
  };


  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={image} />
        </ImageColumn>
        <TextColumn>
          <TextContent>
            <Heading>{restaurant.name}</Heading>
            {user_id && <div tw="flex mt-5">
              <center>
                <div onClick={() => toggle()}>
                  {(liked === false ) ? (
                    <div tw="flex items-center" style={{border: "2px solid #718096", padding: "8px", borderRadius: "5px"}}>
                      <p tw="mr-2 text-gray-600 text-xl font-semibold">Like</p>
                      <FontAwesomeIcon icon={faHeartBroken} size='2x' tw="text-gray-600" />
                    </div>
                  ) : (
                    <div tw="flex items-center" style={{border: "2px solid red", padding: "8px", borderRadius: "5px"}}>
                      <p tw="mr-2 text-red-600 text-xl font-semibold">Like</p>
                      <FontAwesomeIcon icon={faHeart} size='2x' style={{color:"red"}}/>
                    </div>
                  )}
                </div>
              </center>
            </div>}
            <div tw="mt-5 mb-5">
            {Object.keys(restaurant).map((key, index) => {
              if (restaurant[key]===1){
                return (
                  <PrimaryButton key={index}>
                    {key.replace("_"," ")}
                  </PrimaryButton>
                )
              }
            })}
            </div>
            <Description>
              {restaurant.hours && <p tw="font-bold mb-3">Opening hours:</p>}
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

export default withGlobalState(Stats)
