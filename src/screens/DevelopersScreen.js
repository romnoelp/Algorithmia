import { StatusBar, Image, FlatList } from "react-native";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadFont } from "../../loadFontSVG";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DevelopersScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const developersData = [
    {
      name: "Petracorta, Romnoel",
      language: "Python, C#",
      position: "UI/UX Designer/Programmer",
    },
    {
      name: "Baltazar, Richmond",
      language: "JavaScript, Typescript",
      position: "Lead Programmer",
    },
    { name: "Lisboa, Kevin Ros", language: "Java", position: "Programmer" },
    { name: "Sevilla, Vince", language: "Java", position: "Programmer" },
  ];

  const programmerSeparatorPicture = (item) => {
    switch (item.name) {
      case "Petracorta, Romnoel":
        return (
          <Image
            source={require("../assets/devImages/Rom.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              margin: 10,
            }}
          />
        );
      case "Baltazar, Richmond":
        return (
          <Image
            source={require("../assets/devImages/Rich.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              margin: 10,
            }}
          />
        );
      case "Lisboa, Kevin Ros":
        return (
          <Image
            source={require("../assets/devImages/Kevs.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              margin: 10,
            }}
          />
        );
      case "Sevilla, Vince":
        return (
          <Image
            source={require("../assets/devImages/Bins.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              margin: 10,
            }}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerLine} />
      <View style={{ marginHorizontal: wp("2%"), flex: 1 }}>
        <Text
          style={[
            styles.headerText,
            { fontSize: hp("3%"), marginLeft: wp("3%") },
          ]}
        >
          Settings
        </Text>
        <Text
          style={[
            styles.headerText,
            { fontSize: hp("3%"), textAlign: "center" },
          ]}
        >
          Developers
        </Text>

        <View style={styles.appearanceContainer}>
          <FlatList
            data={developersData}
            renderItem={({ item }) => (
              <View style={styles.developerContainer}>
                <View>{programmerSeparatorPicture(item)}</View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.developerDetails,
                      { fontFamily: "karma-bold" },
                    ]}
                  >
                    Name:
                  </Text>
                  <Text style={styles.developerDetails}>{item.name}</Text>

                  <Text
                    style={[
                      styles.developerDetails,
                      { fontFamily: "karma-bold" },
                    ]}
                  >
                    Preferred Language:
                  </Text>
                  <Text style={styles.developerDetails}>{item.language}</Text>

                  <Text
                    style={[
                      styles.developerDetails,
                      { fontFamily: "karma-bold" },
                    ]}
                  >
                    Team Position:
                  </Text>
                  <Text style={styles.developerDetails}>{item.position}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerLine: {
    height: 3,
    backgroundColor: "#2CC5EF",
  },
  headerText: {
    fontFamily: "karma-semibold",
  },
  appearanceContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#6FD1EB",
    marginBottom: hp("12%"),
  },
  developerContainer: {
    flexDirection: "row",
    marginVertical: hp("1%"),
    padding: 10,
    backgroundColor: "#10ABD5",
    borderRadius: 10,
    alignItems: "center",
  },
  developerDetails: {
    fontSize: 12,
    fontFamily: "karma-regular",
    padding: 2.5,
  },
});

export default DevelopersScreen;
