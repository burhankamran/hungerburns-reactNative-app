import React from 'react'
import { View, Text } from 'react-native'
import { Input } from 'react-native-elements'

export default function SearchBar({filterBySearchBar}) {
    return (
        <View style={{alignItems:'center',
        height:50}}>
            <View>
             <Input
  placeholder='Search Your Favourite Food' type="password" 
  leftIcon={{ type: 'font-awesome', name: 'search',color:'black' }}
  errorStyle={{color:'yellow'}}
  containerStyle={{width:280}}
  inputContainerStyle={{height:40}}
  style={{color:"black"}}
     onChangeText={(va)=>{filterBySearchBar(va)}}
      />
      </View>
        </View>
    )
}
