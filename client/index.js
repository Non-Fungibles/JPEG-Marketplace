import React from "react";
import { createRoot, render } from "react-dom/client";
import App from "./src/App";
import { BrowserRouter } from 'react-router-dom';
import "../client/src/styles/index.css";


const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
