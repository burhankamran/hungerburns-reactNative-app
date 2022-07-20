import React, { useEffect, useState } from 'react'
import {ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import Category from '../components/Category'
import Product from '../components/Product'
import SearchBar from '../components/SearchBar'
import { Icon } from 'react-native-elements';
import {ipAddress} from '../ipAdress';
import { useSelector } from 'react-redux'

export default function MainScreen({navigation}) {
 
   useSelector(state => {
      if(state.notification.showNotificationScreen)
      {
        console.log('in herererererer');
        navigation.navigate('Notification',
        {
          data:state.notification.data,
        });
      }
    
   });

 const [loading,setLoading]=useState(true);
  const [products,setProducts]=useState([{
      name:'Zinger',
      price:200
  }]);

  const [filterdProducts,setFilteredProducts]=useState(products);

  useEffect(()=>{
    fetch(ipAddress+'/getProducts')
    .then((response) => response.json())
      .then((json) => {
        console.log(json.products)
       setProducts([...json.products])
        console.log(products);
        setFilteredProducts([...json.products]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      }); 
   },[])
   
  const filterTheProducts=(category)=>{
   setFilteredProducts( products.filter(prod=>{
     console.log(category,prod.category);
       return prod.category===category;
    }));
  }
  
  const filterBySearchBar=(category)=>
  {
    console.log(category);
      setFilteredProducts(products.filter(prod=>{
        console.log(category,prod.name);
          return prod.name.toLocaleLowerCase().match(category.toLocaleLowerCase());
       }))
  }

    return (
        <View style={{width:'100%',height:'100%',
        paddingLeft:20,paddingRight:4}}>
            <View style={{flexDirection:'row',paddingRight:20,
           justifyContent:'space-between',alignItems:'center',}}>   
           <Image 
                style={{width:45,height:48}}
                source={require('../assets/images/6736508.png')} 
                />
              <View style={{flexDirection:'row'}}>
                 <Icon 
                 name='map-marker'
                type='font-awesome'
                 color='#F6BE00'
                 />
                 
                 <Text style={{fontWeight:'bold',marginLeft:2}}>
                  Pakistan</Text>
                 </View>
                <Image 
                style={{width:60,height:55,borderRadius:12}}
                source={require('../assets/looooooo.jpg')} 
                />
            </View>
            <SearchBar filterBySearchBar={filterBySearchBar} />
            <Category  filterTheProducts={filterTheProducts} />
            
            <TouchableOpacity style={{flexDirection:'row',
            marginTop:10,alignItems:'center'}}>
            <Text style={{fontWeight:'bold',fontSize:13
            }}>Recommended</Text>
            <Image  
            style={{width:25,height:26,marginLeft:10}}
            source={require('../assets/images/deals.png')}  />
            </TouchableOpacity> 
            {loading? 
            <ActivityIndicator  color="#F6BE00" size="large"/>:  
           <Product filterdProducts={filterdProducts} navigation={navigation}
           products={products}  />
   
          }
            
        </View>
    )
}
