import { View, Text, Linking, Platform ,Clipboard,ToastAndroid} from 'react-native'
import React from 'react'
import { Button, Card } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import * as notificationActions from '../store/actions/notification';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Notification({navigation,title,route}) {
     const data=route.params.data;
  
   console.log(data)
 const   dialCall = () => {
 
    let phoneNumber = data.riderPhoneNumber;
 
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    }
    else {
      phoneNumber = 'telprompt:${1234567890}';
    }
 
    Linking.openURL(phoneNumber);
  };

  const   onSms = () => {
 
    let phoneNumber = data.riderPhoneNumber;
 
    if (Platform.OS === 'android') {
      phoneNumber = `sms:${phoneNumber}`;
    }
    else {
      phoneNumber = 'telprompt:${1234567890}';
    }
 
    Linking.openURL(phoneNumber);
  };
  return (
    <View>
      <Header navigation={navigation} title={data.title} 
      />
     <OrderInstructions dialCall={dialCall}
     onSms={onSms} data={data}  />
    </View>
  )
}

const Header=({navigation,title})=>
    
{
  const dispatch=useDispatch();
return(
  <View style={{marginTop:10,
    flexDirection:'row',
    justifyContent:'space-between',
  width:'100%', 
  marginTop:10,paddingLeft:10,paddingRight:10,alignItems:'center',}}>
      <Button
       buttonStyle={
           {
               width:50,
               height:45,
               backgroundColor:'#F6BE00',
               borderRadius:10
               
               
           }
       }
       iconContainerStyle={{width:50}}
        icon={{
          name: 'arrow-left',
          type: 'font-awesome',
          size: 28,
          color: 'black',
        }}
        onPress={()=>{
          dispatch(notificationActions.showNotificationScreen(false,null));
          navigation.goBack();
        }}
      />
       <View style={{
    }}>
        <Text style={{fontWeight:'bold',fontSize:20,
      width:'100%'}}>
         {title}	
        </Text>
      </View>
      <View style={{
    }}>
        <Text style={{fontWeight:'bold',fontSize:25,
      width:'100%'}}>
        &#128276;
	
        </Text>
      </View>
  </View>
)
  }

const OrderInstructions=({dialCall,onSms,data})=>(
      <View>
        <Card>
        <View style={{width:'100%',alignItems:'center'}}>
    <LottieView 
    style={ (windowHeight<=680)?{height:150,width:200} : { height:250,width:300}}
    source={require('../assets/65321-food-delivery.json')} autoPlay loop />
    </View>
        <View style={{alignItems:'center'}}>
        <Text style={{fontWeight:"bold",fontSize:15}}>
              {data.time}
          </Text>
        </View>
        <View style={{alignItems:'center'}}>
          <Text>Keep {data.price}&#128176; ready</Text>
        </View>
        <View style={{alignItems:'center'}}>
             

             <Button
            title={data.riderPhoneNumber}
            titleStyle={{
              color:'black',
              fontWeight:'bold'
            }}
       buttonStyle={
           {
                width:150,
                // height:45,
               backgroundColor:'white',
               borderRadius:10
               
               
           }
       }
       onPress={()=>{  Clipboard.setString(data.riderPhoneNumber);
       ToastAndroid.showWithGravity('Number Coppied',
        ToastAndroid.SHORT,ToastAndroid.CENTER);
      }}
       
      />

        </View>
          <View style={{flexDirection:'row',
        justifyContent:'space-between',marginTop:10}}>
           
            
            <Button
            title={'Call Rider'}
            titleStyle={{
              color:'black',
              fontWeight:'bold'
            }}
       buttonStyle={
           {
                width:140,
              //  height:45,
               backgroundColor:'#F6BE00',
               borderRadius:10
               
               
           }
       }
       iconContainerStyle={{}}
        icon={{
          name: 'phone',
          type: 'font-awesome',
          size: 25,
          color: 'black',
        }}
        onPress={()=>{
          dialCall();
        }}
      />
       <Button
            title={'Sms Rider'}
            titleStyle={{
              color:'black',
              fontWeight:'bold'
            }}
       buttonStyle={
           {
                width:140,
              //  height:45,
               backgroundColor:'#F6BE00',
               borderRadius:10
               
               
           }
       }
       iconContainerStyle={{}}
        icon={{
          name: 'comment',
          type: 'font-awesome',
          size: 25,
          color: 'black',
        }}
        onPress={()=>{
          onSms();
        }}
      />
          </View>
        </Card>
      </View>
);