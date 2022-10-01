import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CreateForm from "./Components/CreateForm";
import Marketplace from "./Components/Marketplace";
import Wallet from "./Components/Wallet";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
