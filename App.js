import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/LandingScreen";
import { NavigationContainer } from "@react-navigation/native";
import LogInScreen from "./src/screens/LogInScreen";
import MainMenu from "./src/screens/MainMenu";


const Stack = createNativeStackNavigator();
const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainMenu"
        component={MainMenu}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;