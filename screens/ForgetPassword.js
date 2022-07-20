import React, { useState } from 'react'; 
import { View, Text,ScrollView,KeyboardAvoidingView } from 'react-native'
import { Input,Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import * as AuthAction from '../store/actions/auth';


export default function ForgetPassword() {
  const dispatch=useDispatch();
  const [formState,setFormState]=useState(false);

  const [phone,setPhone]=useState(0);
  const [errmessagePhone,seterrmessagePhone]=useState('');
  const regPhone=/^\d{10}$/;

  const validatePhone=()=>{
    if(regPhone.test(phone))
    {
     seterrmessagePhone('');
     setFormState(true);
    }
    else
    {
     seterrmessagePhone('Not Valid number');
     setFormState(false);
    
    }
 }

  return (
    <View style={{backgroundColor:'white',height:'100%'}}>
    <ScrollView keyboardShouldPersistTaps='always'>
<KeyboardAvoidingView style={{alignItems:'center',marginTop:50}}>

<Input
  placeholder='Phone' type="text" 
  leftIcon={{ type: 'font-awesome', name: 'phone',color:'#F6BE00' }}
  
  containerStyle={{width:300}}
  style={{color:"black"}}
  value={phone}
  keyboardType="phone-pad"
  errorMessage={errmessagePhone}
  errorStyle={{color:'red'}}
  onChangeText={(text)=>{setPhone(text);validatePhone()}}
      />
    <Button
                disabled={formState?false:true}
                title={'Reset Password'}
                buttonStyle={{
                  backgroundColor: '#F6BE00',
                  borderRadius: 3,
                  color:'black'
                }}
                containerStyle={{
                  width: 300,
                  marginHorizontal: 50,
                  marginVertical: 10,
                  borderRadius:10
                }}
                titleStyle={{color:'black'}}
                onPress={()=>{dispatch(AuthAction.resetPassword(phone))}}
              />
</KeyboardAvoidingView>
</ScrollView>
</View>
   
  )
}