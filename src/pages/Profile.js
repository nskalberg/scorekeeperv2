import React from 'react';
import WithAction from "../components/Navbar.js"
import {
  ChakraProvider,
  Card,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Wrap,
  WrapItem,
  Image,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Flex
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

function Profile() {

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const options = {
        chart: {
            style: {"fontFamily":"myFont"},
            marginRight:32,
            borderRadius: "0.5rem",
            height: 250,
            width: screenWidth-56,
            type: 'spline',
            backgroundColor: null
        },
        title: {
          text: 'My chart'
        },
        series: [
          {
            data: [1, 2, 1, 4, 3, 6],
            shadow: true
          },
        ]
      };

    return (
        <>
        <Box background="darkgrey" fontFamily="myFont" fontSize="30px" w="100%" p="4">
          <Grid gap="4">
          
            <Flex alignItems="center" gap="4" p="4" borderRadius="lg" bg="lightgrey" w="100%" fontSize="xl">
              <Avatar
                size='lg'
                name='N'
                src='https://bit.ly/tioluwani-kolawole'
              />{' '}
              <Text fontSize="xx-large">nskalberg</Text>
            </Flex>
            <Flex gap="1" w="100%" flexWrap="wrap" fontSize="md">
            
              <Flex minWidth="100%" gap="8px" alignItems="center">
              <Box bg="lightgrey" width="16px" h="1px"></Box>
              <Text fontFamily="Montserrat" fontSize="12px" w="auto">highlights</Text>
              <Box bg="lightgrey" h="1px" flexGrow="1"></Box>
              </Flex>
            <Box  w="100%" p="2" bg="lightgrey" borderRadius="lg">
            <Card p="4" bg="#dfdfdf">
            <StatGroup fontSize="xxx-large">
              <Stat  marginRight="auto">
                <StatLabel fontFamily="Montserrat">scores</StatLabel>
                <StatNumber>532</StatNumber>
                <StatHelpText fontFamily="Montserrat">
                  <StatArrow type='increase' />
                  23.36%
                </StatHelpText>
              </Stat>
  
              <Stat textAlign="right">
                <StatLabel fontFamily="Montserrat">most played</StatLabel>
                <StatNumber>galaga</StatNumber>
                <StatHelpText fontFamily="Montserrat">
                  120 all-time  
                </StatHelpText>
              </Stat>
            </StatGroup>
            </Card>
            </Box>
          </Flex>

            <Flex p="2" bg="lightgrey" borderRadius="lg">
              <Card p="1" bg="#dfdfdf">
                <HighchartsReact highcharts={Highcharts} options={options} />
              </Card>
            </Flex>

            <Flex gap="1" w="100%" flexWrap="wrap" fontSize="sm">
            
              <Flex minWidth="100%" gap="8px" alignItems="center">
              <Box bg="lightgrey" width="16px" h="1px"></Box>
              <Text fontFamily="Montserrat" fontSize="12px" w="auto">friends</Text>
              <Box bg="lightgrey" h="1px" flexGrow="1"></Box>
              </Flex>
            <Box w="100%" p="4" bg="lightgrey" borderRadius="lg">
            <Avatar
                size='md'
                name='N'
              />{' '}
                      <Avatar
                size='md'
                name='A'
              />{' '}
                      <Avatar
                size='md'
                name='B'
              />{' '}
            </Box>
          </Flex>
            <Flex gap="1" w="100%" flexWrap="wrap" fontSize="sm">
  
              <Flex minWidth="100%" gap="8px" alignItems="center">
              <Box bg="lightgrey" width="16px" h="1px"></Box>
              <Text fontFamily="Montserrat" fontSize="12px" w="auto">recent scores</Text>
              <Box bg="lightgrey" h="1px" flexGrow="1"></Box>
              </Flex>
  
              <Box w="100%" p="2" borderRadius="lg" bg="lightgrey">
                <Card p="4" shadow="md" bg="#dfdfdf">



                <TableContainer>
                  <Table variant='simple' textAlign="end" fontSize="md">
                    <Thead fontSize="xs">
                      <Tr>
                        <Th fontFamily="Montserrat">game</Th>
                        <Th fontFamily="Montserrat" isNumeric>score</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>
                          <Card className="search-result-card search-result-card-small">
                            <Image className="image-container" src={`http://adb.arcadeitalia.net/media/mame.current/decals/galaga.png?release=208`}/>
                          </Card>
                        </Td>
                        <Td isNumeric>103000</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Card className="search-result-card search-result-card-small">
                            <Image className="image-container" src={`http://adb.arcadeitalia.net/media/mame.current/decals/mspacman.png?release=208`}/>
                          </Card>
                        </Td>
                        <Td isNumeric>75690</Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <Card className="search-result-card search-result-card-small">
                            <Image className="image-container" src={`http://adb.arcadeitalia.net/media/mame.current/decals/dkong.png?release=208`}/>
                          </Card>
                        </Td>
                        <Td isNumeric>86332</Td>
                      </Tr>
                      <Tr>
                        <Td>galaga</Td>
                        <Td isNumeric>103000</Td>
                      </Tr>
                      <Tr>
                        <Td>galaga</Td>
                        <Td isNumeric>103000</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                </Card>
              </Box>
            </Flex>
            <Flex gap="1" w="100%" flexWrap="wrap" fontSize="sm">
  
            <Flex minWidth="100%" gap="8px" alignItems="center">
              <Box bg="lightgrey" width="16px" h="1px"></Box>
              <Text fontFamily="Montserrat" fontSize="12px" w="auto">most played</Text>
              <Box bg="lightgrey" h="1px" flexGrow="1"></Box>
              </Flex>
  
              <Box w="100%" p="4" borderRadius="lg" bg="lightgrey">
                <TableContainer>
                  <Table variant='simple' textAlign="end" fontSize="md">
                    <Thead fontSize="xs">
                      <Tr>
                        <Th>game</Th>
                        <Th isNumeric>score</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>galaga</Td>
                        <Td isNumeric>103000</Td>
                      </Tr>
                      <Tr>
                        <Td>ms pac man</Td>
                        <Td isNumeric>75690</Td>
                      </Tr>
                      <Tr>
                        <Td>donkey kong</Td>
                        <Td isNumeric>86332</Td>
                      </Tr>
                      <Tr>
                        <Td>galaga</Td>
                        <Td isNumeric>103000</Td>
                      </Tr>
                      <Tr>
                        <Td>galaga</Td>
                        <Td isNumeric>103000</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Flex>
          </Grid>
        </Box>
    </>
    );
  }
  
  export default Profile;