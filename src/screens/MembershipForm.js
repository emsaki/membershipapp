import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const API_URL = "http://192.168.111.168:8000/api/memberships/"; // Change to your Django API endpoint
const USER_INFO_URL = "http://192.168.111.168:8000/api/user/";

export default function MembershipFormScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [root, setRoot] = useState('');
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');

  const getCSRFToken = async () => {
    try {
      const response = await axios.get("http://192.168.111.168:8000/api/auth/csrf/");
      return response.data.csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF Token:", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = await getCSRFToken();
        if (!token) {
          Alert.alert("Error", "User not authenticated");
          return;
        }
      try {
        const response = await axios.get(USER_INFO_URL, {
          headers: { Authorization: `Token ${token}` }
        });

        setUser(response.data); 
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async () => {
    const csrfToken = await getCSRFToken();
    console.log(user);
    if (!user) {
      Alert.alert("Error", "User not logged in");
      return;
    }
    if (!phone || !root || !region || !district) {
      Alert.alert("Error", "Please fill all required fields!");
      return;
    }

    try {
      const response = await axios.post(API_URL, {
        user: user.id,
        phone,
        root,
        region,
        district
      }, {
        headers: {
          "X-CSRFToken": csrfToken,
        }
      });

      Alert.alert("Success", "Registration Successful!", [
        {
          text: "OK",
          onPress: () => navigation.navigate('Profile')
        }
      ]);
    } catch (error) {
      console.error("Error Response:", error.response?.data);
      Alert.alert("Registration Failed", JSON.stringify(error.response?.data, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Membership Form</Text>
      <Text>User: {user ? `${user.first_name} ${user.last_name}` : "Loading..."}</Text>
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" onChangeText={setPhone} />
      <TextInput style={styles.input} placeholder="Root" onChangeText={setRoot} />
      <TextInput style={styles.input} placeholder="Region" onChangeText={setRegion} />
      <TextInput style={styles.input} placeholder="District" onChangeText={setDistrict} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 5 },
});
