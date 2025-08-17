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
      <View className='bg-white dark:bg-gray-900 justify-center items-center font-sans text-gray-900 dark:text-white p-4 rounded-lg border-blue-800 dark:border-blue-400 border-2 shadow-lg w-screen max-w-md'>
        <Text className='font-bold text-xl'>Home</Text>
        <TouchableOpacity onPress={() => {
          router.navigate('/user/login');
        }} className='bg-blue-800 dark:bg-blue-400 p-4 rounded-lg mt-4 text-gray-900 dark:text-gray-100 w-fit'>
          <Text className='text-lg text-gray-100 dark:text-gray-900'>Go to Login</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
}
