import { View, Text,Image,ScrollView,BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements'
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import * as orderActions from '../store/actions/order';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Cart({navigation}) {
const dispatch=useDispatch();
const [isLoading,setIsLoading]=useState(false);
    console.log(windowHeight);
 // const isAuth = useSelector(state => !!state.auth.token);
  //const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);

  const cartData = useSelector(state => {
   return  state.order.currentOrders
  });
  // const totalPrice = useSelector(state => {
    
  //   return  state.cart.totalPrice 
  //  }
  //  );

let totalPrice;
 
  if(cartData.length>=1)
  {
    console.log('herer');
    let subtotal=0;
    cartData.map((prod,index)=>(
      subtotal =subtotal+(+prod.price)*prod.qty
    ))
    totalPrice=subtotal; 
   
  }
  
   useEffect(()=>{
      // dispatch(orderActions.getOrders());
     //  console.log('useEffectCalls');

   },[])
  return (
  
    <View style={{flex:1}}>
     
     <Header navigation={navigation}/>
     <TickComponent totalPrice={totalPrice} />
     <View style={{height:(windowHeight>680?'55%':'40%'),borderBottomWidth:1,borderBottomColor:'grey'
    ,paddingBottom:5,padding:10}} >
     <ScrollView >
    {cartData.length<1? 
     <></>:
     cartData.map((prod,index)=>(
       <OrderComponent qty={prod.qty} price={prod.price}
       name={prod.name} key={index} variation={prod.variation}
       id={prod.id}  />
     ))
     }
     </ScrollView>
    
     </View>
     <AnimationComponent/>
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
          navigation.navigate('HandleTabNav');
        }}
      />
     
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
    justifyContent:'space-between',marginTop:20,
    borderBottomColor:'grey',borderBottomWidth:1}}>

 
    <View  style={{padding:7,backgroundColor:'#F6BE00',
    width:102,borderRadius:8,height:83,alignItems:'center',
    justifyContent:'center'}}>
     <Image 
     style={{width:90,height:70}}
     source={require('../assets/kfc-zinger-burger.jpg')} />
    </View>
    <View>
          <View>
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
     
     <View style={{marginLeft:17,marginRight:17}}>
     <Text style={{fontSize:15}}>Qty:{qty}</Text>
     </View>
    
     </View>  
  </View>
)
      }

const CompleteOrder=({total})=>(
  <View style={{padding:20}}>
         <View style={{flexDirection:'row',flexDirection:'row',
        justifyContent:'space-between'}}>
               <Text style={{fontWeight:'bold',fontSize:20,
              color:'#71797E'}}>
                  Item Total
               </Text>
               <Text style={{fontWeight:'bold',fontSize:20,
              color:'#71797E'}}>
                  Rs.{total}
               </Text>
         </View>
         <View style={{flexDirection:'row',flexDirection:'row',
        justifyContent:'space-between'}}>
               <Text style={{fontWeight:'bold',fontSize:20,
              color:'#71797E'}}>
                  Delivery Charge
               </Text>
               <Text style={{fontWeight:'bold',fontSize:20,
              color:'#71797E'}}>
                  Rs.0
               </Text>
         </View>
         <View style={{flexDirection:'row',flexDirection:'row',
        justifyContent:'space-between'}}>
               <Text style={{fontWeight:'bold',fontSize:20,
              color:'#71797E'}}>
                 Tax
               </Text>
               <Text style={{fontWeight:'bold',fontSize:20,
              color:'#71797E'}}>
                  Rs.0
               </Text>
         </View>
         <View style={{flexDirection:'row',flexDirection:'row',
        justifyContent:'space-between',marginTop:20}}>
               <Text style={{fontWeight:'bold',fontSize:30,
              color:'black'}}>
                 Total:
               </Text>
               <Text style={{fontWeight:'bold',fontSize:30,
              color:'black'}}>
                  Rs.{total}
               </Text>
         </View>
  </View>
)


const TickComponent=({totalPrice})=>(
    <View style={{alignItems:'center'}}>
         <LottieView
            style={{ height: 120 }}
            source={require("../assets/5184-success.json")}
            autoPlay
            speed={1}
          />
          <Text style={{fontWeight:'bold'}}>
              Your Order has been placed,Keep Rs.{totalPrice} ready
              &#128176; 
          </Text>
    </View>
)

const AnimationComponent=()=>(
    <View style={{alignItems:'center',paddingBottom:5}}>
         <LottieView
            style={{ height: 150 }}
            source={require("../assets/6519-cooking.json")}
            autoPlay
            speed={1}
          />

    </View>
)