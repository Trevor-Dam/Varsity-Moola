import React from "react";
import { Stack } from 'expo-router'
import Login from "./login";
import ForgotPassword from "./forgotPassword";
import { ScreenStack, ScreenStackHeaderConfig } from "react-native-screens";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" />
            <Stack.Screen name="forgotPassword" />
            <Stack.Screen name="home" />
        </Stack>
    );
}