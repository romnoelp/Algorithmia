import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SVGTwo } from "../../loadFontSVG";
import { AntDesign } from '@expo/vector-icons';

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
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setShowFieldDropdown(false);
    setShowOrderDropdown(false);
  };

  const toggleFieldDropdown = () => {
    setShowFieldDropdown(!showFieldDropdown);
    setShowOrderDropdown(false);
  };

  const toggleOrderDropdown = () => {
    setShowOrderDropdown(!showOrderDropdown);
    setShowFieldDropdown(false);
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

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
        <TouchableOpacity onPress={toggleFieldDropdown}>
          <AntDesign name="downcircle" size={24} color="black" />
        </TouchableOpacity>
        {showFieldDropdown && (
          <View style={[styles.dropdown, { backgroundColor: '#6FD1EB' }]}>
            <TouchableOpacity onPress={() => handleSort('name')}>
              <Text style={styles.dropdownText}>Name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSort('boxes')}>
              <Text style={styles.dropdownText}>Boxes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSort('amount')}>
              <Text style={styles.dropdownText}>Amount</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={toggleOrderDropdown}>
          <AntDesign name="downcircle" size={24} color="black" />
        </TouchableOpacity>
        {showOrderDropdown && (
          <View style={[styles.dropdown, { backgroundColor: '#6FD1EB' }]}>
            <TouchableOpacity onPress={() => setSortOrder('asc')}>
              <Text style={styles.dropdownText}>Ascending</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSortOrder('desc')}>
              <Text style={styles.dropdownText}>Descending</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          backgroundColor: "#6FD1EB",
          flex: 1,
          margin: 20,
          borderRadius: 20,
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row", paddingHorizontal: 25 }}>
          <Text
            style={{
              color: "#09171B",
              flex: 2,
              fontFamily: "karma-semibold",
            }}
          >
            Name
          </Text>
          <Text
            style={{ color: "#09171B", flex: 1, fontFamily: "karma-semibold" }}
          >
            Boxes
          </Text>
          <Text
            style={{
              color: "#09171B",
              fontFamily: "karma-semibold",
            }}
          >
            Amount
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={sortedData}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#10ABD5",
                marginVertical: 5,
                borderRadius: 20,
                padding: 25,
              }}
            >
              <Text
                style={{
                  flex: 3,
                  color: "#09171B",
                  fontFamily: "karma-regular",
                  fontSize: 12,
                  maxWidth: "80%",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  flex: 1,
                  color: "#09171B",
                  fontFamily: "karma-regular",
                  fontSize: 13,
                }}
              >
                {item.boxes}
              </Text>
              <Text
                style={{
                  color: "#09171B",
                  fontFamily: "karma-regular",
                  fontSize: 13,
                  maxWidth: "80%",
                  flex: 1,
                }}
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
    position: 'absolute',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 5,
    zIndex: 1,
    paddingTop: 5,
  },
  dropdownText: {
    fontFamily: 'karma-regular',
    fontSize: 16,
    marginTop: 5,
  },
});

export default SortingScreen;
