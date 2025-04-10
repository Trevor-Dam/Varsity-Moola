import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ForgotPassword() {
    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Text>Forgot Password Screen</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'indigo',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      view: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
      }
})