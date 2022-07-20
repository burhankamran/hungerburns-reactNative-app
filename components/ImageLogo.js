import React from 'react'
import { View, Text ,Image} from 'react-native'

export default function ImageLogo() {
    return (
        <View style={{height:'32%',padding:2}}>
                <Image style={{width:'100%',height:'100%'}}
               source={require('../assets/looooooo.jpg')}
                />
           
        </View>
    )
}
