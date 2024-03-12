import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGDelivery, loadFont } from "../../loadFontSVG";
import axios from "axios";
import * as geolib from "geolib";
import { Button } from "@rneui/base";
import { useDeliveryContext } from "../../context/DeliveryContext";
import { auth, db } from "../../firebaseConfig";
import Toast from "react-native-simple-toast";

const calculateDistance = (source, destination) => {
  return geolib.getDistance(source, destination);
};

const nearestNeighborSort = (customerData) => {
  if (customerData.length <= 1) {
    return customerData;
  }

  const sortedData = [customerData[0]];
  const remainingData = [...customerData.slice(1)];

  while (remainingData.length > 0) {
    let minDistance = Number.MAX_VALUE;
    let nearestCustomer = null;

    for (const customer of remainingData) {
      const distance = parseFloat(customer.customerDistance);

      if (distance < minDistance) {
        minDistance = distance;
        nearestCustomer = customer;
      }
    }

    sortedData.push(nearestCustomer);
    remainingData.splice(remainingData.indexOf(nearestCustomer), 1);
  }

  return sortedData;
};

const DeliveryScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isAddAddressModalVisible, setIsAddAddressModalVisible] =
    useState(false);
  const [isEmptyModalVisible, setIsEmptyModalVisible] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  //const [customerDistance, setDistance] = useState("");
  const [testKey, setTestKey] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [sortedCustomerData, setSortedCustomerData] = useState([]);
  const { addDelivery, deliveries } = useDeliveryContext();
  const [initialLoadFont, setInitialLoadFont] = useState(false);

  const user = auth.currentUser;
  useEffect(() => {
    if (!initialLoadFont) {
      loadFont().then(() => setFontLoaded(true));
      setInitialLoadFont(true);
    }

    setCustomerData(deliveries);
  }, [deliveries]);

  if (!fontLoaded) {
    return null;
  }

  const toggleAddAddressModal = () => {
    setIsAddAddressModalVisible(!isAddAddressModalVisible);
    if (!isAddAddressModalVisible) {
      setCustomerName("");
      setCustomerAddress("");
    }
  };

  const toggleEmptyModal = () => {
    setIsEmptyModalVisible(!isEmptyModalVisible);
  };

  const handleAddAddress = async () => {
    setIsLoading(true);
    try {
      const apiResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${customerAddress}&format=json&limit=1`
      );

      if (apiResponse.data && apiResponse.data.length > 0) {
        const { lat, lon } = apiResponse.data[0];
        if (lat && lon) {
          const coordinates = {
            latitude: parseFloat(lat),
            longitude: parseFloat(lon),
          };

          const sourceAddress = {
            latitude: 14.663979273045632,
            longitude: 121.05794500238676,
          };

          const distance = calculateDistance(sourceAddress, coordinates);
          const convertedDistance = (distance / 1000).toFixed(2);

          if (user) {
            const docRef = await db
              .collection("users")
              .doc(user.displayName)
              .collection("deliveries")
              .add({
                customerName,
                customerAddress,
                coordinates,
                customerDistance: convertedDistance,
              });

            const newCustomerData = {
              key: docRef.id,
              customerName,
              customerAddress,
              coordinates,
              customerDistance: convertedDistance,
            };

            addDelivery(newCustomerData);
            Toast.show("Added Successfully", Toast.SHORT);
            const sortedCustomerData = nearestNeighborSort(deliveries);
            setCustomerData(sortedCustomerData);
          }
        } else {
          console.error("Coordinates are undefined for the provided address.");
        }
      } else {
        console.error("Unable to find coordinates for the provided address.");
      }
    } catch (error) {
      console.error("Error occurred while fetching coordinates:", error);
    } finally {
      console.log(customerData);
      setIsLoading(false);
    }

    setCustomerName("");
    setCustomerAddress;
    setIsAddAddressModalVisible(false);
  };

  const handleContainerPress = (customer) => {
    setSelectedCustomer(customer);
    const filteredCustomerData = customerData.filter(
      (item) => item.key !== customer.key
    );
    const sortedCustomerData = nearestNeighborSort([...filteredCustomerData]);
    setSortedCustomerData(sortedCustomerData);
    setIsEmptyModalVisible(true);
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

        <FlatList
          data={customerData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.customerContainer}
              onPress={() => handleContainerPress(item)}
            >
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
            </TouchableOpacity>
          )}
          onScroll={() => setIsScrolling(true)}
          onScrollEndDrag={() => setIsScrolling(false)}
        />

        <TouchableOpacity
          style={styles.floatingButtonContainer}
          onPress={toggleAddAddressModal}
        >
          <Text
            style={[styles.floatingButton, { opacity: isScrolling ? 0.2 : 1 }]}
          >
            +
          </Text>
        </TouchableOpacity>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#10ABD5" />
          </View>
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isAddAddressModalVisible}
        onRequestClose={toggleAddAddressModal}
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
            {isLoading ? (
              <View style={styles.saveButton}>
                <ActivityIndicator size="small" color="#EBF7F9" />
              </View>
            ) : (
              <Button
                title={"Add Address"}
                titleStyle={styles.saveButtonText}
                buttonStyle={styles.saveButton}
                onPress={handleAddAddress}
              />
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isEmptyModalVisible}
        onRequestClose={toggleEmptyModal}
      >
        <View style={styles.sortedModalContainer}>
          <View style={styles.sortedAddressFrame}>
            <Text style={styles.sortedModalTitle}>Ordered Destination</Text>
            <FlatList
              data={sortedCustomerData}
              renderItem={({ item }) => (
                <View
                  style={styles.sortedCustomerContainer}
                  onPress={() => handleContainerPress(item)}
                >
                  <Text style={[styles.customerInfo, { flex: 1 + 1 / 2 }]}>
                    {item.customerName}
                  </Text>
                  <Text style={[styles.customerInfo, { flex: 1 }]}>
                    {item.customerAddress}
                  </Text>
                  <Text
                    style={[
                      styles.customerInfo,
                      { flex: 1, textAlign: "right" },
                    ]}
                  >
                    {item.customerDistance}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sortedAddressFrame: {
    backgroundColor: "#EBF7F9",
    height: hp("50%"),
    width: wp("80%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp("5%"),
    paddingBottom: hp("2%"),
  },
  sortedCustomerContainer: {
    flexDirection: "row",
    marginBottom: hp("1%"),
    elevation: 2,
    backgroundColor: "#10ABD5",
    borderRadius: wp("4%"),
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
    minWidth: wp("70%"),
    height: hp("8%"),
    alignItems: "center",
  },
  sortedModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(9, 23, 27, .6)",
  },
  sortedModalTitle: {
    fontFamily: "karma-bold",
    fontSize: wp("5%"),
    marginBottom: hp("2%"),
    marginTop: hp("2"),
  },
  rowInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  customerContainer: {
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
    flexDirection: "column",
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
    backgroundColor: "transparent",
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
  loadingContainer: {
    position: "absolute",
    bottom: 80,
    right: 20,
  },
});

export default DeliveryScreen;
