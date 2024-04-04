import React from 'react';
import { useState, useEffect } from 'react'
import {  
    Input,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Card,
    Button,
    Select,
    LinkBox,
    LinkOverlay,
  Image,
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Stack,
  Skeleton,
  Code,
  Grid,
  GridItem,
  theme,
  Wrap,
  WrapItem,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex,
  CircularProgress
} from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Search() {

    const [searchResult, setSearchResult] = useState([])
    const [skeletonLoaded, setSkeletonLoaded] = useState(false)
    const [formData, setFormData] = useState({})
    const [searching, setSearching] = useState(false)

    var resultComponents

    function handleChange(e){
        setFormData(prevFormData => ({
            ...prevFormData,
            [e.target.name]: e.target.value
        }))
    }

    function handleSearch(){
        setSearching(true)
        setSkeletonLoaded(false)
        fetch("http://localhost:3100/api/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query: formData.query
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setSearchResult(res)
                setTimeout(() => setSkeletonLoaded(true), 1000)
                setSearching(false)
            })
    }

    console.log(searchResult.length)
    if(searchResult.length == 0 && searching == true){
        console.log("hi")
        resultComponents = (
            <>
                <Skeleton className="search-result-skeleton" isLoaded={false}>
                    <Box h="75px" w="100%">
                    </Box>
                </Skeleton>
                <Skeleton className="search-result-skeleton" isLoaded={false}>
                    <Box h="50px" w="100%">
                    </Box>
                </Skeleton>
                <Skeleton className="search-result-skeleton" isLoaded={false}>
                    <Box h="25px" w="100%">
                    </Box>
                </Skeleton>
            </>
        )
    } else {
        resultComponents = searchResult.map(result => (
            <Skeleton className="search-result-skeleton" isLoaded={skeletonLoaded}>
                <LinkBox>
                    <Flex className="search-result">
                        <Card className="search-result-card">
                                <Image className="image-container" src={`http://adb.arcadeitalia.net/media/mame.current/decals/${result.Roms}.png?release=208`}/>
                        </Card>
                        <Flex w="100%" gap="2" alignItems="center">
                            <VStack marginRight="auto" gap="0">
                            <LinkOverlay href={`/game?id=${result.Roms}`}>
                                <Text fontSize="20px">{result.Description}</Text>
                            </LinkOverlay>
                            <Text fontWeight="350" marginTop="-6px" marginBottom="-6px" fontFamily="Montserrat" marginRight="auto" fontSize="14px">{result.year}</Text>
                            </VStack>
                                            <VStack gap="0">
                                <Text fontFamily="Montserrat" fontSize="14px">scores</Text>
                                <Text marginTop="-6px" marginBottom="-6px" fontSize="20px">0</Text>
                            </VStack>
                        </Flex>
                    </Flex>
                </LinkBox>
            </Skeleton>
        ))
    }
    

    console.log(resultComponents)

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
            <Box background="darkgrey" fontFamily="myFont" fontSize="30px" h="100%" minHeight="100vh" w="100vw" p="4">
                <Grid gap="4">
                <Box p="2" borderRadius="lg" bg="lightgrey" w="100%">
                <Card p="2" bg="#dfdfdf">

                    <Grid
                        gap="2"
                        borderRadius="lg"
                        w="100%"
                        h="100%"
                        templateRows='repeat(2, 1fr)'
                        templateColumns='repeat(3, 1fr)'
                    >
                        <GridItem h="100%" alignItems="center" colSpan={2}>
                            <Input display="flex" alignItems="center" onChange={handleChange} value={formData.query} name="query" shadow="inner" bg="white" placeholder='search' />
                        </GridItem>
                        <GridItem alignItems="center" colSpan={1}>
                            <Select  display="flex" alignItems="center" fontSize="14px" bg="white" boxShadow="base" fontFamily="Montserrat" placeholder='select'>
                                <option>games</option>
                                <option>users</option>
                            </Select>
                        </GridItem>
                        <GridItem alignItems="center" colSpan={3}>
                            <Button boxShadow="base" onClick={handleSearch} fontFamily="Montserrat" fontWeight="normal" w="100%" colorScheme='teal'>SEARCH</Button>
                        </GridItem>
                    </Grid>
                </Card>
                </Box>
                    <VStack gap="4" h="100%" w="100%">
                        {resultComponents}
                    </VStack>
                </Grid>
            </Box>
    )
}

export default Search