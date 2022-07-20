import {GET_CART ,REMOVE_CART,REMOVE_CART_ALL} from '../actions/cart';


const initialState={
    cartData:[],
    totalPrice:null,
    message:null,
}


export default (state=initialState,action)=>{
    switch(action.type)
    {
      case GET_CART:
        return {
            ...state,
          totalPrice:action.total,  
          cartData:action.cartData
        };
        case REMOVE_CART:
        return {
            ...state,
           cartData:action.cartData,
           totalPrice:action.totalPrice,
        };
        case REMOVE_CART_ALL:
            return {
                ...state,
               cartData:[],
               totalPrice:action.totalPrice,
            };
        default:{
            return state;
        }
    }
}
