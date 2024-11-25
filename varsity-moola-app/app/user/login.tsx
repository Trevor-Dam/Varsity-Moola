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

import { AuthContext } from '../index';

import { Colors } from 'react-native/Libraries/NewAppScreen';

// App.js

import { NativeWindStyleSheet } from "nativewind";
import { Link } from '@react-navigation/native';

NativeWindStyleSheet.setOutput({
  default: "native",
});


const useAuth = () => {
  const isAuth = React.useContext(AuthContext);

  return isAuth;

};

function validateLogin(username: string, password: string) {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: username, password: password}),
    })
      .then(response => response.json())
      .then(data => {
        useAuth().setAuth({
          userKey: data.Id,
          name: data.Name,
          surname: data.Surname,
          income: data.Income,
          availableFunds: data.availableBalance,
        });
      })
      .catch(error => console.log(error));
}

export default function Login() {

const [text, setText] = useState('');
const [password, setPassword] = useState('');

return (
  <>
    <View className='space-y-6'>
      <Text className='block mb-2 text-lg dark:text-gray-300'>Email</Text>
      <TextInput
        className='border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300'
        id="user"
        placeholder="Username"
        onChangeText={newText => setText(newText)}
      />
      <Text 
      className='block mb-2 text-lg dark:text-gray-300'>
        Password
      </Text>
      <TextInput
        className='border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition transform hover:scale-105 duration-300'
        id="pass"
        placeholder="Password"
        onChangeText={newText => setPassword(newText)}
        secureTextEntry={true}
      />
      <Link 
      className='text-blue-400 text-sm transition hover:underline'
      to={'user/forgotPassword.tsx'}>
        <Text>Forgot Password</Text>
      </Link>
      <TouchableOpacity
        className='w-full p-3 mt-4 text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:scale-105 transition transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        onPress={() => {validateLogin(text, password);}}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  </>
);
}

