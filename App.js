import { TouchableOpacity } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./src/screens/LandingScreen";
import { NavigationContainer } from "@react-navigation/native";
import LogInScreen from "./src/screens/LogInScreen";
import MainMenuScreen from "./src/screens/MainMenuScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WholeSaleScreen from "./src/screens/WholeSaleScreen";
import FinderScreen from "./src/screens/FinderScreen";
import DeliveryScreen from "./src/screens/DeliveryScreen";
import SortingScreen from "./src/screens/SortingScreen";
import {
  SVGFour,
  SVGLogo,
  SVGOne,
  SVGSettings,
  SVGThree,
  SVGTwo,
  SVGHome,
} from "./loadFontSVG";
import { SvgXml } from "react-native-svg";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOptionsForBottomTab = (svgLeft, svgRight, icon) => ({
  headerStyle: {
    backgroundColor: "#147691",
    borderBottomColor: "#2CC5EF",
    borderBottomWidth: 5,
  },
  headerTitle: "",
  headerRight: () => (
    <TouchableOpacity activeOpacity={0.7}>
      <SvgXml
        xml={svgRight("white")}
        width={"25"}
        height={"25"}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  ),
  headerLeft: () => (
    <TouchableOpacity activeOpacity={0.7}>
      <SvgXml
        xml={svgLeft("white")}
        width={"25"}
        height={"25"}
        style={{ marginLeft: 10 }}
      />
    </TouchableOpacity>
  ),
  tabBarIcon: () => <SvgXml xml={icon("black")} width={"25"} height={"25"} />,
  tabBarShowLabel: false,
  tabBarActiveBackgroundColor: "#2CC5EF",
});

const MainTab = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "#f5f5f5",
      },
    }}
  >
    <Tab.Screen
      name="Products"
      component={WholeSaleScreen}
      options={headerOptionsForBottomTab(SVGHome, SVGSettings, SVGOne)}
    />
    <Tab.Screen
      name="List"
      component={SortingScreen}
      options={headerOptionsForBottomTab(SVGHome, SVGSettings, SVGTwo)}
    />
    <Tab.Screen
      name="Delivery"
      component={DeliveryScreen}
      options={headerOptionsForBottomTab(SVGHome, SVGSettings, SVGThree)}
    />
    <Tab.Screen
      name="Finder"
      component={FinderScreen}
      options={headerOptionsForBottomTab(SVGHome, SVGSettings, SVGFour)}
    />
  </Tab.Navigator>
);
const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="LandingScreen">
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
            backgroundColor: "#147691",
          },
          headerTitle: "",
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7}>
              <SvgXml xml={SVGSettings("white")} width={"25"} height={"25"} />
            </TouchableOpacity>
          ),
          headerLeft: () => <SvgXml xml={SVGLogo} width={"25"} height={"25"} />,
        }}
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
