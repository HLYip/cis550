import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container } from "components/misc/Layouts.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import { getSearchResults, getRestInfo } from "fetcher.js";

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const TabContent = tw(motion.div)`flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mb-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const Actions = styled.div`
  ${tw`relative text-center mt-10 mb-10 flex leading-none`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-3 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-400 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const ContentWithPaddingXl= tw.div`max-w-screen-xl mx-auto`;

export default ({
  results = Array(16).fill(
    {
      business_id: "rQXzCp-vsVpsPWFZX6Ua9w",
      name: "Veg Mixer",
      address: "300 39th St",
      stars: "5.0",
      review_count: "87",
      city: "Pittsburgh",
      state: "PA"
    }
  ),
  page=1,
  pagesize=16
}) => {
  /*
   * To customize the tabs, pass in data using the `tabs` prop. It should be an object which contains the name of the tab
   * as the key and value of the key will be its content (as an array of objects).
   * To see what attributes are configurable of each object inside this array see the example above for "Starters".
   */
  const [input, setInput] = useState('')
  const [results2, setResults] = useState([])
  const [rest, setRest] = useState(0)
  // capture text input
  const updateCity = (e) => {
      setInput(e.target.value)
  }
  // handle button-click event
  const searchCity = async () => {
    const searchResults = await getSearchResults(input, "", page, pagesize)
    if (searchResults.status === 200) {
      setResults(searchResults.result.results)
      setInput('')
    } else {
      alert("error")
    }
  }

  const checkDetails = async (id) => {
    console.log(id)
    const restResults = await getRestInfo(id)
    if (restResults.status === 200) {
      setRest(restResults.result.results[0])
    } else {
      alert("Error, please contact developers")
    }
  }

  return (
    <Container>
      <ContentWithPaddingXl>  
        <HeaderRow>
          <Actions>
            <input type="text" placeholder="Your city" value={input} onChange={updateCity}/>
            <button onClick={searchCity}>Search</button>
          </Actions>
        </HeaderRow>
        <TabContent>
        {results.map((card, index) => (
          <CardContainer key={index}>
            <Card className="group" initial="rest" whileHover="hover" animate="rest">
              <CardImageContainer imageSrc={getRandomImages()}>
                <CardRatingContainer>
                  <CardRating>
                    <StarIcon />
                    {card.stars}
                  </CardRating>
                  <CardReview>({card.review_count})</CardReview>
                </CardRatingContainer>
                <CardHoverOverlay
                  variants={{
                    hover: {
                      opacity: 1,
                      height: "auto"
                    },
                    rest: {
                      opacity: 0,
                      height: 0
                    }
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <CardButton onClick={()=>checkDetails(card.business_id)}>More Details</CardButton>
                </CardHoverOverlay>
              </CardImageContainer>
              <CardText>
                <CardTitle>{card.name}</CardTitle>
                <CardContent>{card.address}, {card.city}, {card.state}</CardContent>
                {/* <CardPrice>should be a number</CardPrice> */}
                {rest !== 0 &&
                  <Redirect to={{
                    pathname: '/restaurant',
                    state: rest
                  }}/>
                }
              </CardText>
            </Card>
          </CardContainer>
        ))}
        </TabContent>
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
      {results2.length > 0 &&
        <Redirect to={{
          pathname: '/search',
          state: { results: results2 }
        }}/>
      }
    </Container>
  );
};

/* This function is only there for demo purposes. It populates placeholder cards */
const getRandomImages = () => {
  const images = [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1582254465498-6bc70419b607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1565310022184-f23a884f29da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327??ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1473093226795-af9932fe5856?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80",
  ];
  // Shuffle array
  return images[Math.floor(Math.random()*images.length)];
};
