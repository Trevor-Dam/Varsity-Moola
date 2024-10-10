import { Link } from 'expo-router'
import { View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

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

const Stack = createNativeStackNavigator();

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
        <AuthContext.Provider value={auth}>
          <Stack.Screen name="home" component={Home} options={ {headerShown: false } }/>
      </AuthContext.Provider>
    )
}