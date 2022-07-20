import React , { useState }  from 'react'
import { View, Text ,Image, ScrollView,StyleSheet} from 'react-native'
import { Button } from 'react-native-elements'
import { useDispatch } from 'react-redux';
import * as cartActions from '../store/actions/cart';
import { Dimensions } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LottieView from 'lottie-react-native';
import { ipAddress } from '../ipAdress';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ProductDetailScreen({route,navigation}) {

    const [checkState,setCheckState]=useState([]);
    const [qty,setQty]=useState(1);
    const [price,setPrice]=useState(
        route.params.data.productVariations[0].price
    )
    const [variation,setVarition]=useState(
        route.params.data.productVariations.length<=1?'F':'S'
    );
    const [loadingTime,setLoadingTime]=useState(false);
    const fetchedCat=[];
   if(route.params.data.category==='Deals')
   { 
   const  spiltFirst=route.params.data.name.split("+"); 
       spiltFirst.map((value)=>{
          let a1=value.split(' ');
            a1.map((va)=>{
                console.log(va);
              if(va.charAt(0)=='B'||va.charAt(0)=='P'||va.charAt(0)=='D')
              {
                 fetchedCat.push(va);
                 console.log('match');
              }
          })
       })
   
  
}
console.log(fetchedCat,'fetchedCat');

   const allCheckBoxStates=(value,va2)=>{
       console.log('cli');
       if(checkState.length<1)
       {
          
           setCheckState([...checkState,value]);
           
       }
        else
       {
        
           if(value==va2)
           {
             
               const element=checkState.find((va,index)=>{
                    return va==value
               });
               if(!element)
               {
                setCheckState([...checkState,value]);
               }
               
           }
           else
           {
               console.log(va2);
            setCheckState(checkState.filter((va,index)=>{
                console.log(va!=va2);
                    return va!=va2;
                }));
              console.log(checkState,'remove pepsi');
            const element=checkState.find((va,index)=>{
                return va==value
           });
              if(element)
              {
                return  setCheckState([...checkState]);
              }
              else
              {
                setCheckState([...checkState,value]);
              }
           }
       } 


   
   }    
   const timerSet=()=>{
       setLoadingTime(true);
    setTimeout(()=>{
        console.log('here');
     setLoadingTime(false);
 },1000)
  }


   const prodId=route.params.data.id;
    return (

        <View style={{flex:1}}>
        
           
         

            <View style={{
               width:'100%',
               backgroundColor:'yellow',
            
            }}>
            <Image 
            style={(windowHeight<=680)?{width:'100%',height:200}:
            {width:'100%',height:270}}
            source={{uri:route.params.data.imageUrl.replace("http://localhost:3000", ipAddress)}} />
            </View>


            <Header navigation={navigation}/>
            <ScrollView>
             <View style={{alignItems:'center'}}>
            <ProductTitle route={route} /> 
            </View>   

            {route.params.data.productVariations.length<=1?<></>:
            <ProductVarition variation={variation} 
            setVarition={setVarition} setPrice={setPrice}
            route={route}  />
            }
            <Quantity qty={qty} setQty={setQty} />
          
          {
            fetchedCat.map((va,index)=>(
                  <DealOptions key={index}
                  products={route.params.products}
                  category={va} title={va} 
                  allCheckBoxStates={allCheckBoxStates} />
            ))   
            }
          
          </ScrollView>
        
            <CompleteOrder price={price} qty={qty}
            prodId={prodId} variation={variation} 
            checkState={checkState} timerSet={timerSet}
            loadingTime={loadingTime} />
            
        </View>
    )
}

