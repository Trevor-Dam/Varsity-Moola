import React, { Children } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './user/login';
import { View, ScrollView } from 'react-native';
import AppLayout from './_layout';
// App.js
import '../global.css';
import { NavigationContainer } from '@react-navigation/native';
import AuthLayout from './user/_layout';
import { AuthContext } from '../UserContext';


export const Stack = createStackNavigator();

const authContext = AuthContext();

export default function Home() {
  const [auth, setAuth] = React.useState({
    userKey: 0,
    name: '',
    surname: '',
    income: 0,
    availableFunds: 0
  });
    return (
        <ScrollView 
        className='bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl'>
          <View className='flex-1 justify-centre items-centre h-full'>   
            <authContext.Provider value={[auth, setAuth]}>
              <NavigationContainer>
                <AuthLayout />
              </NavigationContainer>
            </authContext.Provider> 
          </View>
        </ScrollView>
    );
}
