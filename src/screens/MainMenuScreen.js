import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import { StatusBar } from "expo-status-bar";
import {
  SVGLogo,
  SVGSettings,
  SVGOne,
  SVGTwo,
  SVGThree,
  SVGFour,
  loadFont,
} from "../../loadFontSVG";

const MainMenuScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);
  if (!fontLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <TouchableOpacity>
        <View style={styles.logoContainer}>
          <SvgXml xml={SVGLogo} width="43" height="43" />
        </View>
      </TouchableOpacity>
      <View style={styles.settingsContainer}>
        <SvgXml xml={SVGSettings("white")} width="43" height="43" />
      </View>
      <View style={styles.container}>
        <View style={styles.headerLine} />
        <StatusBar hidden />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>What to do?</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MainTab", { screen: "Products" })
            }
            style={styles.square}
            activeOpacity={0.7}
          >
            <View style={styles.squareShapeView}>
              <SvgXml xml={SVGOne("white")} width="76" height="76" />
            </View>
            <Text style={styles.title}>Wholesale</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MainTab", { screen: "List" })}
            style={styles.square}
            activeOpacity={0.7}
          >
            <View style={styles.squareShapeView}>
              <SvgXml xml={SVGTwo("white")} width="90" height="90" />
            </View>
            <Text style={styles.title}>Sort Items</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MainTab", { screen: "Delivery" })
            }
            style={styles.square}
            activeOpacity={0.7}
          >
            <View style={styles.squareShapeView}>
              <SvgXml xml={SVGThree("white")} width="76" height="76" />
            </View>
            <Text style={styles.title}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MainTab", { screen: "Finder" })}
            style={styles.square}
            activeOpacity={0.7}
          >
            <View style={styles.squareShapeView}>
              <SvgXml xml={SVGFour("white")} width="90" height="90" />
            </View>
            <Text style={styles.title}>Word Finder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 0,
    right: 350,
    zIndex: 1,
    paddingTop: 10,
  },
  settingsContainer: {
    alignItems: "center",
    position: "absolute",
    top: 20,
    left: 350,
    right: 0,
    zIndex: 1,
    paddingTop: 10,
  },
  sectionContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "karma-semibold",
    color: "black",
    fontSize: 24,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  square: {
    alignItems: "center",
    flex: 1,
  },
  squareShapeView: {
    width: 159,
    height: 142,
    borderRadius: 20,
    backgroundColor: "#147691",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "karma-regular",
    color: "black",
    fontSize: 14,
    marginTop: 10,
  },
});

export default MainMenuScreen;
