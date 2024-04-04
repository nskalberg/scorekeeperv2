import React from 'react';
import FunText from '../components/FunText'
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
import '../index.css'

function Test() {
    return (
        <>
            <Text fontFamily="Montserrat" fontSize="12px" w="auto">highlights</Text>
            <FunText
                text="hello world"
            />
        </>
    )
}

export default Test