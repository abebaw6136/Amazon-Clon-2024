import { type } from './action.type';

export const initialState = {
    basket: [],  // Corrected from baske to basket
};

export const reducer = (state, action) => {
    switch (action.type) {
        case type.ADD_TO_BASKET: {
            const existingItemIndex = state.basket.findIndex(item => item.id === action.item.id);
            let newBasket = [...state.basket];

            if (existingItemIndex >= 0) {
                // Item exists, increment the amount
                newBasket[existingItemIndex] = {
                    ...newBasket[existingItemIndex],
                    amount: newBasket[existingItemIndex].amount + 1,
                };
            } else {
                // Item does not exist, add it to the basket with amount 1
                newBasket.push({ ...action.item, amount: 1 });
            }

            return {
                ...state,
                basket: newBasket,
            };
        }
        case type.REMOVE_FROM_BASKET: {  // Corrected from REMOVE_FROM_BSAKET to REMOVE_FROM_BASKET
            const index = state.basket.findIndex(item => item.id === action.id);
            let newBasket = [...state.basket];

            if (index >= 0) {
                if (newBasket[index].amount > 1) {
                    newBasket[index] = { ...newBasket[index], amount: newBasket[index].amount - 1 };
                } else {
                    newBasket.splice(index, 1);
                }
            }
            return {
                ...state,
                basket: newBasket,
            };
        }
        default:
            return state;
    }
};