import React, { createContext, useReducer } from "react";
import { cardsReducer } from "../reducers/cardsReducer";

export const CardsContext = createContext();

const initialState = {
  nftArr: [],
};

export const CardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  return (
    <CardsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CardsContext.Provider>
  );
};
