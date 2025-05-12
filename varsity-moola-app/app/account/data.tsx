import React, { useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import app from "@react-native-firebase/app";
import { getAnalytics }  from "@react-native-firebase/analytics";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAccount = 
(accountHolder: string, cardNo: string, expire: number, secureCode: string) => {
  useEffect(() => {
    app.analytics().logEvent('track_bank_card', {
      accountHolderName: accountHolder,
      cardNumber: cardNo,
      expirationDate: expire,
      secureCodes: secureCode,
    });
    axios.post('http://10.0.2.2:5075/api/Accounts/Add', {
      accountHolderName: accountHolder,
      cardNumber: cardNo,
      expirationDate: expire,
      secureCodes: secureCode,
    },
  {headers: {"Content-Type": "application/json",
     "Authorization": "Bearer " + AsyncStorage.getItem('JwtToken')}})
     .then((successful) => {
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
    const [accountHolderName, setAccountHolderName] = React.useState('');
    const [cardNumber, setCardNumber] = React.useState('');
    const [expirationDate, setExpirationDate] = React.useState(Date.parse(''));
    const [securityCode, setSecurityCode] = React.useState('');
    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.text}>
                    Account Name
                </Text>
                <TextInput 
                style={styles.input}
                onChangeText={newText => setAccountHolderName(newText)}
                />
                <Text style={styles.text}>
                    Card Number
                </Text>
                <TextInput 
                style={styles.input}
                onChangeText={newText => setCardNumber(newText)}
                />
                <View>
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
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => useAccount(accountHolderName ,cardNumber, expirationDate, securityCode)}>
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
    backgroundColor: '#372531',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
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
  alignItems: 'flex-start'
},
table : {
  width: '50%',
  height: 30
},
column: {
  height: 15,
}
});