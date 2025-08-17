/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
///import type {PropsWithChildren} from 'react';
import { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

//import { useAuthContext } from '../../UserContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import '../global.css';

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
  <View className='flex-1 justify-center items-center bg-white dark:bg-gray-900'>
  <View className='bg-white dark:bg-gray-900 justify-center items-start font-sans text-gray-900 dark:text-white p-4 rounded-2xl border-blue-800 dark:border-blue-400 border-2 shadow-lg w-full max-w-md'>
    <Text className='text-lg text-left'>Email</Text>
    <TextInput
      className='text-lg text-left border-2 border-gray-300 rounded-lg p-2 mb-4 w-11/12'
      id="user"
      placeholder="Email"
      onChangeText={newText => setEmail(newText)}
    />
    <Text 
    className='text-lg'>
      Password
    </Text>
    <TextInput
      className='text-lg text-left border-2 border-gray-300 rounded-lg p-2 mb-4 w-11/12'
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
      className='bg-blue-800 dark:bg-blue-400 p-4 rounded-lg mt-4 text-gray-100 dark:text-gray-900 w-11/12 items-center'
      onPress={() => loginUser(email, password)}
    >
      <Text className='text-lg text-gray-100 dark:text-gray-900'>Login</Text>
    </TouchableOpacity>
  </View>
  </View>
);
}