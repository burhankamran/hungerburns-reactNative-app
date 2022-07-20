import { PLACE_ORDER,PLACE_ORDER_ALL
} from '../actions/order';

const initialState = {
   currentOrders:[],
   allOrders:[],
 };

export default (state=initialState,action)=>{
   switch(action.type)
   {
     case PLACE_ORDER:
       return {
         ...state,
         currentOrders:action.orders
       };
        
       case PLACE_ORDER_ALL:
        return {
          ...state,
          allOrders:action.orders
        };

       default:{
           return state;
       }
   }
}

