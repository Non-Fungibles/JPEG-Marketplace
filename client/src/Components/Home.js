import React from "react";
import Body from "./Body";
import Sidebar from "./Sidebar";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Body />
    </div>
  );
}

export default Home;
