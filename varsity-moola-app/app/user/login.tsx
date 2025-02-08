/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
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

import AccountHome from '../account/home';

// App.js


import { Link, router } from 'expo-router';
import { linkTo, navigate } from 'expo-router/build/global-state/routing';






async function validateLogin(username: string, password: string) {
    try {
      const response = await axios.post("http://192.168.18.63:5075/api/Users/Login", 
        {email: username, password: password}, 
        {headers: {"Content-Type": "application/json"}});
      await AsyncStorage.setItem("JwtToken", response.data);
    }
    catch (error) {
      alert("Username or password incorrect")
    }

      

      
}

export default function Login() {

const [text, setText] = useState('');
const [password, setPassword] = useState('');

return (
    <View className='bg-white flex-1 justify-centre align-centre'>
      <Text className='text-black font-serif'>Email</Text>
      <TextInput
        className='border-black rounded-1 border-solid text-black font-serif'
        id="user"
        placeholder="Username"
        onChangeText={newText => setText(newText)}
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
        onPress={() => {
          validateLogin(text, password).then(result => {
          
            
            router.navigate('/account/home');
        })
        .catch(error => {
          Alert.alert('Invalid credentials', 'Invalid email or password')
        })
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
);
}

