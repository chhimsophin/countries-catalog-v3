// Importing 
import React from "react";
import { useState, useEffect } from "react";
import {
  Flex,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import { Box} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Nav from "../Components/Navlink";

function Home() {

  //States
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectInput, setSelectInput] = useState("all");
  let navigate = useNavigate();


//Calling Apis
  useEffect(() => {
    if (selectInput === "all") {
      fetch(`https://restcountries.com/v3.1/all`)
        .then((res) => res.json())
        .then((data) => {
          return (
            setData(data),
            setData2(data))
        })
        .catch((err) => console.log("Error:", err.message));
    } else {
      fetch(`https://restcountries.com/v3.1/region/${selectInput}`)
        .then((res) => res.json()).then((data)=>{
          return (
            setData(data), 
            setData2(data)
          )
        })
        .catch((err) => console.log("Error:", err.message));
    }
  }, [selectInput]);


  //Handle Region select
  const handleChangeSelect = (e) => {
    setSelectInput(e.target.value);
  };

  //Handle Country Search
  const handleChangeInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setData(
      data2.filter((x) =>
        x?.name?.common
          ?.toLowerCase()
          ?.includes(e?.target?.value?.toLowerCase())
      )
    );
  };

  return (
    <div>
      {/* Navbar */}
      <Nav/>
{/* 
    Country Search and Region Select form */}
      <form>
        <Flex pr="50" pl="50" flexWrap={"wrap"}>
          <Box p="4">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                value={searchInput}
                onChange={handleChangeInput}
                type="text"
                placeholder="Search for a country "
              />
            </InputGroup>
          </Box>
          <Spacer />
          <Box p="4">
            <Select onChange={handleChangeSelect} placeholder="Select option">
              <option value="all">All</option>
              <option value="africa">Africa</option>
              <option value="americas">Americas</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </Select>
          </Box>
        </Flex>
      </form>

      {/* Data Rendering */}

      {data2?.length === 0 ? (
        <Progress colorScheme="pink" size="xs" isIndeterminate />
      ) : (
        <Box w="100%">
          <SimpleGrid
            columns={[1, null, 7]}
            spacing={10}
            pt="10"
            pr="50"
            pl="50"
          >
            {data?.map((x, index) => (
              <GridItem
                key={index}
                onClick={() =>
                  navigate(`/singlecountry/${x?.cca2?.toLowerCase()}`, {})
                }
              >
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  
                >
                  <Image
                    src={x?.flags?.svg}
                    alt={x?.name?.common}
                    height="100px"
                    width="100%"
                  />
                  <Box p="2">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      noOfLines={1}
                    >
                      {x?.name?.official}
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </div>
  );
}

export default Home;