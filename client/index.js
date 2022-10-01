import React from "react";
import { render } from "react-dom";
import App from "./src/App";
import { BrowserRouter } from 'react-router-dom';
import './src/styles/index.css'

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
document.getElementById("root"));
