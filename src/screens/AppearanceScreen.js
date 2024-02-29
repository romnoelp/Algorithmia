import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { SvgXml } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

const settingSVG = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M17.9998 23.25C16.6074 23.25 15.272 22.6969 14.2874 21.7123C13.3029 20.7277 12.7498 19.3924 12.7498 18C12.7498 16.6076 13.3029 15.2723 14.2874 14.2877C15.272 13.3031 16.6074 12.75 17.9998 12.75C19.3921 12.75 20.7275 13.3031 21.7121 14.2877C22.6966 15.2723 23.2498 16.6076 23.2498 18C23.2498 19.3924 22.6966 20.7277 21.7121 21.7123C20.7275 22.6969 19.3921 23.25 17.9998 23.25ZM29.1448 19.455C29.2048 18.975 29.2498 18.495 29.2498 18C29.2498 17.505 29.2048 17.01 29.1448 16.5L32.3098 14.055C32.5948 13.83 32.6698 13.425 32.4898 13.095L29.4898 7.905C29.3098 7.575 28.9048 7.44 28.5748 7.575L24.8398 9.075C24.0598 8.49 23.2498 7.98 22.3048 7.605L21.7498 3.63C21.6898 3.27 21.3748 3 20.9998 3H14.9998C14.6248 3 14.3098 3.27 14.2498 3.63L13.6948 7.605C12.7498 7.98 11.9398 8.49 11.1598 9.075L7.42476 7.575C7.09476 7.44 6.68976 7.575 6.50976 7.905L3.50976 13.095C3.31476 13.425 3.40476 13.83 3.68976 14.055L6.85476 16.5C6.79476 17.01 6.74976 17.505 6.74976 18C6.74976 18.495 6.79476 18.975 6.85476 19.455L3.68976 21.945C3.40476 22.17 3.31476 22.575 3.50976 22.905L6.50976 28.095C6.68976 28.425 7.09476 28.545 7.42476 28.425L11.1598 26.91C11.9398 27.51 12.7498 28.02 13.6948 28.395L14.2498 32.37C14.3098 32.73 14.6248 33 14.9998 33H20.9998C21.3748 33 21.6898 32.73 21.7498 32.37L22.3048 28.395C23.2498 28.005 24.0598 27.51 24.8398 26.91L28.5748 28.425C28.9048 28.545 29.3098 28.425 29.4898 28.095L32.4898 22.905C32.6698 22.575 32.5948 22.17 32.3098 21.945L29.1448 19.455Z" fill="#E6F2F6"/>
  </svg>
  `;
const homeSVG = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 30V21H21V30H28.5V18H33L18 4.5L3 18H7.5V30H15Z" fill="#E6F2F6"/>
  </svg>
  `;

const loadFont = () => {
  return Font.loadAsync({
    "karma-regular": require("../assets/fonts/Karma-Regular.ttf"),
    "karma-light": require("../assets/fonts/Karma-Light.ttf"),
    "karma-bold": require("../assets/fonts/Karma-Bold.ttf"),
    "karma-semibold": require("../assets/fonts/Karma-SemiBold.ttf"),
    "montserrat-regular": require("../assets/fonts/MontserratAlternates-Regular.ttf"),
    "montserrat-light": require("../assets/fonts/MontserratAlternates-Light.ttf"),
    "montserrat-bold": require("../assets/fonts/MontserratAlternates-Bold.ttf"),
    "montserrat-semibold": require("../assets/fonts/MontserratAlternates-SemiBold.ttf"),
  });
};

