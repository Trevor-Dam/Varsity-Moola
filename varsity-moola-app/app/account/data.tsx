import React, { useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import analytics from "@react-native-firebase/analytics";
import { getApp } from "@react-native-firebase/app";
import { getAnalytics } from "@react-native-firebase/analytics";
import axios from "axios";

const useAccount = (cardNo: string, expire: number, secureCode: string, zipCode: string) => {
  useEffect(() => {
    const app = getApp();
    const analytics = getAnalytics(app);
    analytics.logEvent('add_account', {
      cardNumber: cardNo,
      expirationDate: expire,
      secureCodes: secureCode,
      zipCodes: zipCode,
    });
    axios.post('http://10.0.2.2:5075/api/add_account', {
      cardNo: cardNo,
      expirationDate: expire,
      secureCodes: secureCode,
      zipCodes: zipCode,
    },
  {headers: {"Content-Type": "application/json"}}).then((successful) => {
      if (successful.status === 200) {
        console.log("Account added successfully");
        console.log(successful.data);
        return successful.data;
      } else {
        throw new Error("Failed to add account");}
    }
  )}, []);
}

export default function AddAccountPage() {
    const [accountName, setAccountName] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState('');
    const [expirationDate, setExpirationDate] = React.useState(Date.parse(''));
    const [securityCode, setSecurityCode] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.text}>
                    Account Name
                </Text>
                <TextInput 
                style={styles.input}
                onChangeText={newText => setAccountName(newText)}
                />
                <Text style={styles.text}>
                    Card Number
                </Text>
                <TextInput 
                style={styles.input}
                onChangeText={newText => setCardNumber(newText)}
                />
                <Text style={styles.text}>
                    Expiration Date
                </Text>
                <TextInput 
                style={styles.input}
                onChangeText={newText => setExpirationDate(Date.parse(newText))}
                />
                <Text style={styles.text}>
                    Security Code
                </Text>
                <TextInput 
                style={styles.input}
                onChangeText={newText => setSecurityCode(newText)}
                />
                <Text style={styles.text}>
                    Zip Code
                </Text>
                <TextInput 
                style={styles.input}
                onChangeText={newText => setZipCode(newText)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => useAccount(cardNumber, expirationDate, securityCode, zipCode)}>
                    <Text style={styles.buttonText}>
                        Add Account to Wallet
                    </Text>
                </TouchableOpacity>
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
  text: {
    color: 'black',
    fontFamily: 'sans-serif',
    fontSize: 20
  },
  input: {
    color: 'black',
    fontFamily: 'sans-serif',
    fontSize: 20,
    borderCurve: 'circular',
    borderColor: 'black',
    borderRadius: 20,
    borderStyle: 'solid'
  },
  button: {
    backgroundColor: 'indigo',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 30,
    padding: 30,
    margin: 40,
    borderRadius: 20,
},
buttonText: {
  color: 'white',
  fontFamily: 'sans-serif'
},
view: {
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center'
}
});