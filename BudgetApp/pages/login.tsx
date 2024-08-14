/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
///import type {PropsWithChildren} from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  TextInput,
} from 'react-native';

import { AuthContext } from 'App';

import { Colors } from 'react-native/Libraries/NewAppScreen';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var useLogin = () => {
  const isAuth = React.useContext(AuthContext);

  return isAuth;
};

function validateLogin(username: string, password: string) {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: username, password: password}),
    })
      .then(response => response.json())
      .then(data => {
        useLogin = ()=> ({
          userKey: data.id,
          name: data.Name,
          surname: data.Surname,
          income: data.Income,
          availableFunds: data.Budget,
        });
      })
      .catch(error => console.log(error));
}

export default function Login() {
  const isDarkMode = useColorScheme() === 'dark';

  const [text, setText] = useState('');
  const [password, setPassword] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <SafeAreaView>
        <ScrollView style={backgroundStyle}>
          <TextInput
            style={{height: 40}}
            id="user"
            placeholder="Username"
            onChangeText={newText => setText(newText)}
          />
          <TextInput
            style={{height: 40}}
            id="pass"
            placeholder="Password"
            onChangeText={newText => setPassword(newText)}
          />
          <Pressable
            onPress={() => {validateLogin(text, password)}}
          >Login</Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
});
