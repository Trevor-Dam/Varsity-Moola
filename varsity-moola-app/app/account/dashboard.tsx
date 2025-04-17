import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";

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
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Dashboard</Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>Account Holder: {userData.AccountHolderName}</Text>
            <Text style={{ fontSize: 18, marginVertical: 10 }}>Savings Goal: {userData.Target}</Text>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }} 
            onPress={() => router.navigate('/account/[id]', { id: userData.id })}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userData.CardNo}</Text>
                <Text style={{ fontSize: 16 }}>{userData.AccountBalance}</Text>
            </TouchableOpacity>
        </View>
    )
}