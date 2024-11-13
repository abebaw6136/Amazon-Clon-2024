import{type} from './action.type'

export const initialState ={
    baske:[],
};
export const reducer = (state,action)=>{
    switch (action.type){
        case type.ADD_TO_BASKET:
            return {
                ...state,
                basket:[...state.basket,action.item],
            };
            case type.REMOVE_FROM_BSAKET:
                const index = state.basket.findIndex(item=> item.id===action.id);
                let newBasket =[...state.basket];

                if(index >=0){
                    if(newBasket[index].amount >1){
                        newBasket[index] = {...newBasket[index],amount:newBasket[index].amount-1}
                    }else{
                        newBasket.splice(index,1)
                    }
                }
                return {
                    ...state,
                    basket: newBasket,
                  }; 
            
                default:
                  return state;
              }
            };