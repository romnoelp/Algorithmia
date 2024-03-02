import { View, StyleSheet, Text, FlatList } from "react-native";
import { SvgXml } from "react-native-svg";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SVGFour, loadFont } from "../../loadFontSVG";

const FinderScreen = () => {
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
      name: "Elden Lord, Godfrey",
      boxes: "Lands Between",
      amount: "300",
    },
    {
      key: 2,
      name: "Legolas, Russian",
      boxes: "Serbia, Russia",
      amount: "600",
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
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTitleSVG}>
        <Text style={styles.headerTitle}>Finder</Text>
        <SvgXml xml={SVGFour("black")} width={30} height={30} style={{alignSelf: "center"}} />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.addressRow}>
          <Text style={styles.columnName}>Customer{"\n"}Name</Text>
          <Text style={styles.columnName}>Address</Text>
          <Text style={styles.columnName}>Distance</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <View
              style={styles.dataContainer}>
              <Text
                style={styles.customerValue}>
                {item.name}
              </Text>
              <Text
                style={styles.addressValue}>{item.boxes}</Text>
              <Text style={styles.distanceValue}>{item.amount}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleSVG: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: wp("8%"),
  },
  mainContainer: {
    height: hp("78%"),
    width: wp("85%"),
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: hp("1.5%"),
    borderRadius: hp("2%"),
    backgroundColor: "#147691",
    paddingHorizontal: wp("3%"),
  },
  headerTitle: {
    fontFamily: "karma-bold",
    fontSize: 24,
    color: "#09171B",
    marginRight: wp("3"),
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.1)",
    paddingVertical: hp("1%"),
  },
  columnName: {
    fontFamily: "karma-regular",
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    color: "white",
  },
  customerValue: {
    flex: 3,
    color: "white",
    fontFamily: "karma-regular",
    fontSize: 13,
    maxWidth: 89,
    flexWrap: "wrap",
  },
  addressValue:{
    color: "white",
    flex: 1,
    marginLeft: 20,
    fontFamily: "karma-regular",
    fontSize: 13,
    flexWrap: "wrap",
    textAlign: "center",
  },
  distanceValue:{
    color: "white",
    flex: 1,
    fontFamily: "karma-regular",
    fontSize: 13,
    marginStart: 15,
    marginLeft: 25,
    marginEnd: 1, 
    flexWrap: "wrap",
    textAlign: "center",
  },
  dataContainer:{
    backgroundColor: "#2CC5EF",
    flexDirection: "row",
    marginVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    width: 326,
    height: 79,
    alignItems:"center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  }
});

export default FinderScreen;
