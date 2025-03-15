import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import axios from 'axios';

const API_URL = "http://192.168.2.168:8000/api/auth/memberships/";

export default function MembershipScreen({ navigation }) {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setMemberships(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("API Error:", error);
        setError('Failed to fetch memberships');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Loading memberships...</Text></View>;
  }

  if (error) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>{error}</Text></View>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Select a Membership Plan</Text>
      <FlatList
        data={memberships}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 10 }}>
            <Text style={{ fontSize: 16 }}>{item.name} - ${item.price}</Text>
            <Button title="Subscribe" onPress={() => navigation.navigate('Payment', { membershipId: item.id })} />
          </View>
        )}
      />
    </View>
  );
}
