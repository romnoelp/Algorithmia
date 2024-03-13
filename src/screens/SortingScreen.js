import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SvgXml } from "react-native-svg";
import * as Font from "expo-font";
import { SafeAreaView } from "react-native-safe-area-context";
import { SVGTwo } from "../../loadFontSVG";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
  const [data, setData] = useState([
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
  ]);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFieldDropdown, setShowFieldDropdown] = useState(false);
  const [showOrderDropdown, setShowOrderDropdown] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      setShowOrderDropdown(true);
    } else {
      setSortField(field);
      setSortOrder("asc");
      setShowOrderDropdown(true);
    }
    setShowFieldDropdown(false);
  };

  const selectionSort = (array) => {
    const sortedArray = [...array];
    for (let i = 0; i < sortedArray.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < sortedArray.length; j++) {
        const a = sortedArray[j][sortField];
        const b = sortedArray[minIndex][sortField];
        const compareResult = sortOrder === "asc" ? a < b : a > b;
        if (compareResult) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = sortedArray[i];
        sortedArray[i] = sortedArray[minIndex];
        sortedArray[minIndex] = temp;
      }
    }
    return sortedArray;
  };

  const sortedData = selectionSort(data);

  if (!fontLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#EBF7F9", flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "black",
            fontFamily: "karma-bold",
            fontSize: 22,
          }}
        >
          Sorted List
        </Text>

        <SvgXml xml={SVGTwo("black")} width={"30"} height={"30"} />
        <Text
          style={{
            color: "black",
            fontFamily: "karma-regular",
            fontSize: 22,
          }}
        >
          Sort By
        </Text>
        <TouchableOpacity
          onPress={() => setShowFieldDropdown(!showFieldDropdown)}
        >
          <AntDesign name="downcircle" size={24} color="black" />
        </TouchableOpacity>
        {showFieldDropdown && (
          <View style={[styles.dropdown, { backgroundColor: "#EBF7F9" }]}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleSort("name")}
            >
              <Text style={styles.dropdownText}>Name</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleSort("boxes")}
            >
              <Text style={styles.dropdownText}>Boxes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleSort("amount")}
            >
              <Text style={styles.dropdownText}>Amount</Text>
            </TouchableOpacity>
          </View>
        )}
        {showOrderDropdown && (
          <View style={[styles.dropdown, { backgroundColor: "#EBF7F9" }]}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => setSortOrder("asc")}
            >
              <Text style={styles.dropdownText}>Ascending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => setSortOrder("desc")}
            >
              <Text style={styles.dropdownText}>Descending</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: wp("6%"),
          borderRadius: hp("2%"),
          marginVertical: hp("2%"),
          backgroundColor: "#6FD1EB",
          padding: wp("2%"),
          flexDirection: "column",
        }}
      >
        <View style={{ flexDirection: "row", paddingHorizontal: 25 }}>
          <Text style={[styles.columnName, { flex: 2 }]}>Name</Text>
          <Text style={[styles.columnName, { flex: 1 }]}>Boxes</Text>
          <Text style={[styles.columnName, { flex: 1 }]}>Amount</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sortedData}
          renderItem={({ item }) => (
            <View
              style={{
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
              }}
            >
              <Text style={[styles.productInfo, { flex: 2 }]}>{item.name}</Text>
              <Text style={[styles.productInfo, { flex: 1 / 2 }]}>
                {item.boxes}
              </Text>
              <Text
                style={[styles.productInfo, { flex: 1, textAlign: "center" }]}
              >
                {item.amount}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    borderRadius: 20,
    borderWidth: 10,
    borderColor: "#EBF7F9",
    zIndex: 1,
  },
  dropdownItem: {
    backgroundColor: "#6FD1EB",
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
  },
  dropdownText: {
    color: "black",
    fontFamily: "karma-regular",
    fontSize: 16,
    textAlign: "center",
  },
  columnName: {
    fontFamily: "karma-bold",
    marginVertical: hp("1%"),
    fontSize: hp("2%"),
  },
  productInfo: {
    fontFamily: "karma-regular",
    fontSize: wp("3.5%"),
    color: "#09171B",
  },
});

export default SortingScreen;
