import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<SignIn />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </>
  )
}

export default App;
