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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WholeSaleScreen from "./src/screens/WholeSaleScreen";
import DeliveryScreen from "./src/screens/DeliveryScreen";
import FinderScreen from "./src/screens/FinderScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTab = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Products"
      component={WholeSaleScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Sorted List"
      component={SortingScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Delivery"
      component={DeliveryScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Finder"
      component={FinderScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);
const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="MainMenu">
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainMenu"
        component={MainMenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppearanceScreen"
        component={AppearanceScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
