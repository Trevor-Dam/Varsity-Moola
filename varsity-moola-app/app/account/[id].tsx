import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-gifted-charts";

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
        <View style={styles.container}>
            <Text style={styles.heading}>Account Details</Text>
            <Text style={styles.text}>
                Available Balance: {userData.Balance}
            </Text>
            <View>
                <PieChart
                    data={userData.PieChartData.map((item: any) => 
                    ({ name: item.name, value: item.value }))} />
            </View>
                <Text style={styles.heading}>Transaction History</Text>
                {userData.TransactionHistory.map((transaction: any) => (
                    <View key={transaction.id} 
                    style={styles.transactionContainer}>
                        <Text>{transaction.date}: {transaction.amount}</Text>
                    </View>
                ))}
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#372531',
        marginTop: 20,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        color: 'white',
        fontSize: 18,
        marginVertical: 10,
    },
    transactionContainer: {
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    }
});