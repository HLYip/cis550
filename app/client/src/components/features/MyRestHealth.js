import React, { useState, useEffect } from "react";
import { withGlobalState } from 'react-globally'
import tw from "twin.macro";
import styled from "styled-components";
import CountyChart from "components/charts/CountyCharts";
import { getCountyCovid } from "fetcher";


const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-8 md:mt-0`,
  props.textOnLeft ? tw`md:mr-8 lg:mr-16 md:order-first` : tw`md:ml-8 lg:ml-16 md:order-last`
]);

function TwoColumnsCharts({
  county
}) {
  const [covid, setCovid] = useState([])
  const [vacc, setVacc] = useState([])

  useEffect(() => {
    console.log(county)
    getCountyCovid(county).then(countyResult => {
      if (countyResult.status === 200) {
        console.log(countyResult)
        const res = countyResult.result.results
        const covidData = []
        const posData = []
        console.log(res.length)
        for (var i = 0; i < res.length; i++) {
          covidData.push({
            x: new Date(res[i]._id),
            y: res[i].pos_pct
          });
          posData.push({
            x: new Date(res[i]._id),
            y: res[i].vacc_pct
          });
        }
        setCovid(covidData)
        setVacc(posData)
      } else {
        alert('Error. Please contact developers')
      }
    })
    },[county])




  return (
    <Container>
      <TwoColumn>
        <TextColumn>
          <CountyChart dataPoints={covid} title="Positivity Rate Per Day" yAxis="Positivity Rate (%)"/>
        </TextColumn>
        <TextColumn>
          <CountyChart dataPoints={vacc} title="Vaccination Rate Per Day" yAxis="Vaccination Rate (%)"/>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};

export default TwoColumnsCharts
