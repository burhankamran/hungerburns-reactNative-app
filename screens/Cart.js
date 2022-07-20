import { View, Text,Image,ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements'
import LottieView from 'lottie-react-native';
import * as cartActions from '../store/actions/cart';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as orderActions from '../store/actions/order';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Cart({navigation}) {
const dispatch=useDispatch();
const [isLoading,setIsLoading]=useState(false);

 // const isAuth = useSelector(state => !!state.auth.token);
  //const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  const cartData = useSelector(state => {
   return  state.cart.cartData 
  });

  const totalPrice = useSelector(state => {
    return  state.cart.totalPrice 
   }
   );
  
   useEffect(()=>{
       dispatch(cartActions.getCart());    
   },[])
  return (
    <View style={{flex:1}}>
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
            source={require("../assets/10816-walking-taco (1).json")}
            autoPlay
            speed={1}
          />
        </View>
        :<></>}
    <View style={{flex:1,opacity:(isLoading)? 0.2: 1}}>
     <Header navigation={navigation}/>
     <View style={{height:'50%',borderBottomWidth:1,borderBottomColor:'grey'
    ,paddingBottom:5,}} >
     <ScrollView >
    {cartData.length<1? 
    <View style={{alignItems:'center'}}><Text
      style={{fontSize:17}}
     >Cart empty!!</Text></View> :
     cartData.map((prod,index)=>(
       <OrderComponent qty={prod.qty} price={prod.price}
       name={prod.name} key={index} variation={prod.variation}
       id={prod.id}    />
     ))
     }
     </ScrollView>
    
     </View>
     <ScrollView>
       {!totalPrice?<></>:
       <CompleteOrder total={totalPrice} />
       }
     
     <View style={{alignItems:'center'}}>
     <Button
             title={'Review Payment & Address'}
             titleStyle={{color:'black',fontSize:windowHeight<=680?
             15:20
             ,}}
             buttonStyle={
                {
                    width:windowHeight<=680?
                    180:240
                    ,
                    height:windowHeight<=680?
                    60:72
                    ,
                    backgroundColor:'#F6BE00',
                    borderRadius:10,
                    
                    
                    
                }
            }
            containerStyle={{
               marginTop:10
            }}
            icon={{
                name: 'thumbs-up',
                type: 'font-awesome',
                size:20,
                color: '#8D5524',
                
              }}
              iconRight
              onPress={()=>{
                // setIsLoading(true);
                //  dispatch(orderActions.placeOrder());
                //  setTimeout(()=>{
                //   navigation.navigate('CompleteOrder');
                //   setIsLoading(false);
                //   dispatch(cartActions.cartAllDelete());
                //  }, 4000)
               navigation.navigate('CheckOut',{
                 cartData:cartData,
                 totalPrice:totalPrice,
               });
              }}
              disabled={isLoading||cartData.length<1? true:false}
             />
             </View>
             </ScrollView>
    </View>
    </View>
  );
}