const Header=({navigation})=>(
    <View style={{marginTop:5,position:'absolute',
    width:'100%'}}>
        <Button
         buttonStyle={
             {
                 width:50,
                 height:45,
                 marginTop:5,
                 marginLeft:10,
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
    </View>
)
const ProductTitle=({route})=>{
    return(
        <View style={{marginTop:10,borderBottomColor:'black',
        borderBottomColor:'grey',borderBottomWidth:1,width:'85%'  }}>
             <View style={{alignItems:'center',marginBottom:20}}>
                    <View style={{flexDirection:'row'}}>
                       <Text
                        style={{fontSize:18,fontWeight:'bold'}}
                         >{route.params.data.name}</Text>

                           <Image 
                           style={{width:30,height:30}}
                              source={require('../assets/images/6736508.png')} 
                               />
                       </View>
                 <Text  
                 style={{fontSize:15}}
                 >{route.params.data.description}</Text>
             </View>
         
        </View>
    )
}

const ProductVarition=({variation,setVarition,setPrice,route
})=>{

     return(
         <View style={{
         alignItems:'center',justifyConten:'center',marginTop:10}}>
           <View style={{flexDirection:'row',width:'70%',
          
           justifyContent:'space-between'}}>
             <Button
             title={'S'}

             buttonStyle={
                (variation=='S')? styles.suc:
                   styles.unSuc
              
            }
             onPress={()=>{
                 setVarition('S')
                 setPrice(route.params.data.productVariations[0]
                    .price)
             }}

             />
               <Button
             title={'M'}
 
             buttonStyle={
              
                    (variation=='M')? styles.suc:
                    styles.unSuc
              
            }
            containerStyle={
                {
                 
                  marginTop:40
                }
            }
            onPress={()=>{
                setVarition('M')
                 setPrice(route.params.data.productVariations[1]
                    .price)
            }}
             />

                 <Button
             title={'L'}
 
             buttonStyle={
               
                    (variation=='L')? styles.suc:
                   styles.unSuc
                
                    
               
            }
            onPress={()=>{
                setVarition('L')
                setPrice(route.params.data.productVariations[2]
                    .price)
            }}

             />
             </View>  
         </View>
     )
}

const Quantity=({qty,setQty})=>(
     <View style={{alignItems:'center',marginTop:20}}>
 
    <View style={{flexDirection:'row'}}>
        <Button
         buttonStyle={
             {
                 width:40,
                 height:40,
                 backgroundColor:'#F6BE00',
                 borderRadius:50
                 
                 
             }
         }
         iconContainerStyle={{width:50}}
          icon={{
            name: 'minus',
            type: 'font-awesome',
            size:18,
            color: 'black',
          }}
          onPress={()=>{
              if(qty>1)
              {
                setQty(qty-1);
              }
            
        }}
        />
        <View style={{marginLeft:40,marginRight:40}}>
        <Text style={{fontSize:25,fontWeight:'bold'}}>{qty}</Text>
        </View>
       
         <Button
         buttonStyle={
             {
                 width:40,
                 height:40,
                 backgroundColor:'#F6BE00',
                 borderRadius:50
                 
                 
             }
         }
         iconContainerStyle={{width:50}}
          icon={{
            name: 'plus',
            type: 'font-awesome',
            size:18,
            color: 'black',
          }}
          onPress={()=>{
              setQty(qty+1);
          }}
        />
        </View>  
     </View>
)
 

const CompleteOrder=({price,qty,prodId,variation,checkState,
  timerSet,loadingTime})=>{
    const dispatch=useDispatch();
    return(
        <View style={{alignItems:'center',
        justifyContent:'center',
        borderTopColor:'grey',borderTopWidth:1}}>
        <View style={{flexDirection:'row',marginTop:5,width:'97%',
       justifyContent:'space-between',marginBottom:5}}>
              <View>
              <Text style={{color:'grey',fontSize:20}}>Price</Text>
              
              <Text style={{fontSize:40,fontWeight:'bold'}}>
                  
                  RS.{price}
                  </Text>
        
              </View>
              {loadingTime?
                 <LottieView
                 style={{ height: 100 }}
                 source={require("../assets/61342-shopping-basket.json")}
                 autoPlay
                 speed={1}
               />
            
            :
              <Button
             title={'Add To Cart'}
             titleStyle={{color:'black',fontSize:15,fontWeight:'bold'}}
             buttonStyle={
                {
                    width:180,
                    height:72,
                    backgroundColor:'#F6BE00',
                    borderRadius:10,
                    
                    
                    
                }
            }
            containerStyle={{
               marginTop:10
            }}
            icon={{
                name: 'shopping-cart',
                type: 'font-awesome',
                size:28,
                color: 'black',
                
              }}
              onPress={()=>{
                
                 dispatch(cartActions.addToCart(prodId,qty,variation));
                 timerSet();
              }}
             /> }
        </View>
        </View>
    )
}

const DealOptions=({products,category,title,allCheckBoxStates})=>{
    console.log('in deal options');
    console.log('sklfdklfjskljflkf');
    
    const [selectPicker,setSelectPicker]=useState('');
     
    return(
        <View style={{paddingLeft:20,paddingTop:20}}>

       <Text style={{fontWeight:'bold',
    fontSize:17}}>{title}</Text>
       {products.map((prod,index)=>(
        ( prod.category.charAt(0).toLowerCase()===
        category.charAt(0)
        .toLowerCase() && prod.category!='Deals')?
       <BouncyCheckbox onPress={(isChecked) => {}} 
         size={20}
         fillColor="#F6BE00"
         iconStyle={{borderColor: "#F6BE00"}}
         text={prod.name}
         style={{marginTop:8}}
         key={index}
         textStyle={{fontSize:15}}
         onPress={(isChecked) => {
           
                   let pre=prod.name;
                   allCheckBoxStates(pre,selectPicker);
             setSelectPicker(prod.name);
            
         }}
         disableBuiltInState={true}
         isChecked={prod.name==selectPicker}
       />
         :<></>
       ))}
        
        

        </View>
    )
}


const styles=StyleSheet.create({
    suc:{
        width:50,
        height:45,
        backgroundColor:'black',
        borderRadius:10
    },
    unSuc:{
        width:50,
        height:45,
        backgroundColor:'#F6BE00',
        borderRadius:10
    }
})