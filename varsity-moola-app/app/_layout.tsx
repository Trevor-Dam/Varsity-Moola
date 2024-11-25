import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from "./user/login";
import AuthLayout from "./user/_layout";



export const Stack = createNativeStackNavigator()

export default function AppLayout() {
    
    return (
        <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen component={AuthLayout} name="user" />
            </Stack.Navigator>   
        </>
    )
}