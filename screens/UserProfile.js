import { View, Text ,ScrollView,ActivityIndicator} from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import { useSelector } from 'react-redux';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
 console.log(windowHeight);
export default function UserProfile({navigation}) {
  const dispatch=useDispatch();
  const userData = useSelector(state => {
    return  state.auth.userData 
   });
 console.log(userData);
  
  return (
    
    <View style={{
    height:'100%',width:'100%'}}>
    
  
   <ScrollView>
    <View 
    >
     {userData? 
     <View>
      <View style={{alignItems:'center',
       backgroundColor:'#F6BE00',height:80,borderBottomLeftRadius:50,
       borderBottomRightRadius:50,justifyContent:'center',marginTop:3
       }}>
      <Text style={{fontWeight:'bold',fontSize:25}}>{userData.userName}</Text>
      </View>

      <View style={{alignItems:'center',borderTopColor:'black',
     flexDirection:'row',marginTop:10}}>  
  
   <Icon
  raised
  name={'phone'}
  size={15}
  type='font-awesome'
  color={'black'}
  />

        <Text style={{fontWeight:'bold',fontSize:15}}>{userData.phone}</Text>
      </View>

      <View style={{alignItems:'center',borderTopColor:'black',
      flexDirection:'row',marginRight:10,
      
  }}>
       <Icon
  raised
  name={'home'}
  size={15}
  type='font-awesome'
  color={'black'}
  />
     <View style={{paddingRight:60,flexDirection:'column'}}>
     <Text style={{fontSize:15}}>
        {userData.address}
        </Text>
     </View>
        
      </View>
      </View> :<ActivityIndicator  color="#F6BE00" size="large"/>
    }
   <View style={{alignItems:'center',borderTopColor:'black',
      
  }}>
      <Button
    
                title={'Edit'}
                buttonStyle={{
                  backgroundColor: '#F6BE00',
                  borderRadius: 3,
                  color:'black'
                }}
                containerStyle={{
                 width:70,
                  marginHorizontal: 50,
                  marginVertical: 10,
                  borderRadius:10,

                }}
                titleStyle={{color:'black'}}
                onPress={()=>{
                  navigation.navigate('LocationPicker');
                }}
              />
      <Button
    
    title={'Logout'}
    buttonStyle={{
      backgroundColor: '#F6BE00',
      borderRadius: 3,
      color:'black'
    }}
    containerStyle={{
      width:70,
      marginHorizontal: 50,
      marginVertical: 10,
      borderRadius:10,

    }}
    titleStyle={{color:'black'}}
    onPress={()=>{
      dispatch(authActions.logout())
    }}
  />
  </View>
  
    </View>
  
    <View style={{width:'100%',alignItems:'center'}}>
    <Button
    
    title={'Past Orders'}
    buttonStyle={{
      backgroundColor: '#F6BE00',
      borderRadius: 10,
      color:'black'
    }}
    containerStyle={{
      
      marginHorizontal: 50,
      marginVertical: 10,
      borderRadius:10,

    }}
    titleStyle={{color:'black'}}
    onPress={()=>{navigation.navigate('PastOrders')}}
  />
  </View>
  </ScrollView>
 
    </View>
  
   
  
  );
}
