import React, { useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';

const API_URL = "http://192.168.2.168:8000/api/subscriptions/";

export default function PaymentScreen({ route, navigation }) {
  const { membershipId } = route.params;
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const response = await axios.post(API_URL, {
        user: 1,  // ⚠️ Replace with authenticated user ID
        membership: membershipId,
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0] // Format end_date
      });

      Alert.alert("Success", "Payment Successful!");
      navigation.navigate('Dashboard');
    } catch (error) {
      console.error("Payment Error:", error.response?.data || error.message);
      Alert.alert("Payment Failed", error.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Proceed with Payment</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Button title="Pay Now" onPress={handlePayment} />
      )}
    </View>
  );
}
