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
} from 'react-native';

import { useAuthContext } from '../../UserContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import '../../global.css'

import Dashboard from '../account/dashboard';

// App.js


import { Link, router } from 'expo-router';






function loginUser(username: string, password: string) {
  AsyncStorage.removeItem('JwtToken');
  axios.post("http://192.168.18.63:5075/api/Users/Login", 
    {email: username, password: password}, 
      {headers: {"Content-Type": "application/json"}}).then((successful) => {
        if (successful.status === 200) {
          console.log(successful.data);
          AsyncStorage.setItem('JwtToken', successful.data);
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

export default function Login() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
AsyncStorage.removeItem('JwtToken');

return (
    <View className='bg-white flex-1 justify-centre align-centre'>
      <Text className='text-black font-serif'>Email</Text>
      <TextInput
        className='border-black rounded-1 border-solid text-black font-serif'
        id="user"
        placeholder="Email"
        onChangeText={newText => setEmail(newText)}
      />
      <Text 
      className='text-black font-serif'>
        Password
      </Text>
      <TextInput
        className='border-black rounded-1 border-solid text-black font-serif'
        id="pass"
        placeholder="Password"
        onChangeText={newText => setPassword(newText)}
        secureTextEntry={true}
      />
      <Link 
      className='text-blue'
      href="/user/forgotPassword">
        Forgot Password
      </Link>
      <TouchableOpacity
        className='bg-indigo text-white rounded-10 p-10 m-10'
        onPress={() => loginUser(email, password)}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
);
}

