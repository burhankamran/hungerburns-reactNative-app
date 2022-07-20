import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL,SIGNUP,
 USER_PROFILE_UPDATE} from '../actions/auth';

const initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false,
    message:null,
    userData:null
  };

export default (state=initialState,action)=>{
    switch(action.type)
    {
      case SIGNUP:
        return {
          ...state,
         message:action.message
        };
        
        case AUTHENTICATE:
            return {
              token: action.token,
              userId: action.userId,
              didTryAutoLogin: true,
              message:null,
              userData:action.userData,
            };
          case SET_DID_TRY_AL:
            return {
              ...state,
              didTryAutoLogin: true
            };
          case LOGOUT:
            return {
              ...initialState,
              didTryAutoLogin: true
            };
            case USER_PROFILE_UPDATE:
              return {
                ...state,
                userData:action.userData
              };
        default:{
            return state;
        }
    }
}

