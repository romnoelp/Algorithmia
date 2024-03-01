import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";

const loadFont = async () => {
  await Font.loadAsync({
    "karma-regular": require("../assets/fonts/Karma-Regular.ttf"),
    "karma-light": require("../assets/fonts/Karma-Light.ttf"),
    "karma-bold": require("../assets/fonts/Karma-Bold.ttf"),
    "karma-semibold": require("../assets/fonts/Karma-SemiBold.ttf"),
  });
};

const SettingsScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await loadFont();
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  const clickableNames = ["Appearance", "Developers", "About the app"];
  const nonClickableName = "Settings";

  const handleNameClick = (name) => {
    alert("namo jeri");
  };

  return (
    <SafeAreaView style={styles.container}>
      {fontLoaded && (
        <View>
          <View style={styles.headerLine} />
          <Text style={styles.nonClickable}>{nonClickableName}</Text>
          {clickableNames.map((name, index) => (
            <React.Fragment key={index}>
              <TouchableOpacity onPress={() => handleNameClick(name)}>
                <Text style={styles.clickable}>{name}</Text>
              </TouchableOpacity>
              {index < clickableNames.length - 1 && (
                <View style={styles.separator} />
              )}
            </React.Fragment>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nonClickable: {
    padding: 20,
    fontSize: 24,
    fontFamily: "karma-bold",
  },
  clickable: {
    padding: 20,
    fontSize: 24,
    fontFamily: "karma-bold",
  },
  headerLine: {
    borderBottomWidth: 5,
    borderBottomColor: "#2CC5EF",
  },
  separator: {
    borderBottomWidth: 3,
    borderBottomColor: "#2CC5EF",
    marginLeft: 20, 
    marginRight: 20, 
    borderRadius: 20
  },
});

export default SettingsScreen;
