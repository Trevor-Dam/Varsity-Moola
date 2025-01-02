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
} from 'react-native';

import { useAuthContext } from '../../UserContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import '../../global.css'

// App.js


import { Link } from '@react-navigation/native';






async function validateLogin(username: string, password: string) {
    let result;
    let value;
    try {
      const response = await axios.post("/api/Users/Login", 
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
      className='bg-white flex-1 justify-centre align-centre'>
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
      to={'user/forgotPassword.tsx'}>
        <Text>Forgot Password</Text>
      </Link>
      <TouchableOpacity
        className='bg-aubergine text-white rounded-10 p-10 m-10'
        onPress={() => {validateLogin(text, password);}}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
);
}

