

import { View, Text,Image,ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements'
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import {  Card, } from 'react-native-elements';


import * as orderActions from '../store/actions/order';
import { useSelector } from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function PastOrders({navigation}) {
  const [isLoading,setIsLoading]=useState(true); 
 
   const dispatch=useDispatch();

   const ordersData = useSelector(state => {
         
    return  state.order.allOrders
   });
   
   console.log(ordersData,'here');

    useEffect(()=>{
      dispatch(orderActions.getOrders());
      setIsLoading(false);
    },[]);


   

  return (
    
   
       <View style={{flex:1}}>
          <Header title={'Past Orders'} navigation={navigation}  />
    {isLoading?   <View
          style={{
           
            position: "absolute",
           
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../assets/8980-order-status-for-food-delivery.json")}
            autoPlay
            speed={1}
          />
        </View>
        :<View>
     
      
      <ScrollView style={{marginBottom:100}}> 
      {
        ordersData?
        
        ordersData.map((prod,index)=>{
          console.log(prod);
          return(
           <OrderComponent prod={prod}  key={index} 
           />
        )})
        :<></>
      }
      </ScrollView>
      </View>}
    </View>
  )
}



const Header=({navigation,title})=>(
    <View style={{marginTop:10,
      flexDirection:'row',
      justifyContent:'space-between',
    width:'100%',
    marginTop:10,paddingLeft:10,paddingRight:10,alignItems:'center'}}>
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
  
  const OrderComponent=({prod})=>{
  // const [deleteOption,setDeleteOption]=useState(false);
    const dispatch=useDispatch();

    const checkValidity=(createdAt)=>{
    
      const date=new Date();
      const date1=new Date(createdAt);
      console.log(date);
      console.log(createdAt);
      var diff = Math.abs(date - date1);
      if(diff<300000)
      {
        setTimeout(()=>{
          // checkValidity(createdAt)
          console.log('called');
          
      },diff)
      return true
     
      }
      else
      {
           return false;
      }
      
      // setTimeout(()=>{
      //       const d1=new Date();
      //       var diff = Math.abs(d1 - date);
      //       console.log(diff);
      // },60000)
}
    //const newArray=name.split('+');
   
    return(
      <Card containerStyle={{padding:10,borderRadius:8,
      }}>
     
       <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',
      }}>
        
           <Text style={{fontSize:15,fontWeight:'bold'
          }}>
              &#128273;OrderId:{prod.id}
           </Text>
           <Text style={{fontSize:10}}>
           {prod.createdAt.split('T')[0]}
           </Text>

           <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
           <Text style={{fontSize:15,fontWeight:'bold',
          }}>
              Status:
           </Text>
           <Text style={{fontSize:13,marginLeft:10
          }}>
              {prod.status}
           </Text>
           </View>
           
         </View>
         <View  style={{borderBottomColor:'#D4D4D4',borderBottomWidth:1,
        borderTopColor:'#D4D4D4',borderTopWidth:1}}> 
         {prod.orderitems.map((p,index)=>(
          <View key={index}>
             <View style={{marginLeft:10,flexDirection:'row',alignItems:'center'}} 
             >
                <Text style={{fontWeight:'bold',fontSize:13}}>
                {p.qty}x
                 </Text> 
                 <Text style={{fontSize:15,marginLeft:5}}>
                 {p.name} 
             </Text> 
            
              </View>

              <View style={{flexDirection:'column',marginLeft:25}}> 
                     <Text style={{flex: 1}}> 
                     
                     Rs.{p.price}
                    </Text>
                </View>
            </View>
           
         ))}
         </View>
         
         <View style={{flexDirection:'row',alignItems:'center'}}>
           <Text style={{fontWeight:'bold',fontSize:15}}>	&#128176;SubTotal:</Text>
           <Text style={{marginLeft:2}}>
             {prod.totalPrice}
           </Text>
         </View>
         <View style={{flexDirection:'row',alignItems:'center',
        width:'70%'}}>
           <Text style={{fontWeight:'bold',fontSize:10}}>Delivery Address:</Text>
           <Text style={{marginLeft:2}}>
             {prod.address}
           </Text>
         </View>
       
        { !checkValidity(prod.createdAt)?  <></>:
       
        
         <View>
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
            name: 'ban',
            type: 'font-awesome',
            size: 28,
            color: 'black',
          }}
          onPress={()=>{
             dispatch(orderActions.orderDelete(prod.id));
             dispatch(orderActions.getOrders());
          }}
        />
         </View>
       }
     </Card>
    )
    
  }


