import { View, Text,StyleSheet,ActivityIndicator } from 'react-native';
import React,{useEffect} from 'react';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StartupScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      console.log(userData);
      if (!userData) {
        // props.navigation.navigate('Auth');
        dispatch(authActions.setDidTryAL());
        //console.log('1st');
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate,userInfo } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        // props.navigation.navigate('Auth');
       // console.log(expirationDate);
       // console.log(new Date());
        dispatch(authActions.setDidTryAL());
        //console.log('2nd');
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();
       // console.log(token,expiryDate,userId,'burhan');
      dispatch(authActions.authenticate(userId, token, expirationTime,userInfo));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

