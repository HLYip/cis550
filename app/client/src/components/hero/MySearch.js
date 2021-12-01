import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import tw from "twin.macro";
import styled from "styled-components";

import { DefaultHeader } from "components/headers/MyHeader";
import { getSearchResults } from "fetcher.js";

const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
  background-image: url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80");
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-50`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col items-center mt-40`;

const Heading = tw.h1`text-gray-100 text-center font-black text-3xl md:text-5xl leading-snug max-w-3xl`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0 mt-10 flex`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

export default ({
  heading = "Find Meals Near You!",
  page = 1,
  pagesize = 16,
  category = ''
}) => {
  const [input, setInput] = useState('')
  const [results, setResults] = useState([])
  // capture text input
  const updateCity = (e) => {
    setInput(e.target.value)
  }
  // handle button-click event
  const searchCity = async () => {
    const searchResults = await getSearchResults(input, category, page, pagesize)
    if (searchResults.status === 200) {
      setResults(searchResults.result.results)
    } else {
      alert("error")
    }
  }

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <DefaultHeader />
        <Content>
          <Heading>{heading}</Heading>
          <Actions>
            <input type="text" placeholder="Your city" onChange={updateCity}/>
            <button onClick={searchCity}>Search</button>
          </Actions>
          {results.length > 0 &&
            <Redirect to={{
              pathname: '/search',
              state: { results: results }
            }}/>
          }
        </Content>
      </HeroContainer>
    </Container>
  );
};
