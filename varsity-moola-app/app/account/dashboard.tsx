import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React from "react";
import { Text, Touchable, TouchableOpacity, View, StyleSheet } from "react-native";

export default function Dashboard() {
    let userData: any;
    React.useEffect(() => {
        axios.get('http://10.0.2.2:5075/api/Accounts/Get', {
            headers: {'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + AsyncStorage.getItem('JwtToken')}})
                .then((response) => {
                    userData = response.data;
                    console.log("User data fetched successfully", userData);
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                })
    }, []);
    return (
        <View>
            <Text style={styles.heading}>Dashboard</Text>
            <Text style={styles.text}>Account Holder: {userData.AccountHolderName}</Text>
            <Text style={styles.text}>Savings Goal: {userData.Target}</Text>
            <TouchableOpacity style={styles.button} 
            onPress={() => router.navigate('/account/[id]', { id: userData.id })}>
                <Text style={styles.heading}>{userData.CardNo}</Text>
                <Text style={styles.buttonText}>{userData.AccountBalance}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 18,
        marginVertical: 10,
    },
    transactionContainer: {
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});