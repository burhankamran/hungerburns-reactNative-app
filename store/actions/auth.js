import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import * as Permissions from 'expo-permissions';

import * as Notifications from 'expo-notifications';

import {ipAddress} from '../../ipAdress';
import { showToast } from './toast';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SIGNUP='SIGNUP';
export const USER_PROFILE_UPDATE = 'USER_PROFILE_UPDATE';
//export const LOGIN='LOGIN';

export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

export const authenticate = (userId, token, expiryTime,userData) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token ,userData});

  };
};

export const signup=(email,password,phone,userName,address,conPassword)=>{
    
    return dispatch=>{
      console.log(conPassword,'insldskldnsndklsds');
      let pushToken;
      Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then(statusObj=>{
        if(statusObj.status !== 'granted')
        {
         return  Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then(updatedStatus=>{
        if(updatedStatus.status !== 'granted')
        {
           pushToken=null;
           console.log(pushToken);
         return fetch(ipAddress+'/signup', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email:email,
              password:password,
              phone:phone,
              userName:userName,
              address:address,
              pushToken:pushToken,
              conPassword:conPassword
            })
          })
         
        }
        else
        {
          return  Notifications.getExpoPushTokenAsync()
        }
      })
      .then(token=>{
           pushToken=token.data;
           console.log(pushToken);
           return fetch(ipAddress+'/signup', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email:email,
              password:password,
              phone:phone,
              userName:userName,
              address:address,
              pushToken:pushToken,
            })
          })
      })
      
      .then(res=>{
             return  res.json();
          })
      
          .then(res=>{
            if(res.error)
            {
              dispatch(showToast(true,res.error));
              console.log('oiskdal');
            }
            else
            {
              dispatch(showToast(false,null));
              dispatch({type:SIGNUP,message:res.message});
            }
            
         
       })
          .then(res=>console.log(res,'ok'))
          .catch(err=>console.log(err,'the err'));
      
    }
}

export const login=(email,password)=>{
  return dispatch=>{
      fetch(ipAddress+'/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email:email,
            password:password,
          })
        }).then(res=>{
           return  res.json();
        })
        .then(res=>{
          if(res.error)
            {
              dispatch(showToast(true,res.error));
              console.log('oiskdal');
            }
            else
            {
             
              dispatch(showToast(false,null));
          dispatch( authenticate(
            res.userId,
            res.token,
            parseInt(res.expiresIn) * 7000,
            {userName:res.userName,
            phone:res.phone,
            address:res.address}
          ));

            const expirationDate = new Date(
              new Date().getTime() + parseInt(res.expiresIn) * 7000
            );
            console.log(expirationDate);
            saveDataToStorage(res.token, res.userId, expirationDate,
              {userName:res.userName,
                phone:res.phone,
                address:res.address});
              }
        })
        .catch(err=>console.log(err));
    
  }
}

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const saveDataToStorage = (token, userId, expirationDate,userData) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      userInfo:userData,
      expiryDate: expirationDate.toISOString()
    })
  );
};

const updateAddress=(address)=>{
  AsyncStorage.getItem('userData')
  .then(res=>{
      AsyncStorage.setItem('userData',
      JSON.stringify({
        ...res,
        userInfo:{...res.userInfo,
          address:address},
      
      }));
    
  })
  .catch(err=>console.log(err));
}

export const userProfileEdit=(address)=>{
  return (dispatch,getState)=>{
   
    const token = getState().auth.token;
      fetch(ipAddress+'/userProfileEdit', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            authorization: token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
         
            address:address,
          })
        }).then(res=>{
           return  res.json();
        })
        .then(res=>{
          console.log(res);
           //updateAddress(address);
          dispatch({type:USER_PROFILE_UPDATE,userData:res});
        })
        .catch(err=>console.log(err));
    
  }
}


export const resetPassword=(phone)=>{
  return (dispatch,getState)=>{
   
    
      fetch(ipAddress+'/userPasswordReset', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phoneNumber:phone
          })
        }).then(res=>{
           return  res.json();
        })
        .then(res=>{
          console.log(res);
           //updateAddress(address);
          // dispatch({type:USER_PROFILE_UPDATE,userData:res});
          if(res.error)
            {
              dispatch(showToast(true,res.error));
              console.log('oiskdal');
            }
            else
            {
             
              dispatch(showToast(false,null));
            }
        })
        .catch(err=>console.log(err));
    
  }
}
