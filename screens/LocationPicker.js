import { View, Text,Alert ,StyleSheet,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-native-elements'
import { Input} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from '../components/MapPreview';
import MapView , { Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ScrollView } from 'react-native-gesture-handler';
import * as AuthActions from '../store/actions/auth';
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LocationPicker({navigation}) {
  const dispatch=useDispatch();
  const [isLoading,setIsLoading]=useState(true);
   const [pickedLocation, setPickedLocation] = useState(   {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
   const [isFetching, setIsFetching] = useState(false);
  const [Address,setAddress]=useState(useSelector(state => {
    return  state.auth.userData.address
   }));

   const setRealAddress=(latitude,longitude)=>{
     console.log('vallls');
    fetch(`http://api.positionstack.com/v1/reverse?access_key=ef9152f7cad1060bb7c4f31e0a7f8944&query=${latitude},${longitude}`)
    .then(res=>res.json())
    .then(res=>{
      setAddress(res.data[0].name);
    })
    .catch(err=>console.log(err));
   } 

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
          Alert.alert(
            'Insufficient permissions!',
            'You need to grant location permissions to use this app.',
            [{ text: 'Okay' }]
          );
          return false;
        }
        return true;
      };
     
  const getLocationHandler = async () => {
     setIsLoading(false);
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 9000
      });
      
      setPickedLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setRealAddress( location.coords.latitude,location.coords.longitude);
    } catch (err) {
        console.log(err);
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };
  let markerCoordinates=null;
  if (pickedLocation) {
    markerCoordinates = {
      latitude: pickedLocation.latitude,
      longitude: pickedLocation.longitude,
    };
   
    
  }

  const selectLocationHandler = event => {
    setPickedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
  return (
    <View style={{}}>
      <Header navigation={navigation} />
           <View style={{paddingRight:10,paddingLeft:10}}>
                <Input
             placeholder='User Location' type="text" 
             leftIcon={{ type: 'font-awesome', 
             name: 'map-marker',color:'black' }}
             value={Address}
             onChangeText={(text)=>{setAddress(text)}}
                 /> 
           </View>  
    
       
        
    <View style={{flexDirection:'row',paddingRight:10,
    paddingLeft:10,justifyContent:'space-between'
    }}>
      <Button
      style={{}}
      title={'Get User Location'}
      onPress={getLocationHandler}
      buttonStyle={{width:120,backgroundColor:'#F6BE00',}}
      titleStyle={{fontSize:12,color:'black',fontWeight:'bold'}}
      />

       <Button
      style={{}}
      title={'Save'}
      onPress={()=>{
        dispatch(AuthActions.userProfileEdit(Address));
        navigation.goBack();
      }}
      buttonStyle={{width:120,backgroundColor:'#F6BE00',}}
      titleStyle={{fontSize:12,color:'black',fontWeight:'bold'}}
      />

      </View>
     {isLoading?
     <View style={{width:'100%',height:'70%',
    alignItems:'center',justifyContent:'center'}}>
    <LottieView 
    style={ (windowHeight<=680)?{height:150,width:200} : { height:250,width:300}}
    source={require('../assets/78072-map-pin-location.json')} autoPlay loop /> 
    </View>:
     
    <View style={{padding:6,}}>
      <MapView
      moveOnMarkerPress={false}
      userInterfaceStyle='dark'
      style={{height:430}}
      region={pickedLocation}
      onPress={selectLocationHandler}
      
  >
    {markerCoordinates && (
      <View>
        <Marker 
        onPress={selectLocationHandler}
        draggable={true}
        onDragEnd={selectLocationHandler}
        title="Picked Location" coordinate={markerCoordinates} />
        <Circle center={markerCoordinates} radius={500} />
        </View>
      )}

  </MapView>
    </View>  
   }
    </View>
  )
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
            Location Picker	
          </Text>
        </View>
        <View style={{
      }}>
          <Text style={{fontWeight:'bold',fontSize:25,
        width:'100%'}}>
           &#128506;	
          </Text>
        </View>
    </View>
  )
  
  const styles = StyleSheet.create({
    locationPicker: {
      marginBottom: 15
    },
    mapPreview: {
      marginBottom: 10,
      width: '100%',
      height: 150,
      borderColor: '#ccc',
      borderWidth: 1
    }
  });
  