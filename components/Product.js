import React from 'react'
import { ActivityIndicator,View, Text,StyleSheet,Image, ScrollView, TouchableOpacity } from 'react-native'
import { ipAddress } from '../ipAdress';

export default function Product({products,navigation,filterdProducts}) {
         
    return (
      
        <ScrollView contentContainerStyle={{}}>
           
          {filterdProducts.map((value,index)=>(

        <TouchableOpacity key={index} style={{
           width:'90%',
            padding:20,
            elevation:2,
            borderColor:'black' ,alignItems:'center',
            marginBottom:10}}
            onPress={()=>{
              navigation.navigate("ProductDetailScreen",{
                data:value,
                products:products,
              });
            }}>
          <View>    
            <View style={{width:290,height:192,
            backgroundColor:'#F6BE00',alignItems:'center',
            justifyContent:'center',borderRadius:10}}>
            <Image  
            style={{ width:'95%',height:182}}
            source={{uri:value.imageUrl.replace("http://localhost:3000", ipAddress)}}
             />
            </View>
            <View style={{marginTop:5
            ,paddingLeft:10,paddingRight:5}}>

            <Text style={{fontWeight:'bold',fontSize:13}}>
               {value.name}</Text>
            {value.productVariations.length>1?<></>:
            <Text 
            style={{fontWeight:'bold',fontSize:14}}
            >RS.{value.productVariations[0].price}</Text>
         
           }   
              
            
             </View>  
            </View>  
        </TouchableOpacity>
          ))}  
        </ScrollView>
    )
}

const style=StyleSheet.create({
   
    style:{
       
    }

});