import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadFont, SVGLogo } from "../../loadFontSVG";
import { SvgXml } from "react-native-svg";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth, db } from "../../firebaseConfig";
import { Button } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-simple-toast";

const LogInScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const signIn = async () => {
    if (userName && password) {
      try {
        const docRefEmail = await db.collection("users").doc(userName).get();
        let userEmail;
        if (docRefEmail.exists) {
          userEmail = docRefEmail.data();
        } else {
          Toast.show("Error occured try again later", Toast.SHORT);
        }

        await auth.signInWithEmailAndPassword(userEmail.email, password);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "TabToStack" }],
          })
        );
      } catch (error) {
        Toast.show("Error signing in", Toast.SHORT);
      }
    } else {
      Toast.show(
        "Please enter both your email and password to proceed.",
        Toast.LONG
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#2CC5EF", "#147691", "#061215"]}
        style={styles.container}
      >
        <Text style={styles.title}>Algorithmia</Text>
        <SvgXml xml={SVGLogo} style={styles.logo} />
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          placeholder="Username"
          placeholderTextColor="#A9A9A9"
          placeholderStyle={{ fontFamily: "karma-light" }}
        />
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#A9A9A9"
            />
          </TouchableOpacity>
        </View>
        <Button
          title={"Sign in"}
          titleStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={signIn}
        />
        <View style={styles.signup}>
          <Text style={styles.nonTouchable}>Don't have an account yet? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
          >
            <Text style={styles.touchable}>Sign up here!</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: hp("4.5%"),
    color: "#EBF7F9",
  },
  logo: {
    margin: hp("2%"),
    height: "10%",
    width: "20%",
  },
  button: {
    backgroundColor: "#147691",
    paddingHorizontal: hp("4%"),
    paddingVertical: hp("1%"),
    borderRadius: 25,
    marginTop: hp("2%"),
  },
  buttonText: {
    color: "#E6F2F6",
    fontSize: hp("2%"),
    fontFamily: "karma-semibold",
    textAlign: "center",
  },
  inputField: {
    fontFamily: "karma-semibold",
    width: wp("55%"),
    borderWidth: wp("0%"),
    borderColor: "#09171B",
    borderRadius: wp("4%"),
    marginTop: hp("4%"),
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1%"),
    backgroundColor: "white",
    fontSize: wp("4%"),
  },
  inputFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    right: wp("5%"),
    top: hp("5%"),
  },
  nonTouchable: {
    fontFamily: "karma-light",
    color: "#EBF7F9",
    fontSize: hp("1.8%"),
  },
  signup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("8%"),
    fontSize: wp("1%"),
  },
  touchable: {
    fontFamily: "karma-light",
    color: "#6FD1EB",
    fontSize: hp("1.8%"),
  },
});

export default LogInScreen;
