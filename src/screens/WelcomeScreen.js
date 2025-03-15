import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

const slides = [
  { id: 1, text: "Welcome to Membership System", image: require('../assets/slide1.png') },
  { id: 2, text: "Manage Your Subscriptions Easily", image: require('../assets/slide2.png') },
];

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      {/* <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#007BFF" stopOpacity="1" />
            <Stop offset="100%" stopColor="#004080" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg> */}

      {/* Image Slider at the Top */}
      <View style={styles.carouselContainer}>
        <Carousel
          loop
          width={width}
          height={height * 0.5} // Adjust height
          autoPlay
          autoPlayInterval={3000}
          data={slides}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      {/* Buttons at the Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  carouselContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  slide: { alignItems: 'center', justifyContent: 'center', width },
  image: { width: width - 30, height: 300, resizeMode: 'contain' },
  text: { fontSize: 18, fontWeight: 'bold', marginTop: 5, color: '#fff' },

  buttonContainer: { 
    paddingBottom: 40, 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'flex-end' 
  },
  button: { 
    backgroundColor: '#007BFF', 
    padding: 15, 
    width: '90%', 
    borderRadius: 5, 
    alignItems: 'center', 
    marginTop: 10 
  },
  loginButton: { backgroundColor: '#28A745' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
