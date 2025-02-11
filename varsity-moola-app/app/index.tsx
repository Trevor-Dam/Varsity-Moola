import React, { Children } from 'react';

import Login from './user/login';
import ForgotPassword from './user/forgotPassword';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
// App.js
import '../global.css';

function handleLogout() {
  AsyncStorage.removeItem("JwtToken");
}

export default function Home() {
  handleLogout();
    return (
        <ScrollView className='bg-indigo'>
            <Text>Home</Text>
            <Link href={'/user/login'} >Login</Link>
        </ScrollView>
    );
}
