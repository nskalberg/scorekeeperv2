import React from 'react';
import './index.css'
import Profile from "./pages/Profile.js"
import Game from "./pages/Game.js"
import Test from "./pages/Test.js"
import Search from "./pages/Search.js"
import WithAction from "./components/Navbar.js"
import { Routes, Route } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <>
      <ChakraProvider>
        <WithAction />
        <Routes>
          <Route path="profile" element={ <Profile /> } />
          <Route path="game" element={ <Game /> } />
          <Route path="test" element={ <Test /> } />
          <Route path="search" element={ <Search /> } />
        </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
