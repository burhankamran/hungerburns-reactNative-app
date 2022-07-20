import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {MainStack,Auth} from './NewNav';
import StartupScreen from '../screens/StartupScreen';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultTheme } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as notificationActions from '../store/actions/notification';
const screenOptions = {
  headerShown: false,
  
};

const MyTheme = {
...DefaultTheme,
colors: {
...DefaultTheme.colors,
primary: 'rgb(255, 45, 85)',
background:'white',
},
};

export default function MainNav({navigation}) {
  const dispatch=useDispatch();
  useEffect(()=>{
    const subBack=Notifications.addNotificationResponseReceivedListener
    (Notification=>{
    
      dispatch(notificationActions.showNotificationScreen(true,
        {...Notification.notification.request.content.data,
          title:Notification.notification.request.content.title}));
     });

    const sub=Notifications.addNotificationReceivedListener
    (Notification=>{
       dispatch(notificationActions.showNotificationScreen(true,
        {...Notification.request.content.data,
          title:Notification.request.content.title}));
        
     });

     return ()=>{
      subBack.remove();
       sub.remove();
     }

   },[]);
    const isAuth = useSelector(state => !!state.auth.token);
    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
  return (
    <View style={styles.droidSafeArea}>
    <NavigationContainer theme={MyTheme}>
    {isAuth && <MainStack/>}
      {!isAuth && didTryAutoLogin && <Auth/>}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
      
    </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
   
    paddingTop: 30
},
});
