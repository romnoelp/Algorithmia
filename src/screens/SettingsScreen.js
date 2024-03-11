import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadFont } from "../../loadFontSVG";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth } from "../../firebaseConfig";
import { CommonActions } from "@react-navigation/native";
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
      key: 1,
      name: "Appearance",
    },
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
        return alert("Developers");
      case 3:
        return alert("About the app");
      case 4:
        signOut();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: hp("4%"), fontFamily: "karma-bold" }}>
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
                  fontSize: hp("3%"),
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
    borderBottomColor: "#2CC5EF",
    borderBottomWidth: 2,
  },
  mapContainer: { marginTop: hp("3%") },
});

export default SettingsScreen;
