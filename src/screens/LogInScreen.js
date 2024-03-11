import { StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { loadFont, SVGLogo } from "../../loadFontSVG";
import { SvgXml } from "react-native-svg";
import { CommonActions, useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth, db } from "../../firebaseConfig";
import { Button } from "@rneui/base";

const LogInScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
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
          console.log("error fetching");
        }

        await auth.signInWithEmailAndPassword(userEmail.email, password);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "TabToStack" }],
          })
        );
      } catch (error) {
        if (password < 5) {
          console.log("password must be atleast 5 characters");
        }
        console.log(error.message);
      }
    } else {
      console.log("please complete text fields");
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
          placeholderTextColor="black"
          placeholderStyle={{ fontFamily: "karma-semibold" }}
        />
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry={true}
        />
        <Button
          title={"Log in"}
          titleStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={() => {
            signIn();
          }}
        />
          <View style={styles.signup}>
          <Text style={[styles.nonTouchable]}>Don't have an account yet? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}>
            <Text style={styles.touchable}>Sign in here!</Text>
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
