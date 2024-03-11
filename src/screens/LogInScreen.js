import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View} from "react-native";
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


const LogInScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);
  if (!fontLoaded) {
    return null;
  }
  return (
    <View style={{ flex: 1 }}>
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
          placeholderStyle ={{ fontFamily: "karma-semibold"}}
        />
        <TextInput
          style={styles.inputField}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          placeholderTextColor="black"
          secureTextEntry={true}

        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.replace("TabToStack"); // Reaplace with login screen 
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </LinearGradient>
    </View>
  )
}


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
})
export default LogInScreen;