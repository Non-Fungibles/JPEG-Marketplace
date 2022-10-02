import React, { createContext, useReducer } from "react";
import { cardsReducer } from "../reducers/cardsReducer";

export const WalletContext = createContext();

const initialState = {
  walletArr: [],
};

export const WalletContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  return (
    <WalletContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WalletContext.Provider>
  );
};
