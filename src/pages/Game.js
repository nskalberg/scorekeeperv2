import {React, useEffect, useState} from 'react';
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
  Image,
  HStack,
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
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
  Skeleton,
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
import { FastAverageColor } from 'fast-average-color';
import { useToast } from '@chakra-ui/react'
import ColorThief from "colorthief"
import { TriangleUpIcon, TriangleDownIcon, StarIcon } from '@chakra-ui/icons'
import GameCard from "../components/GameCard.js"

function Game() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const search = window.location.search.substring(1);
    const searchParams = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    const [gameData, setGameData] = useState({})
    const [recentScores, setRecentScores]  = useState([])
    const [formData, setFormData] = useState({})
    const [image, setImage] = useState("")
    const [gameColor, setGameColor] = useState("")
    const [secondaryColor, setSecondaryColor] = useState("")
    const [averageScore, setAverageScore] = useState("")
    const [colorLoaded, setColorLoaded] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    let options = {
      chart: {
          style: {"fontFamily":"myFont", "transition":"1s"},
          marginRight:24,
          marginTop:32,
          marginLeft: 64,
          borderRadius: "0.5rem",
          height: 250,
          width: screenWidth-54,
          type: 'spline',
          backgroundColor: null
      }
    }

    colorLoaded && (setTimeout(() => {document.querySelector(".highcharts-credits").style.display = "none"}, 1))


    if(recentScores[0]){

      
      const scoreChartData = JSON.parse(JSON.stringify(recentScores)).map(score => {
        return ([
          score.date,
          parseInt(score.score)
        ])
      })
  
        const recentScoresReversed = JSON.parse(JSON.stringify(recentScores)).reverse()
        console.log(recentScoresReversed)
        var highScore = recentScoresReversed[0].score
        const highChartData = [[recentScoresReversed[0].date,recentScoresReversed[0].score]]
        for(var i = 0; i < recentScoresReversed.length; i++){
          if(recentScoresReversed[i].score > highScore){
            highScore = recentScoresReversed[i].score
            highChartData.push([recentScoresReversed[i].date,recentScoresReversed[i].score])
          } else if(i == recentScoresReversed.length - 1){
            highChartData.push([recentScoresReversed[i].date,highScore])
          }
        }
        
        console.log(highChartData)

        options = {
          chart: {
              style: {"fontFamily":"myFont", "transition":"1s"},
              marginRight:24,
              marginTop:32,
              marginLeft: 64,
              borderRadius: "0.5rem",
              height: 250,
              width: screenWidth-54,
              type: 'spline',
              backgroundColor: null
          },
          title: {
            text: null
          },
          xAxis: {
            type: 'datetime',
            labels: {
              formatter: function() {
                return Highcharts.dateFormat('%m/%e/%y', this.value);
              },
              style: {
                fontFamily:"Montserrat"
              }
            }
          },
          yAxis: {
            title: {
              text: ""
            }
          },
          series: [
            {
              type: "area",
              color: `rgba(${secondaryColor}, 0.65)`,
              data: highChartData,
              shadow: true,
              showInLegend: false,
              fillOpacity: "0.1",
              threshold: null,
              style:{"transition":"1s"}
            },
            {
              type: "area",
              color: `rgba(${gameColor}, 0.65)`,
              data: scoreChartData,
              shadow: true,
              showInLegend: false,
              fillOpacity: "0.1",
              threshold: null
            }
          ]
        };
      }
    function StandardDeviation(arr) {
 
      // Creating the mean with Array.reduce
      let mean = arr.reduce((acc, curr) => {
          return acc + curr
      }, 0) / arr.length;
   
      // Assigning (value - mean) ^ 2 to
      // every array item
      arr = arr.map((k) => {
          return (k - mean) ** 2
      });
   
      // Calculating the sum of updated array 
      let sum = arr.reduce((acc, curr) => acc + curr, 0);
   
      // Calculating the variance
      let variance = sum / arr.length
   
      // Returning the standard deviation
      return Math.sqrt(sum / arr.length)
    } 
   
    
    function handleChange(e) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [e.target.name]: e.target.value
      }))
    }

    function submitScore() {
      onClose()
      fetch("http://localhost:3100/api/score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          game: searchParams.id,
          user: 1
        })
      })
        .then(res => res.json())
        .then(res => {
            toast({
              title: 'score added',
              status: 'success',
              duration: 2000,
              isClosable: true,
            })
            getScores()
            console.log(res)
        })
    }

    function getScores() {
      fetch("http://localhost:3100/api/scores", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: 1,
          game: searchParams.id
        })
      })
        .then(res => res.json())
        .then(res => {

            const resSorted = res.sort((a,b) => { return Date.parse(b.date) - Date.parse(a.date) })
          
            setRecentScores(resSorted.map(score => { return ({
              date: Date.parse(score.date),
              score: parseInt(score.score)
            })}
            ))
        })
    }

    useEffect(() => {
      fetch("http://localhost:3100/api/game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: searchParams.id})
    })
        .then(res => res.json())
        .then(res => {
            setGameData(res.gameData)
        })

        getScores()
          
        document.querySelector(".highcharts-credits").style.display = "none"
    }, [])

    useEffect(() => {
      if(gameData.game_name){
        const fac = new FastAverageColor();

        const colorThief = new ColorThief();
        const img = document.querySelector('#image');

        if (img.complete) {
          colorThief.getColor(img);
        } else {
          img.addEventListener('load', function() {
            setImageLoaded(true)
            const imageRGB = colorThief.getPalette(img, 3)
            const imageRGBDev = imageRGB.map(color => {
              if(color != imageRGB[0]){
                return([...color, StandardDeviation(color)])
              }
            })
            imageRGBDev.sort(function(a, b){return b[3] - a[3]})
            console.log(imageRGBDev)
            setGameColor(`${imageRGB[0][0]},${imageRGB[0][1]},${imageRGB[0][2]}`)
            setSecondaryColor(`${imageRGBDev[0][0]},${imageRGBDev[0][1]},${imageRGBDev[0][2]}`)
            setColorLoaded(true)
          });
        }
      }
    
    }, [gameData])

    useEffect(() => {
      var scoreTotal = 0
      for(var i = 0; i < recentScores.length; i++){
        scoreTotal += parseInt(recentScores[i].score)
      }
      setAverageScore(scoreTotal/recentScores.length)

  
    }, [recentScores])
    console.log(averageScore, "average score")
    const recentScoresComponents = recentScores.map(score => {

      function formatCourseDate(date) {
        const dateObj = new Date(date);
        dateObj.setDate(dateObj.getDate() + 1)
        return new Intl.DateTimeFormat('en-US').format(dateObj);
      }

      const vsAverage = (((score.score/averageScore) - 1)*100).toFixed(0)

      const vsAverageComponent = (
        <>
          {
            (vsAverage < 0)
              ? <TriangleDownIcon color="red" />
              : <TriangleUpIcon color="green" />
          }
          {`  ${Math.abs(vsAverage)}%`}
        </>
      )

      return (
        <tr>
          <Td textAlign="left" fontFamily="Montserrat" fontSize="14px">{formatCourseDate(score.date)}</Td>
          <Td textAlign="center" fontFamily="Montserrat" fontSize="14px">{vsAverageComponent}</Td>
          <Td textAlign="right" isNumeric>{score.score}</Td>
        </tr>
      )
    })

    const toast = useToast()


      console.log(secondaryColor)
    return (
            <Box borderRadius="0px !important" background="darkgrey" fontFamily="myFont" fontSize="30px" h="100%" w="100%" padding="1rem">
                <Grid className="content-container" gap="4" w="100%">
                <GameCard game={searchParams.id} />
                    <Flex className="search-result">
                    <Skeleton fadeDuration={1} className="search-result-skeleton" isLoaded={imageLoaded}>
                        <Card backgroundColor={`rgba(${gameColor}, 0.1) !important`}  className="search-result-card">
                          
                            {gameData.game_name && <Image id="image" className="image-container" src={`http://localhost:3100/api/image?game=${gameData.game_name}`} crossOrigin="anonymous" />}
                          
                        </Card>
                        </Skeleton>
                        <Skeleton fadeDuration={1} className="search-result-skeleton" isLoaded={gameData.game_name}>
                          <Flex w="100%" gap="2" alignItems="center">
                              <VStack gap="0" marginRight="auto">
                              <Text fontSize="20px">{gameData.short_title}</Text>
                              <Text fontWeight="350" marginTop="-6px" marginBottom="-6px" fontFamily="Montserrat" marginRight="auto" fontSize="14px">{gameData.year}</Text>
                              </VStack>
                              <VStack gap="0">
                                  <Text fontFamily="Montserrat" fontSize="14px">scores</Text>
                                  <Text marginTop="-6px" marginBottom="-6px" fontSize="20px">{recentScores.length}</Text>
                              </VStack>
                          </Flex>
                        </Skeleton>
                        
                    </Flex>
                    <Flex p="2" className="search-result">
                      <Skeleton fadeDuration={1} isLoaded={colorLoaded} className="search-result-skeleton">
                      <Card w="100%" shadow="sm">
                       <Button shadow="md" bg={`rgba(${gameColor}, 0.65)`} onClick={onOpen}>add score</Button>
                      </Card>
                      </Skeleton>

                    </Flex>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay/>
                        <ModalContent w="calc(100% - 2rem)">
                        <ModalHeader>add score</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing="4">
                                <NumberInput width="100%">
                                <NumberInputField onChange={handleChange} name="score" value={formData.score}/>
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                                </NumberInput>
                                <Input
                                  placeholder="date"
                                  size="md"
                                  type="date"
                                  onChange={handleChange}
                                  name="date"
                                  value={formData.date}
                                />
                                <Input
                                  placeholder="location"
                                  size="md"
                                  type="text"
                                  onChange={handleChange}
                                  name="location"
                                  value={formData.location}
                                />
                            </VStack>
                            
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={submitScore}>
                            add score
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                <Flex gap="1" flexWrap="wrap" fontSize="sm">
  
                  <Flex gap="8px" alignItems="center" flexGrow="1">
                  <Box bg="lightgrey" width="16px" h="1px"></Box>
                  <Text fontFamily="Montserrat" fontSize="12px" w="auto">high score</Text>
                  <Box bg="lightgrey" h="1px" flexGrow="1" ></Box>
                  </Flex>
                  <Flex w="100%" p="2" bg="lightgrey" borderRadius="lg">
                    <Card p="4" w="100%" bg="#dfdfdf">
                      <HStack align="center" justify="right">
                        <VStack gap="0" marginRight="auto" >
                          <Flex w="100%" gap="1" alignItems="center">
                            <StarIcon color={`rgb(${secondaryColor})`} boxSize="12px" />
                            <Text fontFamily="Montserrat" fontSize="12px">high score</Text>
                          </Flex>
                          <Text w="100%" textAlign="left" marginTop="-6px" marginBottom="-6px" fontSize="24px" >
                            {highScore}
                          </Text>
                        </VStack>
                        <VStack textAlign="right" gap="0">
                            <Text w="100%" fontFamily="Montserrat" textAlign="right" fontSize="16px">3/20/2024</Text>
                            <Text w="100%" marginTop="-6px" marginBottom="-6px" fontSize="16px">ground kontrol</Text>
                        </VStack>
                      </HStack>
                    </Card>
                  </Flex>
                </Flex>
                    <Flex gap="1" flexWrap="wrap" fontSize="sm">
                <Flex gap="8px" alignItems="center" flexGrow="1">
                <Box bg="lightgrey" width="16px" h="1px"></Box>
                <Text fontFamily="Montserrat" fontSize="12px" w="auto">score history</Text>
                <Box bg="lightgrey" h="1px" flexGrow="1" ></Box>
                </Flex>
                
                <Flex p="2" w="100%" bg="lightgrey" borderRadius="lg">
                  <Skeleton fadeDuration={1} isLoaded={colorLoaded} className="search-result-skeleton">
                    <Card p="1" bg="#dfdfdf">
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </Card>
                  </Skeleton>

                </Flex>
              </Flex>
              
            <Flex gap="1" flexWrap="wrap" fontSize="sm">
  
              <Flex gap="8px" alignItems="center" flexGrow="1">
              <Box bg="lightgrey" width="16px" h="1px"></Box>
              <Text fontFamily="Montserrat" fontSize="12px" w="auto">recent scores</Text>
              <Box bg="lightgrey" h="1px" flexGrow="1" ></Box>
              </Flex>
  
              <Box p="2" borderRadius="lg" bg="lightgrey" w="100%">
                <Card p="4" bg="#dfdfdf">

                <TableContainer >
                  <Table variant='simple' textAlign="end" fontSize="xxs">
                    <Thead fontSize="xs">
                      <Tr>
                        <Th textAlign="left" fontFamily="Montserrat">game</Th>
                        <Th textAlign="center" fontFamily="Montserrat">vs. avg.</Th>
                        <Th textAlign="right" fontFamily="Montserrat" isNumeric>score</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {recentScoresComponents}
                    </Tbody>
                  </Table>
                </TableContainer>
                </Card>
              </Box>

            </Flex>
              
                </Grid>
            </Box>
    )
}

export default Game