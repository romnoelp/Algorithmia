import { StatusBar, Image } from "react-native";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

const loadFont = () => {
  return Font.loadAsync({
    "karma-regular": require("../assets/fonts/Karma-Regular.ttf"),
    "karma-light": require("../assets/fonts/Karma-Light.ttf"),
    "karma-bold": require("../assets/fonts/Karma-Bold.ttf"),
    "karma-semibold": require("../assets/fonts/Karma-SemiBold.ttf"),
  });
};

const DevelopersScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const developersData = [
    { name: "Petracorta, Romnoel", language: "Python, C#", position: "UI/UX Designer" },
    { name: "Baltazar, Richmond", language: "Java, Typescript", position: "Lead Programmer" },
    { name: "Lisboa, Kevin", language: "Java", position: "Programmer" },
    { name: "Sevilla, Vince", language: "Java", position: "Programmer" },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={["#061215", "#061215"]} style={styles.container}>
          <View style={styles.headerLine} />

          <Text style={[styles.headerText, { top: 20, left: -140, fontSize: 24 }]}>
            Settings
          </Text>
          <Text style={[styles.headerText, { top: 50, fontSize: 24, marginBottom: 5 }]}>
            Developers
          </Text>

          <ScrollView style={styles.appearanceContainer}>
            {developersData.map((developer, index) => (
              <View key={index} style={styles.developerContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {developer.name === "Petracorta, Romnoel" && (
                    <Image
                      source={require("../assets/devImages/Rom.jpg")}
                      style={{ width: 100, height: 100, borderRadius: 20, margin: 10 }}
                    />
                  )}
                  {developer.name === "Baltazar, Richmond" && (
                    <Image
                      source={require("../assets/devImages/Rich.jpg")}
                      style={{ width: 100, height: 100, borderRadius: 20, margin: 10 }}
                    />
                  )}
                  {developer.name === "Lisboa, Kevin" && (
                    <Image
                      source={require("../assets/devImages/Kevs.jpg")}
                      style={{ width: 100, height: 100, borderRadius: 20, margin: 10 }}
                    />
                  )}
                  {developer.name === "Sevilla, Vince" && (
                    <Image
                      source={require("../assets/devImages/Bins.jpg")}
                      style={{ width: 100, height: 100, borderRadius: 20, margin: 10 }}
                    />
                  )}
                  
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.developerDetails}>
                      Name: {developer.name}
                    </Text>
                    <Text style={styles.developerDetails}>
                      Language: {developer.language}
                    </Text>
                    <Text style={styles.developerDetails}>
                      Position: {developer.position}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <StatusBar backgroundColor="#061215" />
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  headerLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#2CC5EF",
  },
  headerText: {
    textAlign: "center",
    color: "#E4F2F6",
    fontFamily: "karma-semibold",
  },
  appearanceContainer: {
    marginTop: 50,
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#147691",
    marginBottom: 25
  },
  developerContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#8CD4E8",
    borderRadius: 20,
  },
  developerDetails: {
    fontSize: 12,
    fontFamily: "karma-regular",
    padding: 2.5
  },
});

export default DevelopersScreen;
