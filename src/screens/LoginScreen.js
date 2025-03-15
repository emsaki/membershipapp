import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API_URL = "http://192.168.111.168:8000/api/auth/login/";

export default function LoginScreen({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getCSRFToken = async () => {
    try {
      const response = await axios.get("http://192.168.111.168:8000/api/auth/csrf/");
      return response.data.csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF Token:", error);
    }
  };

  const handleLogin = async () => {
    const csrfToken = await getCSRFToken();
    try {
      const response = await axios.post(API_URL, { email, password}, {
        headers: {
          "X-CSRFToken": csrfToken,
        } });
      Alert.alert("Success", "Login Successful!");
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert("Login Failed", error.response?.data?.detail || "Invalid credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={setPassword} />
      
      {/* Login Button with full width */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, width: '90%', marginBottom: 10, padding: 10, borderRadius: 5 },
  button: { 
    width: '90%',
    backgroundColor: '#007BFF', 
    padding: 12, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
