import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text  } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import * as Font from 'expo-font';
import { SafeAreaView } from "react-native-safe-area-context";


const loadFont = () => {
  return Font.loadAsync({
    "karma-regular": require("../assets/fonts/Karma-Regular.ttf"),
    "karma-light": require("../assets/fonts/Karma-Light.ttf"),
    "karma-bold": require("../assets/fonts/Karma-Bold.ttf"),
    "karma-semibold": require("../assets/fonts/Karma-SemiBold.ttf"),
  });
};

const AppearanceScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#061215", "#061215"]}
        style={styles.container}
      >
        <View style={styles.headerLine} />

        <View style={styles.content}>
          <Text style={styles.text}>Sample text</Text>
        </View>

        <StatusBar hidden />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  headerLine: {
    position: 'absolute',
    top: 90, 
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#2CC5EF", 
  },
  content: {
    marginTop: 100, 
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#E6F2F6',
  }
});

export default AppearanceScreen;
