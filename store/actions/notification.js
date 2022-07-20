export const MOVE_Notification='MOVE_Notification';

export const showNotificationScreen=(va,data)=>{
    return (dispatch,getState)=>{
        console.log('heee');
        dispatch({type:MOVE_Notification,value:va,data:data});
      
    }
} 