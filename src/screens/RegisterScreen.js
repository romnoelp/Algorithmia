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
import { Button } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-simple-toast";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { auth, db } from "../../firebaseConfig";

const RegisterScreen = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const distinctUserName = async (userName) => {
    const userNameSnapshot = await db
      .collection("users")
      .where("userName", "==", userName)
      .get();
    return userNameSnapshot.empty;
  };

  const signUp = async () => {
    if (email && userName && confirmPassword) {
      try {
        const isUserNameUnique = await distinctUserName(userName);
        const userCredential = isUserNameUnique
          ? password === confirmPassword
            ? await auth.createUserWithEmailAndPassword(email, confirmPassword)
            : Toast.show(
                "The provided password does not match our records. Please try again.",
                Toast.LONG
              )
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
          navigation.goBack();
          console.log(user.displayName);
          Toast.show("Sign Up Successful", Toast.SHORT);
        }
      } catch (error) {
        if (password.length <= 5) {
          Toast.show("password must be at least 6 characters", Toast.SHORT);
        }
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
          placeholderTextColor="#A9A9A9"
        />
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setUserName(text)}
          value={userName}
          placeholder="Username"
          placeholderTextColor="#A9A9A9"
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
        <View style={styles.inputFieldContainer}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="#A9A9A9"
            />
          </TouchableOpacity>
        </View>
        <Button
          title={"Register"}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => signUp(email, confirmPassword)}
        />
        <View style={styles.signup}>
          <Text style={styles.nonTouchable}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LogInScreen");
            }}
          >
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
    backgroundColor: "#EBF7F9",
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

export default RegisterScreen;
