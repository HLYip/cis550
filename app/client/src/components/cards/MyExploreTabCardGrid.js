import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import HealthIcon from "components/misc/HealthIcon";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw.h2`text-4xl sm:text-5xl font-black tracking-wide text-center`;
const HeadingDescription = tw.p`text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 mt-5`;
const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;

const CardRating2 = styled.div`
  ${tw`mt-3 mr-1 text-lg font-bold flex items-end`}
  svg {
    ${tw`w-8 h-8 fill-current text-orange-400 mr-2`}
  }
`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600 min-h-10`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({
  results = Array(9).fill(
    {
      business_id: "rQXzCp-vsVpsPWFZX6Ua9w",
      restaurant: "Veg Mixer",
      address: "300 39th St",
      stars: "5.0",
      review_count: "87",
      city: "Pittsburgh",
      state: "PA",
      trans_level: "moderate"
    }
  ),
  category = "Shopping"
}) => {
  const trans = {"low": 5, "moderate": 4, "substantial": 3, "high": 1}
  const trans_color = {"low": "#00A300", "moderate": "#21B6A8", "substantial": "#FCD12A", "high": "#DC1C13"}

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{category}</Header>
        </HeaderRow>
        <HeadingDescription>
            Here are today's 5-star {category.toLowerCase()} places, the locations of which are less affected by coronavirus.
            Enjoy and stay healthy!
          </HeadingDescription>
          <TabContent>
            {results.map((card, index) => (
              <CardContainer key={index}>
                <Card className="group" initial="rest" whileHover="hover" animate="rest">
                  <CardText>
                    <CardTitle>{card.restaurant}</CardTitle>
                    <CardContent>{card.address}, {card.city}, {card.state}</CardContent>
                    <CardRating2>
                      <HealthIcon color={trans_color[card.trans_level]}/>
                      {trans[card.trans_level]} ({card.trans_level})
                    </CardRating2>
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
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
