import React from "react";
import { createRoot, render } from "react-dom/client";
import App from "./src/App";
import { BrowserRouter } from "react-router-dom";
import { CardsContextProvider } from "./src/context/CardsContext";
import "../client/src/styles/index.css";
import { AuthContextProvider } from "./src/context/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <AuthContextProvider>
      <CardsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CardsContextProvider>
    </AuthContextProvider>
);
