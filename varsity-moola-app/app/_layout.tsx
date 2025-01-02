import React from "react";

import Login from "./user/login";
import Home from ".";
import AuthLayout from "./user/login";
import { NavigationContainer } from "@react-navigation/native";

import { Stack } from 'expo-router'




export default function AppLayout() {
    
    return (  
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="login" />
            </Stack> 
    );
}