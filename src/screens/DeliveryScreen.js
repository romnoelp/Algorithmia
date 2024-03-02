import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGDelivery, loadFont } from "../../loadFontSVG";

const DeliveryScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleSVG}>
        <Text style={styles.headerTitle}>Delivery</Text>
        <SvgXml xml={SVGDelivery} />
      </View>
      <View style={styles.testContainer}>
        <View style={styles.addressRow}>
          <Text style={styles.columnName}>Customer</Text>
          <Text style={styles.columnName}>Address</Text>
          <Text style={styles.columnName}>Distance</Text>
        </View>
      </View>
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF7F9",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleSVG: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: wp("8%"),
  },
  testContainer: {
    height: hp("78%"),
    width: wp("85%"),
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: hp("1.5%"),
    borderRadius: hp("2%"),
    backgroundColor: "#6FD1EB",
  },
  headerTitle: {
    fontFamily: "karma-bold",
    fontSize: 24,
    marginTop: hp("1%"),
    color: "#09171B",
    marginRight: wp("3"),
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
    alignItems: "center",
    width: "100%",
  },
  columnName: {
    flex: 1,
    fontFamily: "karma-regular",
    marginVertical: hp("1%"),
    textAlign: "center",
  },
});
