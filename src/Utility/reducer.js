import { type } from './action.type';

export const initialState = {
    basket: [], 
    user: null,
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
        
        case type.REMOVE_FROM_BASKET: {
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
         case type.EMPTY_BASKET:
            return{
                ...state,
                basket: newBasket,
                basket:[]
            };
        case type.SET_USER: {
            return {
                ...state,
                user: action.user
            };
        }

        default: 
            return state; // Ensure default case returns current state
    }
};

export default reducer;