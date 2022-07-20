import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen';
import Cart from './Cart';
import UserProfile from './UserProfile';
import { Icon } from 'react-native-elements';
import ProductDetailScreen from './ProductDetailScreen';
import * as Notifications from 'expo-notifications';

const Tab=createBottomTabNavigator();
const screenOptions = {
  headerShown: false,
  
};

export default function HandleTabNav({navigation}) {
 
  return (
    <Tab.Navigator initialRouteName='Home'
    screenOptions={  ({route})=>({
           tabBarIcon:({focused,color,size})=>{
            let size1=17;
             let iconName;
             let rn=route.name;
             if(rn==='Cart')
             {
               iconName='shopping-cart'
               
             }
             else if(rn==='Home')
             {
               iconName='home'
             }
             else if(rn=='ProductDetailScreen')
             {
               return;
             }
             else
             {
              iconName='user'
             }
             
             
          return(   
            <Icon
             raised
             name={iconName}
             size={size1}
             type='font-awesome'
             color={color}
             />
            )
          
           },
           tabBarActiveTintColor: '#F6BE00',
           tabBarInactiveTintColor: 'black',
           tabBarLabelStyle:{padding:10,fontSize:10},
           tabBarStyle:{height:70,padding:10},
           headerShown:false,
           tabBarHideOnKeyboard:true,
           tabBarItemStyle:{

           }
        
    })}
       
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
   
    </Tab.Navigator>
  );
}
