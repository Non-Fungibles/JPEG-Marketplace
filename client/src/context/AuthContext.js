import React, { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import ACTIONS from '../constants/constants';

export const AuthContext = createContext();

const initialState = {
    user_id: 0,
    status: null,
    message: ''
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // If user is in localStorage, automatically log user in (similar like session)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: ACTIONS.LOGIN, payload: user });
        }
    }, [])

    console.log('AuthContext state:', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
};
