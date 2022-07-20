import React, { useState } from 'react'
import { View, Text ,Image,ScrollView, TouchableOpacity,
StyleSheet} from 'react-native'
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Category({filterTheProducts}) {
    const [clicked,setClicked]=useState(null);
const items = [
    {
      image: require("../assets/images/burger-pngrepo-com.png"),
      text: "Burgers",
    },
    {
      image: require("../assets/images/soft-drink.png"),
      text: "Drinks",
    },
    {
      image: require("../assets/images/recipe-pizza-icon.png"),
      text: "Pizzas",
    },
  
    {
      image: require("../assets/images/fast-food.png"),
      text: "Deals",
    },
    
  ];
  
    return (
        <View style={{flexDirection:'row'}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <Card image={item.image} txt={item.text} 
          filterTheProducts={filterTheProducts}
          setClicked={setClicked} clicked={clicked}  />
        ))}
      </ScrollView>
        </View>
    )
}

const Card=({image,txt,filterTheProducts,setClicked,clicked})=>{
   return(
     <TouchableOpacity
     style={[(windowHeight<=680)?styles.smallerDiaplay:
     styles.biggerDisplay,(clicked==txt)?{backgroundColor:'black'}
     :{}]} 
     onPress={()=>{
       setClicked(txt);
       filterTheProducts(txt);
     }} >
       <View
       
       style={
       (clicked==txt)?{opacity:0.8,alignItems:'center',justifyContent:'center'}:
       {opacity:1,alignItems:'center',justifyContent:'center'}}>
        <Image style={(windowHeight<=680)?styles.smallerDiaplayImg:
     styles.biggerDisplayImg}
        source={image}
         />
          <Text style={{},
        (clicked==txt)?{color:'white',fontWeight:'bold'}:
        {color:'black',fontWeight:'bold'}} >{txt}</Text>
          </View>
     </TouchableOpacity>  
   );
}

const styles=StyleSheet.create({
   biggerDisplay:
   
   {width:80,backgroundColor:'#F6BE00',
   borderRadius:15,height:80,alignItems:'center',marginLeft:10,
   justifyContent:'center'},
   
   smallerDiaplay:
   
   {width:70,backgroundColor:'#F6BE00',
   borderRadius:15,height:70,alignItems:'center',marginLeft:10,
   justifyContent:'center'},
   smallerDiaplayImg :{width:35,height:35},
   biggerDisplayImg:{width:40,height:40}
});