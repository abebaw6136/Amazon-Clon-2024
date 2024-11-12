import{type} from './action.type'

export const initialState ={
    baske:[]
}
export const reducer = (state,action)=>{
    switch (action.type){
        case type.add_to_BASKET:
            return {
                ...state,
                basket:[...state.basket,action.item]
                
                
            }
            
            default:
               return state;
    }
}