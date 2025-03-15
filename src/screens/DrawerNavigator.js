import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import DashboardScreen from './DashboardScreen';
import MembershipForm from './MembershipForm';
import ProfileScreen from './ProfileScreen';
import SubscriptionScreen from './SubscriptionScreen';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation, setIsLoggedIn }) {
  return (
    <View style={styles.drawerContainer}>
    {/* Profile */}
    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Profile')}>
      <Ionicons name="person-circle-outline" size={24} color="#007BFF" style={styles.icon} />
      <Text style={styles.drawerText}>Profile</Text>
    </TouchableOpacity>

    {/* Membership */}
    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('MembershipForm')}>
      <Ionicons name="people-outline" size={24} color="#007BFF" style={styles.icon} />
      <Text style={styles.drawerText}>Member Registration</Text>
    </TouchableOpacity>

    {/* Subscription */}
    <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('SubscriptionScreen')}>
      <Ionicons name="people-outline" size={24} color="#007BFF" style={styles.icon} />
      <Text style={styles.drawerText}>Member Subscription</Text>
    </TouchableOpacity>


    {/* Logout */}
    <TouchableOpacity style={[styles.drawerItem, styles.logout]} onPress={() => setIsLoggedIn(false)}>
      <Ionicons name="log-out-outline" size={24} color="red" style={styles.icon} />
      <Text style={[styles.drawerText, { color: 'red' }]}>Logout</Text>
    </TouchableOpacity>
  </View>
  );
}

export default function DrawerNavigator({ setIsLoggedIn }) {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} setIsLoggedIn={setIsLoggedIn} />}>
      {/* <Drawer.Screen name="Dashboard" component={DashboardScreen} /> */}
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="MembershipForm" component={MembershipForm} />
      <Drawer.Screen name="SubscriptionScreen" component={SubscriptionScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  icon: { marginRight: 15 }, // Space between icon and text
  drawerText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  logout: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 10 },
});
