import React from "react";
import { Text, View } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TransactionPage() {
    let userData: any;
    const global = useGlobalSearchParams();
    React.useEffect(() => {
        axios.get('http://10.0.2.2:5075/api/Balances/Get', {
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
        <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Transaction History</Text>
                {userData.TransactionHistory.map((transaction: any) => (
                    <View key={transaction.id} style={{ marginVertical: 5 }}>
                        <Text>{transaction.date}: {transaction.amount}</Text>
                    </View>
                ))}
            </View>
    )
}