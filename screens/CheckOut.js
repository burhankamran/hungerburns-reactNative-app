import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button,Card,Input } from 'react-native-elements'
import { Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import * as cartActions from '../store/actions/cart';

import * as orderActions from '../store/actions/order';


export default function CheckOut({navigation,route}) {

  const [keyboardState,setkeyboardState]=useState(false);

  const [comment,setComment]=useState('');

  const userData = useSelector(state => {
    return  state.auth.userData 
   });

  const [cartData,setCartData]=useState( route.params.cartData);
  const [totalPrice,setTotalPrice]=useState( route.params.totalPrice);
    console.log(cartData);

  return (
    <View style={{flexDirection:'column',
  flex:1}}>
      <Header title={'CheckOut'} navigation={navigation} />
       <AddressView address={userData.address}
       navigation={navigation} keyboardState={keyboardState}
       setkeyboardState={setkeyboardState} 
       comment={comment} setComment={setComment} />
      <ScrollView >
       <OrderSummary cartData={cartData}  />
       </ScrollView>
       <View >
       <PlaceOrder totalPrice={totalPrice} navigation={navigation} 
        comment={comment} />
       </View>
       
    </View>
  )
}

const Header=({navigation,title})=>(
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
         &#128717;	
        </Text>
      </View>
  </View>
)

const AddressView=({address,navigation,keyboardState,
   setkeyboardState,comment,setComment})=>{
     return(
       <View>
         <Card containerStyle={{elevation:3}}>
           <TouchableOpacity onPress={()=>{
              navigation.navigate("LocationPicker");
           }}>
           <Card.Title>📍{address}</Card.Title>
           </TouchableOpacity>
            
            <Card.Divider />
          {keyboardState?
           <Input
           placeholder='Delivery Instruction' type="text" 
           leftIcon={{ type: 'font-awesome', 
           name: 'comment',color:'#F6BE00' }}
           
           onChangeText={(text)=>{
             setComment(text);
           }}
               /> 
          :<Button

            title={'Add Delivery Instructions'}
       buttonStyle={
           {
              
               backgroundColor:'white',
               borderRadius:10
               
               
           }
       }
       titleStyle={{color:'#e0b422'}}
       iconContainerStyle={{width:30}}
        icon={{
          name: 'plus',
          type: 'font-awesome',
          size: 28,
          color: '#F6BE00',
        }}
        onPress={()=>{
            setkeyboardState(true);
        }}
      />}
           <Card.Divider />  
            </Card>
       </View>
     )  
}

const OrderSummary=({cartData})=>
{  
  
return(
     <View style={{marginBottom:10}}>
            <Card containerStyle={{elevation:3}}>
            <Card.Title style={{fontSize:20}}>🛒Order Summary</Card.Title>
            <Card.Divider />
            <View style={{marginBottom:10}}>
             {cartData.map(data=>
             {
              const newArray=data.name.split('+');
             return(
               <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <View>
                   {newArray?
               <View>
                  {newArray.length>1?
                <Card.Divider style={{width:230,}}  />:
                <></> 
                } 
                
                <View style={{flexDirection:"row"}}>
                <Text>{data.qty}x</Text>
                <View style={{flexDirection:"column"}}>
               {newArray.map((va)=>(
                
                 <Text style={{}}>
                  {va.trim()}
                    </Text>
               
                
               ))}
                 </View>
                 </View>
               </View> 
               :<Text style={{}}>
                {name}ffg
               </Text>
                  } 
                  </View>
                   <Text style={{color:'grey'}}>
                    RS.{data.price}
                   </Text>
               </View>
               
             )})}
             </View>
             <Card.Divider  />
             <View>
             <View style={{flexDirection:'row',flexDirection:'row',
        justifyContent:'space-between'}}>
               <Text style={
                {color:'black'}
              }>
                  Delivery Charge
               </Text>
               <Text style={
                {color:'black'}
              }>
                  Rs.0
               </Text>
         </View>
         <View style={{flexDirection:'row',flexDirection:'row',
        justifyContent:'space-between'}}>
               <Text style={
                {color:'black'}
              }>
                 Tax
               </Text>
               <Text style={
                {color:'black'}
              }>
                  Rs.0
               </Text>
         </View>
             </View>
            </Card>
     </View>
)
            }


const PlaceOrder=({totalPrice,navigation,comment})=>{
  const dispatch=useDispatch();
    return(
      <View style={{padding:5,height:100}}>
       <View style={{flexDirection:'row',justifyContent:'space-between',
       paddingLeft:20,paddingRight:20,
       borderTopColor:'grey',borderTopWidth:1,}}>
            <Text style={{
          fontSize:20}}>&#128176;Total</Text>
            <Text style={{
          fontSize:20}}>RS.{totalPrice}</Text>
       </View>
       <Button
       title={'Place Order'}
       containerStyle={{
         height:190
       }}
       buttonStyle={
           {
              
              
               backgroundColor:'#F6BE00',
               borderRadius:10
               
               
           }
       }
       
      titleStyle={{color:'black',fontWeight:'bold'}}
        onPress={()=>{
          // setIsLoading(true);
                dispatch(orderActions.placeOrder(comment));
                 
                  navigation.navigate('CompleteOrder');
                  //navigation.replace("CheckOut"); 
                  dispatch(cartActions.cartAllDelete());
               
               
        }}
      />
       </View>
    );
}