const getStyles = (darkMode, selectedFont) => {
  const fontStyles = {
    "karma-regular": {
      fontFamily: "karma-regular",
    },
    "karma-light": {
      fontFamily: "karma-light",
    },
    "karma-bold": {
      fontFamily: "karma-bold",
    },
    "karma-semibold": {
      fontFamily: "karma-semibold",
    },
    "montserrat-regular": {
      fontFamily: "montserrat-regular",
    },
    "montserrat-light": {
      fontFamily: "montserrat-light",
    },
    "montserrat-bold": {
      fontFamily: "montserrat-bold",
    },
    "montserrat-semibold": {
      fontFamily: "montserrat-semibold",
    },
  };

  return StyleSheet.create({
    container: {
      flex: 1,
      position: "relative",
    },
    headerLine: {
      position: "absolute",
      top: 70,
      left: 0,
      right: 0,
      height: 3,
      backgroundColor: "#2CC5EF",
    },
    headerText: {
      textAlign: "center",
      color: "#E4F2F6",
      ...(selectedFont.includes("-bold")
        ? { fontFamily: "montserrat-bold" }
        : { fontFamily: "karma-bold" }),
    },
    text: {
      color: "#E4F2F6",
      fontSize: 18,
      ...(fontStyles[selectedFont] || fontStyles["karma-regular"]),
    },
    settingsContainer: {
      position: "absolute",
      top: 15,
      right: 25,
      zIndex: 1,
    },
    homeContainer: {
      position: "absolute",
      top: 15,
      left: 25,
      zIndex: 1,
    },
    appearanceContainer: {
      marginTop: 120,
      marginHorizontal: 30,
      padding: 20,
      borderRadius: 20,
      backgroundColor: "#147691",
      height: 645,
    },
    rowContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 50,
      marginTop: 30,
    },
    toggleButton: {
      width: 50,
      height: 25,
      borderRadius: 25,
      backgroundColor: "#061215",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingHorizontal: 5,
    },
    toggleButtonActive: {
      backgroundColor: "#EBF7F9",
    },
    toggleCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: darkMode ? "#2CC5EF" : "#2CC5EF",
    },
    toggleCircleActive: {
      transform: [{ translateX: 20 }],
    },
    karmaBold: {
      fontFamily: "karma-bold",
      color: "#E4F2F6",
    },
    karmaRegular: {
      fontFamily: "karma-regular",
      color: "#E4F2F6",
      fontSize: 18,
    },
    karmaSemibold: {
      fontFamily: "karma-semibold",
      color: "#E4F2F6",
      fontSize: 18,
    },
    montserratRegular: {
      fontFamily: "monsterrat-regular",
      color: "#E4F2F6",
      fontSize: 18,
    },
    montserratLight: {
      fontFamily: "monsterrat-light",
      color: "#E4F2F6",
      fontSize: 18,
    },
    montserratBold: {
      fontFamily: "monsterrat-bold",
      color: "#E4F2F6",
      fontSize: 18,
    },
    montserratSemibold: {
      fontFamily: "monsterrat-semibold",
      color: "#E4F2F6",
      fontSize: 18,
    },
    pickerContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#061215",
      borderRadius: 20,
      paddingLeft: 10,
      paddingRight: 20,
    },
    pickerItem: {
      fontSize: 16,
      color: "#E4F2F6",
      ...(selectedFont === "karma-regular" && { fontFamily: "karma-regular" }),
      ...(selectedFont === "montserrat-regular" && {
        fontFamily: "montserrat-regular",
      }),
    },
  });
};

const AppearanceScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedFont, setSelectedFont] = useState("karma-regular");

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!fontLoaded) {
    return null;
  }

  const styles = getStyles(darkMode, selectedFont);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#061215", "#061215"]} style={styles.container}>
        <View style={styles.headerLine} />

        <TouchableOpacity
          style={styles.settingsContainer}
          onPress={() => console.log("Settings clicked")}
        >
          <SvgXml xml={settingSVG} width="43" height="43" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeContainer}
          onPress={() => console.log("Home clicked")}
        >
          <SvgXml xml={homeSVG} width="43" height="43" />
        </TouchableOpacity>

        <Text
          style={[styles.headerText, { top: 100, left: -140, fontSize: 28 }]}
        >
          Settings
        </Text>
        <Text style={[styles.headerText, { top: 120, fontSize: 30 }]}>
          Appearance
        </Text>

        <View style={styles.appearanceContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.text}>Dark Mode</Text>
            <TouchableOpacity onPress={toggleDarkMode}>
              <View
                style={[
                  styles.toggleButton,
                  darkMode ? {} : styles.toggleButtonActive,
                ]}
              >
                <View
                  style={[
                    styles.toggleCircle,
                    darkMode ? styles.toggleCircleActive : {},
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.text}>Font</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedFont}
                style={{
                  height: 50,
                  width: 120,
                  color: "#2CC5EF",
                  left: 20,
                  backgroundColor: "transparent",
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedFont(itemValue)
                }
                itemStyle={styles.pickerItem}
                dropdownIconColor={"#2CC5EF"}
              >
                <Picker.Item label="Karma" value="karma-regular" />
                <Picker.Item label="Montserrat" value="montserrat-regular" />
              </Picker>
            </View>
          </View>
        </View>
        <StatusBar backgroundColor="#061215" />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AppearanceScreen;
