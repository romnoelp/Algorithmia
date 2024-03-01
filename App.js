import { TouchableOpacity } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/LandingScreen";
import { NavigationContainer } from "@react-navigation/native";
import LogInScreen from "./src/screens/LogInScreen";
import AppearanceScreen from "./src/screens/AppearanceScreen";
import MainMenuScreen from "./src/screens/MainMenuScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WholeSaleScreen from "./src/screens/WholeSaleScreen";
import FinderScreen from "./src/screens/FinderScreen";
import DeliveryScreen from "./src/screens/DeliveryScreen";
import SortingScreen from "./src/screens/SortingScreen";
import { SVGFour, SVGOne, SVGSettings, SVGThree, SVGTwo } from "./loadFontSVG";
import { SvgXml } from "react-native-svg";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => (
  <Tab.Navigator screenOptions={{ tabBarStyle: { backgroundColor: "black" } }}>
    <Tab.Screen
      name="Products"
      component={WholeSaleScreen}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => (
          <SvgXml xml={SVGOne} width={"25"} height={"25"} color={"white"} />
        ),
        tabBarActiveBackgroundColor: "#2CC5EF",
      }}
    />
    <Tab.Screen
      name="List"
      component={SortingScreen}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => (
          <SvgXml xml={SVGTwo} width={"25"} height={"25"} color={"white"} />
        ),
        tabBarActiveBackgroundColor: "#2CC5EF",
      }}
    />
    <Tab.Screen
      name="Delivery"
      component={DeliveryScreen}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => (
          <SvgXml xml={SVGThree} width={"25"} height={"25"} color={"white"} />
        ),
        tabBarActiveBackgroundColor: "#2CC5EF",
      }}
    />
    <Tab.Screen
      name="Finder"
      component={FinderScreen}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: () => (
          <SvgXml xml={SVGFour} width={"25"} height={"25"} color={"white"} />
        ),
        tabBarActiveBackgroundColor: "#2CC5EF",
      }}
    />
  </Tab.Navigator>
);
const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="MainMenuScreen">
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
      <Stack.Screen
        name="MainMenuScreen"
        component={MainMenuScreen}
        options={{
          headerStyle: {
            backgroundColor: "#061215",
          },
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7}>
              <SvgXml xml={SVGSettings} width={"25"} height={"25"} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="AppearanceScreen"
        component={AppearanceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
