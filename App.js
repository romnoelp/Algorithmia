<<<<<<< Updated upstream
import { StyleSheet } from "react-native";
=======
>>>>>>> Stashed changes
import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/LandingScreen";
import { NavigationContainer } from "@react-navigation/native";
<<<<<<< Updated upstream
import LogInScreen from "./src/LogInScreen";
=======
import LogInScreen from "./src/screens/LogInScreen";
import AppearanceScreen from "./src/screens/AppearanceScreen";
import MainMenuScreen from "./src/screens/MainMenuScreen";
import { homeSVG } from "./loadFontSVG";
import { SvgXml } from "react-native-svg";
import { TouchableOpacity } from "react-native";
>>>>>>> Stashed changes

const Stack = createNativeStackNavigator();
const App = () => (
  <NavigationContainer>
<<<<<<< Updated upstream
    <Stack.Navigator>
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
=======
    <Stack.Navigator initialRouteName="AppearanceScreen">
      <Stack.Screen
        name="AppearanceScreen"
        component={AppearanceScreen}
        options={{
          headerTitle: "",
          headerLeft: () => (
            <View>
              <TouchableOpacity>
                <SvgXml xml={homeSVG} width="43" height="43" />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: "#061215",
            borderBottomWidth: 5,
            borderColor: "#2CC5EF",
          },
        }}
      />

      <Stack.Screen
        name="MainMenu"
        component={MainMenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
>>>>>>> Stashed changes
      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;

const styles = StyleSheet.create({});
