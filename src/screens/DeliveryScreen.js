import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { SvgXml, err } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGDelivery, loadFont } from "../../loadFontSVG";
import axios from "axios";
import * as geolib from "geolib";

const DeliveryScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerDistance, setDistance] = useState("");
  const [testKey, setTestKey] = useState(0);
  console.log(testKey);
  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddAddress = async () => {
    try {
      const sourceAddress = {
        latitude: 14.663979273045632,
        longitude: 121.05794500238676,
      }; // Get the coordinates of the source (NEU SHITTY ASS SCHOOL)

      const apiResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${customerAddress}&format=json&limit=1`
      ); // Logic -> Wait for the response of the API, then check conditionals

      if (apiResponse.data && apiResponse.data.length > 0) {
        const { lat, lon } = apiResponse.data[0];

        const distance = geolib.getDistance(
          {
            latitude: sourceAddress.latitude,
            longitude: sourceAddress.longitude,
          },
          { latitude: parseFloat(lat), longitude: parseFloat(lon) }
        );

        const convertedDistance = (distance / 1000).toFixed(2);

        setCustomerData((prev) => [
          ...prev,
          {
            key: testKey,
            customerName,
            customerAddress,
            customerDistance: convertedDistance,
          },
        ]);
        setTestKey(testKey + 1);
      } else {
        console.error(
          "Unable to find coordinates because this API is trash and shitty."
        );
      }
    } catch (error) {
      console.log(
        "Error occurred while fetching coordinates. This is the fucking error: ",
        error
      );
    }

    setIsModalVisible(false);
    setCustomerName("");
    setCustomerAddress("");
    setDistance("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleSVG}>
        <Text style={styles.headerTitle}>Delivery</Text>
        <SvgXml xml={SVGDelivery} />
      </View>
      <View style={styles.testContainer}>
        <View style={{ flexDirection: "row", marginHorizontal: wp("2%") }}>
          <Text style={[styles.columnName, { flex: 1 + 1 / 2 }]}>Customer</Text>
          <Text style={[styles.columnName, { flex: 1 }]}>Address</Text>
          <Text style={[styles.columnName, { flex: 1, textAlign: "right" }]}>
            Distance
          </Text>
        </View>

        {
          <FlatList
            data={customerData}
            renderItem={({ item }) => (
              <View style={styles.customerContainer}>
                <Text style={[styles.customerInfo, { flex: 1 + 1 / 2 }]}>
                  {item.customerName}
                </Text>

                <Text style={[styles.customerInfo, { flex: 1 }]}>
                  {item.customerAddress}
                </Text>

                <Text
                  style={[styles.customerInfo, { flex: 1, textAlign: "right" }]}
                >
                  {item.customerDistance}
                </Text>
              </View>
            )}
          />
        }

        <TouchableOpacity
          style={styles.floatingButtonContainer}
          onPress={toggleModal}
        >
          <Text style={styles.floatingButton}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.addAddressFrame}>
            <Text style={styles.modalTitle}>Add Customer Address</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setCustomerName(text)}
                value={customerName}
                placeholder="Romnoel Petracorta"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setCustomerAddress(text)}
                value={customerAddress}
                placeholder="Montalban, Rizal"
                placeholderTextColor="#A9A9A9"
              />
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddAddress}
            >
              <Text style={styles.saveButtonText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DeliveryScreen;

const styles = StyleSheet.create({
  rowInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  customerContainer: {
    flexDirection: "row",
    marginVertical: hp("0.5%"),
    elevation: 2,
    backgroundColor: "#10ABD5",
    borderRadius: wp("4%"),
    padding: wp("4%"),
  },
  customerInfo: {
    fontFamily: "karma-regular",
    fontSize: wp("3%"),
    color: "#09171B",
  },
  columnName: {
    fontFamily: "karma-bold",
    marginVertical: hp("1%"),

    fontSize: hp("2%"),
  },
  container: {
    flex: 1,
    backgroundColor: "#EBF7F9",
  },
  headerTitleSVG: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: wp("8%"),
  },
  testContainer: {
    flex: 1,
    marginHorizontal: wp("6%"),
    borderRadius: hp("2%"),
    marginVertical: hp("2%"),
    backgroundColor: "#6FD1EB",
    padding: wp("2%"),
  },
  headerTitle: {
    fontFamily: "karma-bold",
    fontSize: 24,
    marginTop: hp("1%"),
    color: "#09171B",
    marginRight: wp("3"),
  },

  floatingButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  floatingButton: {
    backgroundColor: "#09171B",
    color: "#EBF7F9",
    padding: wp("2%"),
    borderRadius: wp("6%"),
    width: wp("12%"),
    height: wp("12%"),
    textAlign: "center",
    lineHeight: wp("8%"),
    fontSize: wp("6%"),
    elevation: 10,
    overflow: "hidden", //This makes the button rounded in IOS
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(9, 23, 27, .6)",
  },
  modalText: {
    fontSize: 24,
    fontFamily: "karma-bold",
    color: "#FFF",
    marginBottom: 20,
  },
  addAddressFrame: {
    backgroundColor: "#EBF7F9",
    height: hp("50%"),
    width: wp("80%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp("5%"),
  },
  modalTitle: {
    fontFamily: "karma-bold",
    fontSize: wp("5%"),
    marginBottom: hp("2%"),
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: hp("2%"),
    width: "80%",
  },
  inputLabel: {
    fontFamily: "karma-semibold",
    fontSize: wp("4%"),
    marginBottom: hp(".2%"),
  },
  inputField: {
    fontFamily: "karma-regular",
    borderWidth: wp(".5%"),
    borderColor: "#09171B",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("3%"),
    paddingVertical: hp(".8%"),
    fontSize: wp("4%"),
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#175F73",
    marginTop: hp("5%"),
    padding: wp("3%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("2%"),
  },
  saveButtonText: {
    fontFamily: "karma-light",
    color: "#EBF7F9",
    fontSize: wp("4%"),
  },
});
