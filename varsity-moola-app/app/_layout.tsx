import React from "react";

import { Stack } from 'expo-router'




export default function AppLayout() {
    
    return (  
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="user" />
            </Stack> 
    );
}