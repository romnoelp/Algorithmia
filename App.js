import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
// import SVGImg from './assets/logo.svg';

const loadFont = () => {
  return Font.loadAsync({
    'karma-regular': require('./assets/fonts/Karma-Regular.ttf'),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null; // Show warning or something if font didn't load 
  }

  return (
    <LinearGradient
      colors={['#2CC5EF', '#147691', '#061215']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.karmaRegular}>Algorithmia</Text>
        <Text style={styles.karmaBold}>Discover your inner analytics with Algorithmia</Text>
        <Text style={styles.karmaRegular}>Knapsack, Selection Sorting, TSP, and String Matching - Your playground awaits!</Text>
        {/* <SVGImg width={200} height={200} /> */}
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  karmaRegular: {
    fontFamily: 'karma-regular',
    fontSize: 24, 
    marginBottom: 10,
    color: '#E4F2F6',
  },
  karmaBold: {
    fontFamily: 'karma-medium',
    fontSize: 20,
    marginBottom: 10,
    color: '#E4F2F6',
  }
});
