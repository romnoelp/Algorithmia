import { StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadFont, SVGLogo } from "../../loadFontSVG";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
import { CommonActions, useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));

    const unsubscribe = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");
        if (savedEmail && savedPassword) {
          await auth.signInWithEmailAndPassword(savedEmail, savedPassword);
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: "TabToStack",
                },
              ],
            })
          );
        } 
      } catch (error) {
        Toast.show("Sign in again", Toast.SHORT);
      }
    };
    unsubscribe();
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
        <SvgXml xml={SVGLogo} style={styles.logo} />
        <Text style={styles.title}>Algorithmia</Text>
        <Text style={styles.third}>RP . RB . KL . VS</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("-4%"),
  },
  title: {
    fontFamily: "karma-bold",
    fontSize: hp("3.8%"),
    color: "#EBF7F9",
    bottom: hp("3%"),
  },
  third: {
    fontFamily: "karma-regular",
    color: "#EBF7F9",
    fontSize: wp("3%"),
    textAlign: "center",
    marginHorizontal: wp("7%"),
    top: hp("30%"),
  },
  logo: {
    margin: hp("2%"),
    height: "1%",
    width: "20%",
    bottom: hp("3%"),
  },
});

export default SplashScreen;
