import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const USER_INFO_URL = "http://192.168.111.168:8000/api/user/";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCSRFToken = async () => {
    try {
      const response = await axios.get("http://192.168.111.168:8000/api/auth/csrf/");
      return response.data.csrfToken;
    } catch (error) {
      console.error("Error fetching CSRF Token:", error);
    }
  };

  const fetchUserDetails = async () => {
    const csrfToken = await getCSRFToken();
    try {
      const response = await axios.get(USER_INFO_URL, {
        headers: { Authorization: csrfToken }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
      Alert.alert("Error", "Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Not Available";
    return moment(dateString).format("DD MMM YYYY");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Badge with Left-Aligned Avatar */}
      <View style={styles.profileBadge}>
        <Image source={require('../../assets/user-icon.png')} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {user 
                ? `${user.first_name} ${user.middle_name || ''} ${user.last_name}`.toUpperCase() 
                : "USER"}
          </Text>
        </View>
      </View>

      {/* Profile Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.title}>Member Information </Text>   
        </View>
        <View style={styles.divider} />       

        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={20} color="#007BFF" style={styles.icon} />
          <Text style={styles.label}>Joined</Text>
          <Text style={styles.info}>{formatDate(user?.date_joined)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailItem}>
          <Ionicons name="mail-outline" size={20} color="#007BFF" style={styles.icon} />
          <Text style={styles.label}>Email</Text>
          <Text style={styles.info}>{user?.email || "No Email"}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailItem}>
          <Ionicons name="call-outline" size={20} color="#007BFF" style={styles.icon} />
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.info}>{user?.membership?.phone || "No Phone"}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={20} color="#007BFF" style={styles.icon} />
          <Text style={styles.label}>Root</Text>
          <Text style={styles.info}>{user?.membership?.root || "No Root"}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailItem}>
          <Ionicons name="business-outline" size={20} color="#007BFF" style={styles.icon} />
          <Text style={styles.label}>Region</Text>
          <Text style={styles.info}>{user?.membership?.region || "No Region"}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailItem}>
          <Ionicons name="home-outline" size={20} color="#007BFF" style={styles.icon} />
          <Text style={styles.label}>District</Text>
          <Text style={styles.info}>{user?.membership?.district || "No District"}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailItem}>
          <Ionicons name="checkmark-circle-outline" size={20} color="green" style={styles.icon} />
          <Text style={styles.label}>Status</Text>
          <Text style={styles.info}>{user?.membership?.district || "No Status"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', alignItems: 'center', paddingTop: 10 },

  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    width: '95%',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  avatar: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },

  nameContainer: { flex: 1, justifyContent: 'center' }, 
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  // Profile Details
  detailsContainer: {
    backgroundColor: '#fff',
    width: '95%',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  label: { fontSize: 16, fontWeight: 'bold', color: '#555', flex: 1 },
  info: { fontSize: 18, color: '#333', textAlign: 'right' },
});