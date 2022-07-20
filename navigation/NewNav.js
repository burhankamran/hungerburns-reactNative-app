import * as React from 'react';
//import {DefaultTheme } '@react-navigation/native';
import MainScreen from '../screens/MainScreen';
import GetStartedScreen from '../screens/GetStartedScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import HandleTabNav from '../screens/HandleTabNav';
import CompleteOrder from '../screens/CompleteOrder';
import PastOrders from '../screens/PastOrders';
import CheckOut from '../screens/CheckOut';
import LocationPicker from '../screens/LocationPicker';
import ForgetPassword from '../screens/ForgetPassword';
import Notification from '../screens/Notification';



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


const MainStackNavigator=createStackNavigator();

export  const MainStack=()=> (         
        <MainStackNavigator.Navigator
         screenOptions={screenOptions} initialRouteName='HandleTabNav'>
          <MainStackNavigator.Screen name="HandleTabNav" 
          component={HandleTabNav}/>
       <MainStackNavigator.Screen name="ProductDetailScreen" component={ProductDetailScreen}
    
       />
       <MainStackNavigator.Screen name="CompleteOrder" component={CompleteOrder}
    
    />
    <MainStackNavigator.Screen name="PastOrders" component={PastOrders}
    
    />
     <MainStackNavigator.Screen name="CheckOut" component={CheckOut}
    
    />
     <MainStackNavigator.Screen name="LocationPicker" component={LocationPicker}
    
    />
     <MainStackNavigator.Screen name="Notification" component={Notification}
    
    />
        </MainStackNavigator.Navigator>  
  )

const AuthStack=createStackNavigator();   

export const Auth=()=>(
       
  <AuthStack.Navigator  
   screenOptions={screenOptions}>
    <AuthStack.Screen name="GetStartedScreen" 
    component={GetStartedScreen} 
    />
    <AuthStack.Screen name="ForgetPassword" 
    component={ForgetPassword} 
    />
  </AuthStack.Navigator>

)