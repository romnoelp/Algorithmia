import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity } from "react-native";
import { loadFont, SVGLogo } from "../../loadFontSVG";

const LandingScreen = ({ navigation }) => {
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
        colors={["#2CC5EF", "#147691", "#061215"]}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text
            style={[
              styles.karmaBold,
              { fontSize: 45, padding: 30, marginBottom: 50, marginTop: -40 },
            ]}
          >
            Algorithmia
          </Text>

          <View style={{ padding: 10, marginBottom: 30, marginTop: -30 }}>
            <SvgXml xml={SVGLogo} width="180" height="150" />
          </View>

          <Text
            style={[
              styles.karmaSemibold,
              { fontSize: 25, paddingTop: 20, marginBottom: 40 },
            ]}
          >
            Discover your inner analytics with {"\n"}Algorithmia
          </Text>

          <Text style={[styles.karmaLight, { fontSize: 20, marginBottom: 40 }]}>
            Knapsack, Selection Sorting, TSP, and String {"\n"}
            Matching - Your playground awaits!
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.replace("TabToStack"); //change to LogInScreen later
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Text style={[styles.karmaLight, { fontSize: 15 }]}>
              Don't have an account yet?{" "}
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{
                  color: "#8CD4E8",
                  fontFamily: "karma-light",
                  marginLeft: 5,
                  fontSize: 15,
                }}
              >
                Sign up here!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  button: {
    backgroundColor: "#147691",
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 20,
    marginBottom: 50,
  },
  buttonText: {
    color: "#E6F2F6",
    fontSize: 20,
    fontFamily: "karma-semibold",
    textAlign: "center",
  },
});

export default LandingScreen;
