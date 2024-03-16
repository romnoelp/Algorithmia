import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AboutAppScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerTitleSVG}>
        <Text style={styles.headerTitle}>About the app</Text>
      </View>
      <View style={styles.testContainer}>
        <Text style={styles.productText}>
          {"\t\t\t"}This application serves as the group’s project that will be
          passed and presented to our professor, Mary Jane Lima. The said
          application took a lot of consideration and designing, specifically
          with the prototyping of the UI/UX aspect of it. Algorithmia is a
          playground that is presented with the use of a Graphical User
          Interface and is composed of 4 main concepts namely: Knapsack,
          Selection Sorting, TSP, and String Matching. This is the culmination
          of the lessons that was taught to the students comprising the said
          group by Professor Lima.
        </Text>
      </View>
    </View>
  );
};

export default AboutAppScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF7F9",
  },
  headerTitleSVG: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 20,
  },
  headerTitle: {
    fontFamily: "karma-bold",
    fontSize: 24,
    marginTop: 5,
    color: "#09171B",
  },
  testContainer: {
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    backgroundColor: "#6FD1EB",
    padding: 10,
    flexDirection: "column",
    marginBottom: hp("4"),
  },
  productText: {
    fontFamily: "karma-regular",
    fontSize: wp("4%"),
    color: "#09171B",
    marginBottom: 10,
    textAlign: "justify",
    margin: wp("2%"),
  },
});
