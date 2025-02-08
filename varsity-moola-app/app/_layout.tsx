import React from "react";

import { Stack } from 'expo-router'
import { ScreenStackHeaderCenterView } from "react-native-screens";




export default function AppLayout() {
    
    return (  
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="user" />
            </Stack> 
    );
}