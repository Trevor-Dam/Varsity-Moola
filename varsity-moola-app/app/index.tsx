import React, { Children } from 'react'

import Login from './user/login';
import ForgotPassword from './user/forgotPassword';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
// App.js
import '../global.css';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../UserContext';



;

export const authContext = React.createContext(['', {}]);

export default function Home() {
  const [token, setToken] = React.useState('');
    return (
        <ScrollView 
        className='bg-aubergine'>
          <View className='flex-1 justify-centre items-centre'> 
            <Text>Home</Text>
            <Link href={'/user/login'} >Login</Link>
          </View>
        </ScrollView>
    );
}
