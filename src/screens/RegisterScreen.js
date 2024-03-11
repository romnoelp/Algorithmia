import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { loadFont, SVGLogo } from "../../loadFontSVG";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth, db } from "../../firebaseConfig";
import { Button } from "@rneui/base";
import Toast from 'react-native-simple-toast';

const RegisterScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const distinctUserName = async (userName) => {
    const userNameSnapshot = await db
      .collection("users")
      .where("username", "==", userName)
      .get();
    return !userNameSnapshot.empty;
  };

  const signUp = async () => {
    if (email && userName && confirmPassword) {
      try {
        const userNameExist = await distinctUserName(userName);
        const userCredential = userNameExist
          ? password === confirmPassword
            ? await auth.createUserWithEmailAndPassword(email, confirmPassword)
            : Toast.show("The provided password does not match our records. Please try again.", Toast.LONG)
          : Toast.show("Username already taken.", Toast.LONG);

        const user = userCredential?.user;
        if (user) {
          await user.updateProfile({
            displayName: userName,
          });

          await db.collection("users").doc(user.displayName).set({
            userName: user.displayName,
            email,
          });
          navigation.replace("LogInScreen");
          console.log(user.displayName);
          Toast.show("success", Toast.SHORT);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Toast.show("Please complete all required fields.", Toast.BOTTOM);
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
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          placeholderTextColor="black"
          placeholderStyle={{ fontFamily: "karma-semibold" }}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          placeholder="Username"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="black"
          secureTextEntry={true}
        />
        <Button
          title={"Register"}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => signUp(email, confirmPassword)}
        />
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
    fontFamily: "karma-light",
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
    marginTop: hp("3%"),
  },
  buttonText: {
    color: "#E6F2F6",
    fontSize: hp("2%"),
    fontFamily: "karma-semibold",
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
});
export default RegisterScreen;
