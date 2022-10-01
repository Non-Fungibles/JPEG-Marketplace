import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SignIn from "./components/SignIn";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path='/' element={<Home />}/> */}
        <Route path='/login' element={<SignIn />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </>
  )
};

export default App;
