import React, { createContext, useReducer, useMemo } from 'react';
import { reducer, initialState } from '../../Utility/reducer';
import { type } from '../../Utility/action.type';

// Destructure action types
const { ADD_TO_BASKET, REMOVE_FROM_BASKET, SET_USER } = type;

// Create context
const DataContext = createContext();

// Provider component
const DataProvider = ({ children, initialState: propInitialState, reducer: propReducer }) => {
    const [state, dispatch] = useReducer(propReducer || reducer, propInitialState || initialState);

    const value = useMemo(() => [state, dispatch], [state]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

// Export context and provider
export { DataContext, DataProvider, ADD_TO_BASKET, REMOVE_FROM_BASKET, SET_USER };
