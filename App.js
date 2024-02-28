import React from "react";
import { TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LogInScreen from "./src/screens/LogInScreen";
import AppearanceScreen from "./src/screens/AppearanceScreen";
import MainMenuScreen from "./src/screens/MainMenuScreen";
import { SvgXml } from "react-native-svg";
import { homeSVG } from "./loadFontSVG";

const Stack = createNativeStackNavigator();
const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="AppearanceScreen">
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
        name="LogInScreen"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
