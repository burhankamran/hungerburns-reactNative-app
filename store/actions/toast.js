export const SHOW_TOAST='SHOW_TOAST';

export const showToast=(va,data)=>{
    return(dispatch,getState)=>
    {
        dispatch({type:SHOW_TOAST,value:va,data});
    }
}