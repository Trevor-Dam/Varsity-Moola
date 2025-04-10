import React, { Children } from 'react';

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
      <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.text}>Home</Text>
        <TouchableOpacity onPress={() => {
          router.navigate('/user/login');
        }}>
          <Text>Go to Login</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'indigo',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'indigo',
    fontFamily: 'sans-serif',
    fontSize: 50
  },
  link: {
    color: 'indigo',
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
