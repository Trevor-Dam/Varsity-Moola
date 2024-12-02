import React from "react";
import { Stack } from '../_layout'
import Login from "./login";
import ForgotPassword from "./forgotPassword";
import { ScreenStack, ScreenStackHeaderConfig } from "react-native-screens";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function AuthLayout() {
    return (
        <>
            
                <Stack.Screen component={Login} name="login" />
                <Stack.Screen component={ForgotPassword} name="forgotPassword" />
        </>
    )
}