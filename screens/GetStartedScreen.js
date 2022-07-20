import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper';
import ImageLogo from '../components/ImageLogo';
import TabNav from '../TabNav';

export default function GetStartedScreen({navigation}) {





    
    const [text, setText] = React.useState('');
    return (
        <View style={{
        flex:1}}>

       <ImageLogo/>
      
       <NavigationContainer  independent={true}>
           <TabNav   />
       </NavigationContainer>
       </View> 
       

    )
}
