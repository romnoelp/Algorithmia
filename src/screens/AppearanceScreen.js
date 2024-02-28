import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { SvgXml } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { homeSVG, loadFont, SVGSettings } from "../../loadFontSVG";

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
      <LinearGradient colors={["#061215", "#061215"]} style={styles.container}>
        <Text
          style={[
            styles.karmaBold,
            {
              fontSize: 25,
              color: "#E6F2F6",
              position: "absolute",
              top: 110,
              left: 25,
            },
          ]}
        >
          Settings
        </Text>

        <View style={styles.content}></View>

        <StatusBar hidden />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  headerLine: {
    position: "absolute",
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
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#E6F2F6",
  },
  settingsContainer: {
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  settingsContainerRight: {
    alignItems: "center",
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  karmaRegular: {
    fontFamily: "karma-regular",
    color: "#E4F2F6",
    textAlign: "center",
  },
  karmaLight: {
    fontFamily: "karma-light",
    color: "#E4F2F6",
    textAlign: "center",
  },
  karmaBold: {
    fontFamily: "karma-bold",
    color: "#E4F2F6",
    textAlign: "center",
  },
  karmaSemibold: {
    fontFamily: "karma-semibold",
    color: "#E4F2F6",
    textAlign: "center",
  },
});

export default AppearanceScreen;
