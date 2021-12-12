import { React, useState } from "react";
import { Redirect } from 'react-router-dom'
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings";
import {SectionDescription} from "components/misc/Typography";

import { getTodayRecommendation } from "fetcher";

const HeadingContainer = tw.div``
const Heading = tw(SectionHeading)``
const Description = tw(SectionDescription)`mx-auto text-center`

const Cards = tw.div`flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto`
const Card = tw.div`mt-24 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center`
const CardImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`w-64 h-64 bg-cover bg-center rounded`}
`
const CardContent = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-primary-500`}
  }
  .name {
    ${tw`mt-1 text-xl font-medium text-gray-900 group-hover:text-primary-500`}
  9
`

export default ({
  heading = "Explore other experiences",
  description = "Please check out the least covid-affected and highly-rated places in the categories other than restaurants",
  cards = [
    {
      imageSrc: "https://travel.mqcdn.com/mapquest/travel/wp-content/uploads/2020/10/Istanbul-Cevahir-e1629224337449.jpg",
      name: "Shopping",
    },
    {
      imageSrc: "https://media.istockphoto.com/photos/woman-in-mask-on-face-in-spa-salon-picture-id902901426?k=20&m=902901426&s=612x612&w=0&h=Gl7_91e1E02FhTRcHrIk4d1OO4fuQ95uB-T3V8M_LN4=",
      name: "Beauty & Spas",
    },
    {
      imageSrc: "https://icons.iconarchive.com/icons/graphicloads/medical-health/icons-390.jpg",
      name: "Health & Medical",
    },
    {
      imageSrc: "https://media.timeout.com/images/105516048/image.jpg",
      name: "Nightlife",
    },
    {
      imageSrc: "https://images.squarespace-cdn.com/content/v1/58e27a876b8f5b410f74975f/1493418830193-0TGD59HAOYQAH49D99BZ/Front-Right-compressed.png?format=2500w",
      name: "Hair Salons",
    },
    {
      imageSrc: "https://www.antelopevalley.com/images/pages/72.jpg",
      name: "Arts & Entertainment",
    },
    {
      imageSrc: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_23/1576906/nail-salons-covid-safety-kb-main-200605-v3.jpg",
      name: "Nail Salons",
    },
    {
      imageSrc: "https://assets.website-files.com/5b56431ad788d5ef2e26d388/5f590e8dad2b9f6a8e43e3b7_IT%20services%20.jpg",
      name: "Professional Services",
    },
    {
      imageSrc: "https://images.squarespace-cdn.com/content/v1/56e487181d07c0743d227289/1565536556540-2PWW0HWU07FFFQ5P6UIO/gym-masthead.jpg?format=1000w",
      name: "Gyms",
    },
  ]
}) => {
  const [results, setResults] = useState([])
  const [path, setPath] = useState('')

  const explore = (category) => {
    getTodayRecommendation(category.replace("&", "%26"), 16).then(recResult => {
      if (recResult.status === 200) {
        setPath(category)
        setResults(recResult.result.results)
      } else {
        alert('Error. Please contact developers')
      }
    })
  }
  
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {heading && <Heading>{heading}</Heading> }
          {description && <Description>{description}</Description> }
        </HeadingContainer>
        <Cards>
          {cards.map((card, index) => (
            <Card key={index} className="group" initial="rest" whileHover="hover" animate="rest">
              <CardImage imageSrc={card.imageSrc} onClick={()=>explore(card.name)}/>
              <CardContent>
                <span className="name" onClick={()=>explore(card.name)}>{card.name}</span>
              </CardContent>
            </Card>
          ))}
        </Cards>
        {results.length > 0 &&
          <Redirect to={{
            pathname:  `/explore/${path}`,
            state: { results: results, category: path }
          }}/>
        }
      </ContentWithPaddingXl>
    </Container>
  );
};
