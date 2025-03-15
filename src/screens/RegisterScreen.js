import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API_URL = "http://192.168.111.168:8000/api/auth/registration/";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const getCSRFToken = async () => {
    try {
      const response = await axios.get("http://192.168.111.168:8000/api/auth/csrf/");
      return response.data.csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF Token:", error);
    }
  };

  const handleRegister = async () => {
    const csrfToken = await getCSRFToken();
    if (password1 !== password2) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (!email || !name || !password1 || !password2) {
          Alert.alert("Error", "Please fill all required fields!");
          return;
        }
    
    try {
      response = await axios.post(API_URL, {
        first_name: name.split(" ")[0], // Extract first name
        middle_name: name.split(" ")[1] || "", // Handle missing middle name
        last_name: name.split(" ")[2] || "", // Handle missing last name
        email, 
        password1, 
        password2 
      }, { 
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken } 
      });
  
      Alert.alert("Success", "Registration Successful!");
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Registration Failed", JSON.stringify(error.response?.data, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      {/* <Text>Name:</Text> */}
      <TextInput style={styles.input} placeholder="Your Name" onChangeText={setName} />
      {/* <Text>Email:</Text> */}
      <TextInput style={styles.input} placeholder="Your Email" autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} />
      {/* <Text>Password:</Text> */}
      <TextInput style={styles.input} placeholder="Your Password" secureTextEntry onChangeText={setPassword1} />
      {/* <Text>Confirm Password:</Text> */}
      <TextInput style={styles.input} placeholder="Confirm Your Password" secureTextEntry onChangeText={setPassword2} />
      {/* <Button title="Register" onPress={handleRegister} />
    </View> */}
    {/* Login Button with full width */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
  );
}

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
//   input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
// });
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
