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

  // Please don't touch yet, I'm yet to finish the cards for the addressItems (I suggest we start configuring the database)
  // that way we don't have to waste energy and time for setting up cards that are not going to be used anyway. Instead 
  // it'll be more efficient to make cards based off of the rows in the DB 
  return (
    <View style={styles.container}>
      <View style={styles.headerTitleSVG}>
        <Text style={styles.headerTitle}>Delivery</Text>
        <SvgXml xml={SVGDelivery} />
      </View>
      <View style={styles.testContainer}>
        <View style={styles.addressRow}>
          <Text style={styles.columnName}>Customer Name</Text>
          <Text style={styles.columnName}>Address</Text>
          <Text style={styles.columnName}>Distance</Text>
        </View>
      </View>
    </View>
  );
};

// We need to work on the navbar, it needs to be aligned with the left and right most part of the container
// (Look at the Delivery text and the testContainer)

export default DeliveryScreen;

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
  svgContainer: {
    marginLeft: wp("2%"),
  },
  svgIcon: {
    height: hp("28%"),
    width: wp("28%"),
    backgroundColor: "#09171B",
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  columnName: {
    fontFamily: "karma-regular",
    margin: wp("10%"),
  },
});
