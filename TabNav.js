import React from 'react'
import { View, Text } from 'react-native'
import SignUp from './components/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import Login from './components/Login';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForgetPassword from './screens/ForgetPassword';

const Tab = createMaterialTopTabNavigator();


export default function TabNav({navigation}) {


  return (
   
    <Tab.Navigator
    initialRouteName="SignUp"
    screenOptions={{
      tabBarIndicatorStyle:{backgroundColor:'#F6BE00',width:100,
      marginLeft:15},
      tabBarActiveTintColor: 'black',
      tabBarLabelStyle: { fontSize: 10 },
      tabBarStyle: { backgroundColor: 'white' },
    }}
  >
    <Tab.Screen
      name="SignUp"
      component={SignUp}
      options={{ tabBarLabel: 'SignUp' }}
      
    />
    <Tab.Screen
      name="Login"
      component={SignUp}
      options={{ tabBarLabel: 'Login' }}
     
    />
  
  <Tab.Screen
      name="ForgetPassword"
      component={ForgetPassword}
      options={{ tabBarLabel: 'Forget Password' }}
      // children={()=><ForgetPassword naav={navigation}/>}
    />
  </Tab.Navigator>
    
  );

}
