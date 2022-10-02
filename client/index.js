import React from "react";
import { createRoot, render } from "react-dom/client";
import App from "./src/App";
import { BrowserRouter } from "react-router-dom";
import { CardsContextProvider } from "./src/context/CardsContext";
import { WalletContextProvider } from "./src/context/WalletContext";
import "../client/src/styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <WalletContextProvider>
    <CardsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CardsContextProvider>
  </WalletContextProvider>
);
