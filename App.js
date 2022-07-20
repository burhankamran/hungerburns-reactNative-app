import { Provider, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import AuthReducer from './store/reducers/auth';
import CartReducer from './store/reducers/cart';
import OrderReducer from './store/reducers/order';
import toastReducer from './store/reducers/toast';
import * as notificationActions from './store/actions/notification';


import NewNav from './navigation/NewNav';
import MainNav from './navigation/MainNav';
import notification from './store/reducers/notification';
//import App from './src/App';
//import App from './src/App';

Notifications.setNotificationHandler(({
      handleNotification:async ()=>{
        return {shouldShowAlert:true,
        shouldPlaySound:true,
        shouldSetBadge:true}
      }
}));


const rootReducers=combineReducers({
  auth:AuthReducer,
  cart:CartReducer,
  order:OrderReducer,
  notification:notification,
  toast:toastReducer,
});



const store=createStore(rootReducers, applyMiddleware(ReduxThunk));



export default function App() {
 

  return (
   
   

    <Provider store={store}>  
    <MainNav/>
    </Provider> 
  
  
  );
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    
    paddingTop: Platform.OS === 'android' ? 30 : 0
},
});
