import { View, StyleSheet, Text, FlatList } from "react-native";
import { SvgXml } from "react-native-svg";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SVGTwo } from "../../loadFontSVG";
import { Button } from "@rneui/base";

const loadFont = () => {
  return Font.loadAsync({
    "karma-regular": require("../assets/fonts/Karma-Regular.ttf"),
    "karma-light": require("../assets/fonts/Karma-Light.ttf"),
    "karma-bold": require("../assets/fonts/Karma-Bold.ttf"),
    "karma-semibold": require("../assets/fonts/Karma-SemiBold.ttf"),
  });
};

const SortingScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);
  if (!fontLoaded) {
    return null;
  }

  const data = [
    {
      key: 1,
      name: "YSL Y EDP",
      boxes: 2,
      amount: "7,789",
    },
    {
      key: 2,
      name: "Polo Blue EDT",
      boxes: 20,
      amount: "6,890",
    },
    {
      key: 3,
      name: "Versace Eros Parfum",
      boxes: 7,
      amount: "6,200",
    },
    {
      key: 4,
      name: "Creed Aventus",
      boxes: 2,
      amount: "18,300",
    },
    {
      key: 5,
      name: "D&G The One EDP",
      boxes: 14,
      amount: "8,700",
    },
    {
        key: 6,
        name: "CK One",
        boxes: 20,
        amount: "5,598",
      },
      {
        key: 7,
        name: "Vercase Dylan Blue",
        boxes: 17,
        amount: "6,200",
      },
  ];
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <View
        style={{
          marginHorizontal: 0,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 37.5,
          top: 50,
        }}
      >
        <Text style={{ color: "white", fontFamily: "karma-bold", fontSize: 22, top:5, left:55}}>
          Sorted List
        </Text><View style={{ borderBottomWidth: 3 , borderBottomColor: "#2CC5EF", width: 440, height: 10, top: -30 }} />
        <SvgXml xml={SVGTwo} width={"30"} height={"40"}style={{ position: 'absolute', left: 150}}/>
        <Text style={{ color: "white", fontFamily: "karma-regular", fontSize: 22, top:3, right:150}}>
          Sort By
        </Text>
        <Button
          title={"Name"}
          containerStyle={{ borderRadius: 20, width: 60, height: 30, right: 65 }}
          titleStyle={{ fontSize: 12, fontFamily: "karma-regular"}}
          color={"#147691"}
        />
      </View>
      <View
        style={{
          backgroundColor: "#147691",
          flex: 1,
          margin: 20,
          borderRadius: 20,
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row"}}>
          <Text style={{ color: "white", flex: 1, fontFamily: "karma-semibold", marginLeft: 35}}>Name</Text>
          <Text style={{ color: "white", flex: 1, fontFamily: "karma-semibold" }}>Boxes</Text>
          <Text style={{ color: "white", fontFamily: "karma-semibold", marginRight: 30 }}>Amount</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#2CC5EF",
                marginVertical: 5,
                borderRadius: 20,
                padding: 25,
              }}
            >
              <Text style={{ flex: 1, color: "white", fontFamily: "karma-regular", fontSize: 12}}>{item.name}</Text>
              <Text style={{ flex: 1, color: "white", fontFamily: "karma-regular", fontSize: 13, marginLeft: 27.5}}>{item.boxes}</Text>
              <Text style={{color: "white", fontFamily: "karma-regular", fontSize: 13, marginRight: 20}}>{item.amount}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SortingScreen;