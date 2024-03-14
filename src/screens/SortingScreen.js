import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SvgXml } from "react-native-svg";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { SVGTwo } from "../../loadFontSVG";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useProductContext } from "../../context/ProductContext";

const loadFont = () => {
  return Font.loadAsync({
    "karma-bold": require("../assets/fonts/Karma-Bold.ttf"),
  });
};

const SortingScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [sortField, setSortField] = useState("productName");
  const [sortOrder, setSortOrder] = useState("asc");
  const { products } = useProductContext();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };



  const selectionSort = (array) => {
    const sortedArray = [...array];
    sortedArray.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (valA === undefined || valB === undefined) {
        return 0; 
      }

      if (sortOrder === "asc") {
        if (!isNaN(valA) && !isNaN(valB)) {
          return valA - valB;
        } else {
          return valA.localeCompare(valB);
        }
      } else {
        if (!isNaN(valA) && !isNaN(valB)) {
          return valB - valA;
        } else {
          return valB.localeCompare(valA);
        }
      }
    });
    return sortedArray;
  };

  const sortedData = selectionSort(products);

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#EBF7F9", flex: 1 }}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.headerText}>Sorted List</Text>
          <SvgXml xml={SVGTwo("black")} width={30} height={30} style={styles.svgIcon} />
        </View>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.labelRow}>
          <TouchableOpacity onPress={() => handleSort("productName")} style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Name</Text>
            {sortField === "productName" && (
              <Text>{sortOrder === "asc" ? " ▲" : " ▼"}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort("productWeight")} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Weight</Text>
            {sortField === "productWeight" && (
              <Text>{sortOrder === "asc" ? " ▲" : " ▼"}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSort("productAmount")} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Amount</Text>
            {sortField === "productAmount" && (
              <Text>{sortOrder === "asc" ? " ▲" : " ▼"}</Text>
            )}
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={sortedData}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={[styles.productInfo, { flex: 2 }]}>{item.productName}</Text>
              <Text style={[styles.productInfo, { flex: 1/2 }]}>{item.productWeight}</Text>
              <Text style={[styles.productInfo, { flex: 1, textAlign: "center" }]}>{item.productAmount}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: wp("8%"),
    marginTop: hp("1%"),
    marginRight: wp("8%"),
  },
  headerText: {
    color: "#09171B",
    fontFamily: "karma-bold",
    fontSize: 24,
    marginRight: wp("3%"),
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: wp("6%"),
    borderRadius: hp("2%"),
    marginVertical: hp("2%"),
    backgroundColor: "#6FD1EB",
    padding: wp("2%"),
    flexDirection: "column",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp("2%"),
    marginBottom: hp("1%"),
    marginTop: wp("2%"),
  },
  label: {
    fontFamily: "karma-bold",
    fontSize: hp("2%"),
  },
  item: {
    flexDirection: "row",
    marginBottom: hp("1%"),
    elevation: 2,
    backgroundColor: "#10ABD5",
    borderRadius: wp("4%"),
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("2%"),
    minWidth: wp("40%"),
    height: hp("8%"),
    alignItems: "center",
  },
  productInfo: {
    flex: 1,
    fontFamily: "karma-regular",
    fontSize: wp("3.5%"),
    color: "#09171B",
  },
  button: {
    borderRadius: wp("4%"),
    backgroundColor: "#6FD1EB",
    height: hp("3%"),
    minWidth: wp("12%"),
    fontSize: wp("3.5%"),
    fontFamily: "karma-bold",
    textAlign: "center",
    marginBottom: wp("2%")
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  svgIcon: {
    marginBottom: wp("2%"),
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: wp("80%"),
    backgroundColor: "#EBF7F9",
    borderRadius: 10,
    padding: 20,
  },
});

export default SortingScreen;
