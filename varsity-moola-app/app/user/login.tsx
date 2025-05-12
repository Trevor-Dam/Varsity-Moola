/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
///import type {PropsWithChildren} from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Button,
  StyleSheet,
} from 'react-native';

import { useAuthContext } from '../../UserContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import '../../global.css'

import Dashboard from '../account/dashboard';

// App.js


import { Link, router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';






function loginUser(username: string, password: string) {
  AsyncStorage.removeItem('JwtToken');
  axios.post("http://10.0.2.2:5075/api/Users/Login", 
    {email: username, password: password}, 
      {headers: {"Content-Type": "application/json"}}).then((successful) => {
        if (successful.status === 200) {
          var data = JSON.parse(successful.data);
          console.log(data);
          AsyncStorage.setItem('JwtToken', data);
          router.navigate('/account/dashboard');
        }
        else {
          throw new Error("Authentication error");
          
        }
      })
    .catch((error) => {
      console.log(error);
      Alert.alert('Access Denied', 'Invalid email or password');
    });

      

      
}

export default function Login(prop: {navigation: any}) {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
AsyncStorage.removeItem('JwtToken');

return (
  <View style={styles.container}>
  <View style={styles.view}>
    <Text style={styles.text}>Email</Text>
    <TextInput
      style={styles.input}
      id="user"
      placeholder="Email"
      onChangeText={newText => setEmail(newText)}
    />
    <Text 
    style={styles.text}>
      Password
    </Text>
    <TextInput
      style={styles.input}
      id="pass"
      placeholder="Password"
      onChangeText={newText => setPassword(newText)}
      secureTextEntry={true}
    />
    <Link 
    href="/user/forgotPassword">
      Forgot Password
    </Link>
    <TouchableOpacity
      style={styles.button}
      onPress={() => loginUser(email, password)}
    >
      <Text>Login</Text>
    </TouchableOpacity>
  </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#372531',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'black',
    fontFamily: 'sans-serif',
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  input: {
    color: 'black',
    fontFamily: 'sans-serif',
    fontSize: 20,
    borderCurve: 'circular',
    borderColor: 'black',
    borderRadius: 20,
    borderStyle: 'solid',
    textAlign: 'left',
    margin: 10,
  },
  button: {
    backgroundColor: 'indigo',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 30,
    padding: 30,
    margin: 40,
    borderRadius: 20,
},
buttonText: {
  color: 'white',
  fontFamily: 'sans-serif'
},
view: {
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center'
}
}
)