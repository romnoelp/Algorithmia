import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadFont } from "../../loadFontSVG";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth, db } from "../../src/dbConfig/firebaseConfig.js";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);
  if (!fontLoaded) {
    return null;
  }
  const settingChoices = [
    {
      key: 2,
      name: "Developers",
    },
    {
      key: 3,
      name: "About the app",
    },
    {
      key: 4,
      name: "Log out",
    },
  ];

  const signOut = () => {
    auth.signOut();
    AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "LandingScreen" }],
      })
    );
  };
  const handleChoicesFunctionality = (key) => {
    switch (key) {
      case 1:
        return alert("Appearance");
      case 2:
        navigation.navigate("DevelopersScreen");
        break;
      case 3:
        navigation.navigate("AboutAppScreen");
        break;
      case 4:
        signOut();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: hp("3%"), fontFamily: "karma-bold", marginTop: wp("2%")}}>
        Settings
      </Text>
      <View style={styles.mapContainer}>
        {settingChoices.map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => handleChoicesFunctionality(item.key)}
          >
            <View style={styles.settingContainer} key={item.key}>
              <Text
                style={{
                  marginHorizontal: wp("2%"),
                  fontFamily: "karma-semibold",
                  fontSize: hp("2.5%"),
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: wp("4%"),
  },
  settingContainer: {
    marginVertical: hp("1%"),
    borderBottomColor: "#10ABD5",
    borderBottomWidth: 2,
  },
  mapContainer: { marginTop: hp("3%") },
});

export default SettingsScreen;
