import React from "react";

import LandingPage from ".";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./user/login";
import ForgotPassword from "./user/forgotPassword";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";


export default function AppLayout() {
    
    return ( 
        
        <Stack screenOptions={{headerShown: false}} initialRouteName="index">
            
            <Stack.Screen name="index" />
            <Stack.Screen name="login"  />
            <Stack.Screen name="forgotPassword" />
            
            <Stack.Screen name="dashboard" />
        </Stack>
                 
    );
}