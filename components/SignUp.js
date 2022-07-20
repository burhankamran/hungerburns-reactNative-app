import React, { useState } from 'react'
import { View, Text, ScrollView, KeyboardAvoidingView,Alert,ToastAndroid } from 'react-native'
import { Input,Button } from 'react-native-elements';
import { useDispatch,useSelector } from 'react-redux';
import App from '../App';
import NewNav, { hello, onAuth } from '../navigation/NewNav';
import * as AuthAction from '../store/actions/auth';
import * as showToast from '../store/actions/toast';


export default function SignUp({ navigation,route }) {

  const dispatch=useDispatch();
  const[message,setMessage]=useState('');
  useSelector(state => {
    if(state.toast.showToast)
    {
      console.log(state.toast.message);
      ToastAndroid.show(state.toast.data,ToastAndroid.SHORT);
      // dispatch(showToast.showToast({value:false,data:null}));
    }
    
 });
 
  const [email,setEmail]=useState('');
  const [errmessageEmail,seterrmessageEmail]=useState('');
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [password,setPassword]=useState('');
  const [passwordError,setPasswordError]=useState('');

  const [conPassword,setConPassword]=useState('');
  const [conPasswordError,setConPasswordError]=useState('');

  const [userName,setUserName]=useState('');

  const [phone,setPhone]=useState(0);
  const [errmessagePhone,seterrmessagePhone]=useState('');
  const regPhone=/^\d{10}$/;

  const [address,setAddress]=useState('');

  const [formState,setFormState]=useState({
     phone:false,
     email:false,
     password:false,
     conPassword:false,
});


  const validatePhone=()=>{
     if(regPhone.test(phone))
     {
      seterrmessagePhone('');
      setFormState({...formState,phone:true});
     }
     else
     {
      seterrmessagePhone('Not Valid number');
      setFormState({...formState,phone:false});
     
     }
  }
  

   const emailValidation=(text)=>{
    
    if (reg.test(text) === true){
      seterrmessageEmail('');
      setFormState({...formState,email:true});
       
  }
  else{
   
    seterrmessageEmail('*Email Not Valid');
    setFormState({...formState,email:false});
     
  }
  }

  const passwordValidation=()=>{
    if(password.length<6)
    {
      setPasswordError('*Password  length should be greater the 5 ');
      setFormState({...formState,password:false});
     
    }
    else
    {
      setPasswordError('');
      setFormState({...formState,password:true});
     
    }
}

const conPasswordValidation=(text)=>{
     if(text.localeCompare(password))
      {
         setConPasswordError('Password must match above password');
         console.log('no valid');
         setFormState({...formState,conPassword:false});
      }
      else
      {
        setConPasswordError('');
        setFormState({...formState,conPassword:true});
      
      }
      
}


const doSignUp=()=>{
  if(formState.email&&formState.conPassword&&
    formState.password&&formState.phone)
    {
      dispatch(AuthAction.signup(email,password,phone,userName,address,
        conPassword));
      navigation.navigate('Login');
      setAddress('');
      setEmail('');
      setPassword('');
      setConPassword('');
      setPhone('');
      setUserName('');
    }
    else
    {
      console.log('not valid');
    }
}

const doLogin=()=>{
 
  dispatch(AuthAction.login(email,password));
}

const typeName=route.name;
  console.log(typeName);

    return (

        <View style={{backgroundColor:'white',height:'100%'}}>
            <ScrollView keyboardShouldPersistTaps='always'>
        <KeyboardAvoidingView style={{alignItems:'center',marginTop:50}}>
      
     
            <Input
  placeholder='Email' type="email" 
  leftIcon={{ type: 'font-awesome', name: 'user',color:'#F6BE00' }}
  // errorStyle={{color:'yellow'}}
  containerStyle={{width:300}}
  value={email}
  style={{color:"black"}}
  errorMessage={errmessageEmail}
  errorStyle={{color:'red'}}
  onChangeText={(text)=>{emailValidation(text);setEmail(text)}}

      />


         <Input
  placeholder='Password' type="password" 
   leftIcon={{ type: 'font-awesome', name: 'lock',color:'#F6BE00' }}
  // errorStyle={{color:'yellow'}}
  containerStyle={{width:300}}
  value={password}
  style={{color:"black"}}
  secureTextEntry={true}
  errorMessage={passwordError}
   errorStyle={{color:'red'}}
  onChangeText={(text)=>{setPassword(text); passwordValidation(text) }}
  
  
      />
     {/* {typeName=='Login'?<View>
           <Button
           title={'Forget Password?'}
           buttonStyle={{
            backgroundColor: 'white',
            borderRadius: 3,
            color:'black'
          }}
          titleStyle={{color:'#F6BE00'}}
          onPress={()=>{
           navigation.getParent().addListener('tabPress', (e) => {
              // Do something
            });
          }}
           />
     </View>:
     <></>} */}

      {typeName=='SignUp'?[
        <View>
        <Input
  placeholder='Confirm Password' type="password" 
  leftIcon={{ type: 'font-awesome', name: 'lock',color:'#F6BE00' }}
  errorStyle={{color:'red'}}
  containerStyle={{width:300}}
  value={conPassword}
  style={{color:"black"}}
  secureTextEntry={true}
  onChangeText={(text)=>{setConPassword(text);conPasswordValidation(text)}}
  errorMessage={conPasswordError}
      />

<Input
  placeholder='User Name' type="text" 
  leftIcon={{ type: 'font-awesome', name: 'user' ,color:'#F6BE00'}}
  errorStyle={{color:'yellow'}}
  containerStyle={{width:300}}
  value={userName}
  style={{color:"black"}}
  onChangeText={(text)=>{setUserName(text)}}
      />
         <Input
  placeholder='Phone' type="text" 
  leftIcon={{ type: 'font-awesome', name: 'phone',color:'#F6BE00' }}
  // errorStyle={{color:'yellow'}}
  containerStyle={{width:300}}
  style={{color:"black"}}
  value={phone}
  keyboardType="phone-pad"
  errorMessage={errmessagePhone}
  errorStyle={{color:'red'}}
  onChangeText={(text)=>{setPhone(text);validatePhone()}}
      />

<Input
  placeholder='Address' type="text"
  leftIcon={{ type: 'font-awesome', name: 'home' ,color:'#F6BE00'}}
  errorStyle={{color:'yellow'}}
  containerStyle={{width:300}}
  value={address}
  style={{color:"black"}}
  onChangeText={(text)=>{setAddress(text)}}
      />
      </View>
      ]:<></>}
      <View style={{marginTop:5}}>
        <Text style={{color:'red'}}>{message}</Text>
        </View>
    <Button
               disabled={typeName=='SignUp'?formState.email&&formState.conPassword&&
                formState.password&&formState.phone&&address&&userName
                ? false:true:formState.email&&formState.password?false:true}
                title={typeName=='SignUp'?'SignUp':'Login'}
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
                onPress={()=>{typeName=='SignUp'?doSignUp():doLogin()}}
              />
               
    </KeyboardAvoidingView>
    </ScrollView>
        </View>
    )

  
}
