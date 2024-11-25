import React, { Children } from 'react'

import Login from './user/login';
import { View, ScrollView } from 'react-native';
import AppLayout from './_layout';
// App.js

import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';

NativeWindStyleSheet.setOutput({
  default: "native",
});

type AuthClass = {
  userKey: number
  name: string
  surname: string
  income: number
  availableFunds: number
};

export type AuthContent= {
auth: AuthClass
setAuth(a: AuthClass): void
};
export const AuthContext = React.createContext<AuthContent>({
auth: {
  userKey: 0,
  name: '',
  surname: '',
  income: 0,
  availableFunds: 0
},
setAuth: () => {}
}
);

export default function Home() {
  const [auth, setAuth] = React.useState<AuthContent>({auth: {
    userKey: 0,
    name: '',
    surname: '',
    income: 0,
    availableFunds: 0
  },
  setAuth: () => {}
  });  
    return (
      <>
        <ScrollView 
        className='bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl'>
          <View className='flex-1 justify-centre items-centre h-full'>
          <AuthContext.Provider value={auth}>
              <AppLayout />
            </AuthContext.Provider> 
          </View>
        </ScrollView>
      </>
    );
}