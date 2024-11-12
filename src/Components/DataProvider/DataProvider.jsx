

import React, { createContext, useReducer } from 'react';


// Initial state
const initialState = {
    basket: [], // Make sure this is defined as an empty array
    // Other initial state properties if needed
};

// Create context
const DataContext = createContext();

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return { ...state, basket: [...state.basket, action.item] };
        // Handle other actions
        default:
            return state;
    }
};

// Provider component
const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={[state, dispatch]}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
