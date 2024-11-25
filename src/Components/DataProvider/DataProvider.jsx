

import React, { createContext, useReducer, useMemo } from 'react';

// Initial state
const initialState = {
    user: null, // To manage user state
    basket: [], 
};

// Create context
const DataContext = createContext();

// Action types
const ADD_TO_BASKET = 'ADD_TO_BASKET';
const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';
const SET_USER = 'SET_USER';

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_BASKET: {
            const existingItemIndex = state.basket.findIndex(item => item.id === action.item.id);
            const newBasket = [...state.basket];

            if (existingItemIndex >= 0) {
                // Item exists, increment the amount
                newBasket[existingItemIndex].amount += 1;
            } else {
                // Item does not exist, add it to the basket with amount 1
                newBasket.push({ ...action.item, amount: 1 });
            }

            return { ...state, basket: newBasket };
        }
        case REMOVE_FROM_BASKET: {
            const index = state.basket.findIndex(item => item.id === action.id);
            const newBasket = [...state.basket];

            if (index >= 0) {
                if (newBasket[index].amount > 1) {
                    newBasket[index].amount -= 1;
                } else {
                    newBasket.splice(index, 1);
                }
            }
            return { ...state, basket: newBasket };
        }
        case SET_USER: {
            return { ...state, user: action.user }; // Manage user state
        }
        default:
            return state;
    }
};

// Provider component
const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const value = useMemo(() => [state, dispatch], [state]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

// Export context and provider
export { DataContext, DataProvider, ADD_TO_BASKET, REMOVE_FROM_BASKET, SET_USER };