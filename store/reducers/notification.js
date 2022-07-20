import {MOVE_Notification, showNotificationScreen} from '../actions/notification';

const initialState={
    showNotificationScreen:false,
    data:null
}

export default (state=initialState,action)=>{
    switch(action.type)
    {
      case MOVE_Notification:
        return {
           showNotificationScreen:action.value,
           data:action.data
        };
       
        default:{
            return state;
        }
    }
}
