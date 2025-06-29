import React, { Children } from 'react';
import './global.css';

import Login from './user/login';
import ForgotPassword from './user/forgotPassword';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
// App.js

function handleLogout() {
  AsyncStorage.removeItem("JwtToken");
}

export default function LandingPage() {
  const navigation = useNavigation();
  handleLogout();
    return (
      <View className='flex-1 justify-center items-center bg-white dark:bg-gray-900'>
      <View className='bg-white dark:bg-gray-900 justify-center items-center font-sans text-gray-900 dark:text-white p-4 rounded-lg border-sky-800 dark:border-sky-500 border-2 shadow-lg'>
        <Text className='font-bold text-xl'>Home</Text>
        <TouchableOpacity onPress={() => {
          router.navigate('/user/login');
        }} className='bg-sky-800 dark:bg-sky-500 p-4 rounded-lg mt-4 text-gray-100 dark:text-gray-900'>
          <Text className='text-lg'>Go to Login</Text>
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
    fontSize: 50,
    fontWeight: 'bold',
    margin: 50,
  },
  link: {
    color: 'blue',
    padding: 50,
    margin: 50,
    textDecorationLine: 'underline'
  },
  view: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
