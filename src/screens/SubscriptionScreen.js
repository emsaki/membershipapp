import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const USER_CONTRIBUTIONS_URL = "http://192.168.111.168:8000/api/contributions/";
const UNPAID_MONTHS_URL = "http://192.168.111.168:8000/api/contributions/unpaid/";

export default function SubscriptionScreen() {
  const [contributions, setContributions] = useState([]);
  const [unpaidMonths, setUnpaidMonths] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCSRFToken = async () => {
    try {
      const response = await axios.get("http://192.168.111.168:8000/api/auth/csrf/");
      return response.data.csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF Token:", error);
    }
  };

  useEffect(() => {
    fetchContributions();
    fetchUnpaidMonths();
  }, []);

  const fetchContributions = async () => {
    const token = getCSRFToken();
    try {
      const response = await axios.get(USER_CONTRIBUTIONS_URL, {
        headers: { Authorization: `Token token` }
      });
      setContributions(response.data);
    } catch (error) {
      console.error("Error fetching contributions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnpaidMonths = async () => {
    const csrf_token = getCSRFToken();
    try {
      const response = await axios.get(UNPAID_MONTHS_URL, {
        headers: { Authorization: `Token csrf_token` }
      });
      setUnpaidMonths(response.data.unpaid_months);
    } catch (error) {
      console.error("Error fetching unpaid months:", error);
    }
  };

  const handlePayment = (month) => {
    Alert.alert("Payment", `Proceeding with payment for month ${month}`, [
      { text: "OK", onPress: () => console.log("Payment initiated") }
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading subscription...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Member Contributions</Text>

      <Text style={styles.sectionTitle}>Paid Contributions</Text>
      <FlatList
        data={contributions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.contributionItem}>
            <Text>📅 {item.month}/{item.year}</Text>
            <Text>💰 TZS {item.amount}</Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Unpaid Months</Text>
      {unpaidMonths.length === 0 ? (
        <Text>No unpaid months</Text>
      ) : (
        unpaidMonths.map((month) => (
          <Button key={month} title={`Pay for Month ${month}`} color="#28A745" onPress={() => handlePayment(month)} />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  contributionItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});


