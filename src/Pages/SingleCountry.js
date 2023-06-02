import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Center,
  GridItem,
  Image,
  Progress,
  SimpleGrid,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Nav from "../Components/Navlink";




function SingleCountry() {
  let { countryname } = useParams();
  const [data, setData] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${countryname}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log("Error:", err.message));
  }, [countryname]);
  return (
    <div>
      <Nav />

      <Box onClick={() => navigate(-1)} p={'10'}  >
        <Button size="lg" variant="solid" mr="3">
          Back
        </Button>
      </Box>

      {data === undefined || data === null ? (
        <Progress colorScheme="pink" size="xs" isIndeterminate />
      ) : (
        data?.map((x) => {
          return (
            <Center key={x?.name?.common} >
              <SimpleGrid
                columns={[1, null, 2]}
                spacing={100}
                pt="10"
                pr="50"
                pl="50"
              >
                <GridItem w="100%">
                  <Image src={x?.flags?.svg} alt={x?.Region} height="300" />
                </GridItem>
                <GridItem w="100%">
                  <Box
                  fontSize={30}
                    mt="0"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    noOfLines={1}
                  >
                    {x?.name?.common}
                    
                  </Box>
                  
                  <SimpleGrid spacing={2} fontSize={15}>
                    <Box mt={6}>Native Name: {x?.name?.common}</Box>
                    <Box>Cca2: {x?.cca2[0]}</Box>
                    <Box>Cca2: {x?.cca3}</Box>
                    <Box>Alternative Country Name: {x?.altSpellings}</Box>
                    <Box>Country Calling Codes: {x.idd.root}{x.idd.suffixes}</Box>
                  </SimpleGrid>
                </GridItem>
              </SimpleGrid>
            </Center>
          );
        })
      )}
    </div>
  );
}

export default SingleCountry;