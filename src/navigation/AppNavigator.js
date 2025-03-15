import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
// import DashboardScreen from '../screens/DashboardScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import SubscriptionScreen from '../screens/SubscriptionScreen';

const Stack = createStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* <Stack.Screen name="Dashboard" component={DashboardScreen} /> */}
        {/* <Stack.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Subscription" component={SubscriptionScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
