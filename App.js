import { Appearance, StyleSheet } from "react-native";
import React from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/LandingScreen";
import { NavigationContainer } from "@react-navigation/native";
import LogInScreen from "./src/screens/LogInScreen";
import AppearanceScreen from "./src/screens/AppearanceScreen";
import MainMenuScreen from "./src/screens/MainMenuScreen";
import SortingScreen from "./src/screens/SortingScreen";

const Stack = createNativeStackNavigator();
const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="LandingScreen"> 
      <Stack.Screen
        name="AppearanceScreen"
        component={AppearanceScreen}
        options={{
          headerLeft: () => (
            <View>
              <TouchableOpacity>
                <SvgXml xml={homeSVG} width={"43"} height={"43"} />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#061215",
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

      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
