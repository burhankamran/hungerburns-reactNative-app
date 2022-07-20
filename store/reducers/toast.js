import { SHOW_TOAST} from '../actions/toast';


const initialState={
    showToast:false,
    data:null
}

export default (state=initialState,action)=>{
    switch(action.type)
    {
      case SHOW_TOAST:
        return {
            showToast:action.value,
            data:action.data,
        };
       
        default:{
            return state;
        }
    }
}
