

import React, { createContext, useReducer } from 'react';

// Initial state
const initialState = {
    basket: [], 
};

// Create context
const DataContext = createContext();

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET': {
            const existingItemIndex = state.basket.findIndex(item => item.id === action.item.id);
            let newBasket = [...state.basket];

            if (existingItemIndex >= 0) {
                // Item exists, increment the amount
                newBasket[existingItemIndex].amount += 1;
            } else {
                // Item does not exist, add it to the basket with amount 1
                newBasket.push({ ...action.item, amount: 1 });
            }

            return { ...state, basket: newBasket };
        }
        case 'REMOVE_FROM_BASKET': {
            const index = state.basket.findIndex(item => item.id === action.id);
            let newBasket = [...state.basket];

            if (index >= 0) {
                if (newBasket[index].amount > 1) {
                    newBasket[index].amount -= 1;
                } else {
                    newBasket.splice(index, 1);
                }
            }
            return { ...state, basket: newBasket };
        }
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

// Export context and provider
export { DataContext, DataProvider };