const Header=({navigation})=>(
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
        <Text style={{fontWeight:'bold',fontSize:25,
      width:'100%'}}>
          My Cart &#129316;	
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

const OrderComponent=({name,qty,price,variation,id})=>{
    const newArray=name.split('+');
  return(
    <View style={{padding:10,flexDirection:'row',
    justifyContent:'space-between',marginTop:3,
    borderBottomColor:'grey',borderBottomWidth:1,
   }}>

 
    <View  style={{padding:7,backgroundColor:'#F6BE00',
    width:103,borderRadius:8,height:85,alignItems:'center',
    justifyContent:'center'}}>
     <Image 
     style={{width:90,height:70}}
     source={require('../assets/pizza.jpg')} />
    </View>
    <View>
          <View style={{  lexShrink: 1}} >
           {newArray?
               newArray.map((va)=>(
                <Text style={{fontWeight:'bold',fontSize:16}}>
                {va}
               </Text>
               ))
               
               :<Text style={{fontWeight:'bold',fontSize:16}}>
                {name}
               </Text>
                  } 
          </View>
          <View>
              <Quantity qty={qty} id={id} />
          </View>
    </View>
    <View style={{flexDirection:'column',
  justifyContent:'space-between'}}>
             <Text style={{fontWeight:'bold',fontSize:16}}>
               RS.{price}
               </Text>     
               <Text style={{fontWeight:'bold',fontSize:16}}>
               {variation}
               </Text>     
    </View>
    </View>
  )
}


const Quantity=({qty,setQty,id})=>{
  const dispatch=useDispatch();

 return(
 
  <View style={{marginTop:10,alignItems:'center',marginTop:20}}>

 <View style={{flexDirection:'row'}}>
     <Button
      buttonStyle={
          {
              width:30,
              height:30,
              backgroundColor:'#F6BE00',
              borderRadius:50
              
              
          }
      }
      iconContainerStyle={{width:50}}
       icon={{
         name: 'minus',
         type: 'font-awesome',
         size:14,
         color: 'black',
       }}
       onPress={()=>{
         dispatch(cartActions.removeToCart(id));         
     }}
     />
     <View style={{marginLeft:17,marginRight:17}}>
     <Text style={{fontSize:15}}>{qty}</Text>
     </View>
    
      <Button
      buttonStyle={
          {
            width:30,
            height:30,
              backgroundColor:'#F6BE00',
              borderRadius:50
              
              
          }
      }
      iconContainerStyle={{width:50}}
       icon={{
         name: 'plus',
         type: 'font-awesome',
         size:14,
         color: 'black',
       }}
       onPress={()=>{
        dispatch(cartActions.incToCart(id)); 
       }}
     />
     </View>  
  </View>
)
      }

const CompleteOrder=({total})=>(
  <View style={{padding:20}}>
         <View style={{flexDirection:'row',flexDirection:'row',
        justifyContent:'space-between'}}>
               <Text style={(windowHeight<=680)?
               {fontWeight:'bold',fontSize:15,
               color:'#71797E'}:
               {fontWeight:'bold',fontSize:20,
              color:'#71797E'}
              }>
                  Item Total
               </Text>
               <Text style={(windowHeight<=680)?
               {fontWeight:'bold',fontSize:15,
               color:'#71797E'}:
               {fontWeight:'bold',fontSize:20,
              color:'#71797E'}
              }>
                  Rs.{total}
               </Text>
         </View>
         <View style={{flexDirection:'row',flexDirection:'row',
        justifyContent:'space-between'}}>
               <Text style={(windowHeight<=680)?
               {fontWeight:'bold',fontSize:15,
               color:'#71797E'}:
               {fontWeight:'bold',fontSize:20,
              color:'#71797E'}
              }>
                  Delivery Charge
               </Text>
               <Text style={(windowHeight<=680)?
               {fontWeight:'bold',fontSize:15,
               color:'#71797E'}:
               {fontWeight:'bold',fontSize:20,
              color:'#71797E'}
              }>
                  Rs.0
               </Text>
         </View>
         <View style={{flexDirection:'row',flexDirection:'row',
        justifyContent:'space-between'}}>
               <Text style={(windowHeight<=680)?
               {fontWeight:'bold',fontSize:15,
               color:'#71797E'}:
               {fontWeight:'bold',fontSize:20,
              color:'#71797E'}
              }>
                 Tax
               </Text>
               <Text style={(windowHeight<=680)?
               {fontWeight:'bold',fontSize:15,
               color:'#71797E'}:
               {fontWeight:'bold',fontSize:20,
              color:'#71797E'}
              }>
                  Rs.0
               </Text>
         </View>
         <View style={{flexDirection:'row',flexDirection:'row',
        justifyContent:'space-between',marginTop:10}}>
               <Text style={(windowHeight<=680)?
              {fontWeight:'bold',fontSize:20,
              color:'black'}:
              {fontWeight:'bold',fontSize:30,
              color:'black'}
              }>
                 Total:
               </Text>
               <Text style={(windowHeight<=680)?
              {fontWeight:'bold',fontSize:20,
              color:'black'}:
              {fontWeight:'bold',fontSize:30,
              color:'black'}
              }>
                  Rs.{total}
               </Text>
         </View>
  </View>
)