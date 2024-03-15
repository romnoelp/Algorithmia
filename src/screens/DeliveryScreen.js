import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGDelivery, loadFont } from "../../loadFontSVG";
import FloatingButton from "../components/FloatingButton";
import axios from "axios";
import * as geolib from "geolib";
import { Button } from "@rneui/base";
import { useDeliveryContext } from "../../context/DeliveryContext";
import { auth, db } from "../../firebaseConfig";
import Toast from "react-native-simple-toast";

const calculateTotalDistance = async (sourceAddress, destinationAddresses) => {
  try {
    const sourceResponse = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${sourceAddress}&format=json&limit=1`
    );
    const sourceCoords = {
      latitude: parseFloat(sourceResponse.data[0].lat),
      longitude: parseFloat(sourceResponse.data[0].lon),
    };

    const destinationCoords = [];
    for (const address of destinationAddresses) {
      const destinationResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${address}&format=json&limit=1`
      );
      const destCoord = {
        latitude: parseFloat(destinationResponse.data[0].lat),
        longitude: parseFloat(destinationResponse.data[0].lon),
      };
      destinationCoords.push(destCoord);
    }

    const distances = [];
    for (let i = 0; i < destinationCoords.length; i++) {
      const distanceInMeters = await calculateDistanceFromSource(
        sourceCoords,
        destinationCoords[i]
      );

      const distanceInKm = (distanceInMeters / 1000).toFixed(2);
      distances.push(distanceInKm);
    }

    return distances;
  } catch (error) {
    console.error("Error calculating total distance:", error);
    throw error;
  }
};

const calculateDistanceFromSource = (sourceCoords, destinationCoords) => {
  try {
    const earthRadius = 6371000; // Radius of the Earth in meters
    const lat1 = sourceCoords.latitude;
    const lon1 = sourceCoords.longitude;
    const lat2 = destinationCoords.latitude;
    const lon2 = destinationCoords.longitude;

    // Convert degrees to radians
    const lat1Rad = lat1 * (Math.PI / 180);
    const lat2Rad = lat2 * (Math.PI / 180);
    const deltaLat = (lat2 - lat1) * (Math.PI / 180);
    const deltaLon = (lon2 - lon1) * (Math.PI / 180);

    // Haversine formula
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  } catch (error) {
    console.error("Error calculating distance from source:", error);
    throw error;
  }
};

function generatePermutations(arr) {
  const result = [];

  const permute = (array, currentPermutation = []) => {
    if (array.length === 0) {

      result.push(currentPermutation);
    } else {
      for (let i = 0; i < array.length; i++) {
        const newArray = array.slice(0, i).concat(array.slice(i + 1));
        const newPermutation = currentPermutation.concat(array[i]);
        permute(newArray, newPermutation);
      }
    }
  };

  permute(arr);

  return result;
}

const findShortestPath = async (sourceAddress, destinationAddresses) => {
  try {
    const permutations = generatePermutations(destinationAddresses);
    let shortestPath = [];
    let shortestDistance = Infinity;

    for (const permutation of permutations) {
      let totalDistance = 0;
      let currentAddress = sourceAddress;

      for (const address of permutation) {
        const distanceInKm = await calculateTotalDistance(currentAddress, [address]);
        totalDistance += distanceInKm[0];
        currentAddress = address;
      }

      const distanceToSource = await calculateTotalDistance(currentAddress, [sourceAddress]);
      totalDistance += distanceToSource[0];

      if (totalDistance < shortestDistance) {
        shortestDistance = totalDistance;
        shortestPath = [sourceAddress, ...permutation, sourceAddress];
      }
    }

    return { path: shortestPath, distance: shortestDistance };
  } catch (error) {
    console.error("Error finding shortest path:", error);
    throw error;
  }
};

const DeliveryScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isAddAddressModalVisible, setIsAddAddressModalVisible] =
    useState(false);
  const [isDeleteAllAddressModalVisible, setIsDeleteAlAddressModalVisible] =
    useState(false);
  const [
    isCalculateAllAddressModalVisible,
    setIsCalculateAllAddressModalVisible,
  ] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const [containerOptionsVisible, setContainerOptionsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sourceAddress, setSourceAddress] = useState("");
  const { addDelivery, deliveries } = useDeliveryContext();
  const [distances, setDistances] = useState([]);
  const [sortedAddresses, setSortedAddresses] = useState([]);
  const user = auth.currentUser;

  useEffect(
    () => {
      if (!fontLoaded) {
        loadFont().then(() => setFontLoaded(true));
      }
      setCustomerData(deliveries);
    },
    [deliveries],
    [isCalculateAllAddressModalVisible]
  );

  const toggleAddAddressModal = () => {
    setIsAddAddressModalVisible(!isAddAddressModalVisible);
    if (!isAddAddressModalVisible) {
      setCustomerName("");
      setCustomerAddress("");
    }
  };

  const toggleDeleteAllAddressModal = () => {
    setIsDeleteAlAddressModalVisible(!isDeleteAllAddressModalVisible);
  };

  const handleAddAddress = async () => {
    setIsLoading(true);
    try {
      if (user) {
        const docRef = await db
          .collection("users")
          .doc(user.displayName)
          .collection("deliveries")
          .add({
            customerName,
            customerAddress,
          });

        const newCustomerData = {
          key: docRef.id,
          customerName,
          customerAddress,
        };

        addDelivery(newCustomerData);

        setIsLoading(false);
        setCustomerName("");
        setCustomerAddress("");
        setIsAddAddressModalVisible(false);
      }
    } catch (error) {
      console.error("Error occurred while adding address:", error);
      Toast.show("Error occurred while adding address", Toast.LONG);
    } finally {
      setIsLoading(false);
      setCustomerName("");
      setCustomerAddress("");
      setIsAddAddressModalVisible(false);
    }
  };

  const handleDeleteAllAddress = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await db
          .collection("users")
          .doc(user.displayName)
          .collection("deliveries")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            });
          });

        Toast.show("All addresses deleted successfully", Toast.SHORT);
        setCustomerData([]);
      }
    } catch (error) {
      console.error("Error deleting all addresses:", error);
      Toast.show("Error occurred while deleting all addresses", Toast.LONG);
    } finally {
      setIsDeleteAlAddressModalVisible(false);
    }
  };

  const toggleCalculateAddressModal = () => {
    setIsCalculateAllAddressModalVisible(!isCalculateAllAddressModalVisible);
  };

  const handleContainerPress = (item) => {
    setSelectedItem(item);
    setAddressToDelete(item.key);
    setContainerOptionsVisible(true);
  };

  const handleSourceAddress = async () => {
    if (selectedItem) {
      const sourceAddress = selectedItem.customerAddress;
      setSourceAddress(sourceAddress);
      console.log("Source Address: ", sourceAddress);
      setContainerOptionsVisible(false);

      try {
        const destinationAddresses = customerData.map(
          (item) => item.customerAddress
        );
        const calculatedDistances = await calculateTotalDistance(
          sourceAddress,
          destinationAddresses
        );

        setDistances(calculatedDistances);

        const combinedData = customerData.map((item, index) => ({
          ...item,
          distance: calculatedDistances[index],
        }));

        setSortedAddresses(combinedData);
      } catch (error) {
        console.error("Error calculating distances:", error);
      }
    }
  };

  const handleDeleteAddress = async () => {
    try {
      if (addressToDelete && user) {
        await db
          .collection("users")
          .doc(user.displayName)
          .collection("deliveries")
          .doc(addressToDelete)
          .delete();

        Toast.show("Address deleted successfully", Toast.SHORT);

        const updatedCustomerData = customerData.filter(
          (item) => item.key !== addressToDelete
        );
        setCustomerData(updatedCustomerData);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      Toast.show("Error occurred while deleting address", Toast.LONG);
    } finally {
      setContainerOptionsVisible(false);
      setAddressToDelete(null);
    }
  };

  const handleDeleteAllAddressesPress = () => {
    toggleDeleteAllAddressModal(true);
  };

  const handleAddAddressPress = () => {
    setIsAddAddressModalVisible(true);
  };

  const handleContainerOptionsClose = () => {
    setSelectedItem(null);
    setAddressToDelete(null);
  };

  const handleCalculateAddressPress = async () => {
    try {
      toggleCalculateAddressModal();
    } catch (error) {
      console.error("Error occurred while showing the modal:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleSVG}>
        <Text style={styles.headerTitle}>Delivery</Text>
        <SvgXml xml={SVGDelivery} />
      </View>
      <View style={styles.testContainer}>
        <View style={{ flexDirection: "row", marginHorizontal: wp("4%") }}>
          <Text style={[styles.columnName, { flex: 1 }]}>Customer</Text>
          <Text style={[styles.columnName, { flex: 1, textAlign: "center" }]}>
            Address
          </Text>
        </View>
        <FlatList
          data={customerData}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.customerContainer}
              onPress={() => handleContainerPress(item)}
              onLongPress={() => handleContainerLongPress(item)}
            >
              <Text style={[styles.customerInfo, { flex: 1 }]}>
                {item.customerName}
              </Text>

              <Text
                style={[styles.customerInfo, { flex: 1, textAlign: "center" }]}
              >
                {item.customerAddress}
              </Text>
            </TouchableOpacity>
          )}
          onScroll={() => setIsScrolling(true)}
          onScrollEndDrag={() => setIsScrolling(false)}
        />

        <FloatingButton
          onDeleteAllItemsPress={handleDeleteAllAddressesPress}
          onAddItemsPress={handleAddAddressPress}
          onCalculateAllItemsPress={handleCalculateAddressPress}
        />
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
          <View style={[styles.addAddressFrame, { height: hp("50%") }]}>
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
        visible={isDeleteAllAddressModalVisible}
        onRequestClose={toggleDeleteAllAddressModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.addAddressFrame, { height: hp("25%") }]}>
            <Text style={styles.modalTitle}>Delete all addresses?</Text>
            <Text style={styles.modalText}>This change cannot be undone.</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                titleStyle={styles.saveButtonText}
                buttonStyle={[styles.cancelDeleteButton]}
                onPress={() => setDeleteModalVisible(false)}
              />
              <Button
                title="Delete"
                titleStyle={styles.saveButtonText}
                onPress={handleDeleteAllAddress}
                buttonStyle={styles.deleteAllButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={containerOptionsVisible}
        onRequestClose={handleContainerOptionsClose}
        onBackdropPress={handleContainerOptionsClose}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.addAddressFrame, { height: hp("30%") }]}>
            <Text style={styles.modalTitle}>Operation</Text>
            <Text style={styles.modalText}>
              Select an operation for the selected address.
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Source"
                titleStyle={styles.saveButtonText}
                buttonStyle={[styles.cancelDeleteButton]}
                onPress={handleSourceAddress}
              />
              <Button
                title="Delete"
                titleStyle={styles.saveButtonText}
                onPress={handleDeleteAddress}
                buttonStyle={styles.deleteAllButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isCalculateAllAddressModalVisible}
        onRequestClose={toggleCalculateAddressModal}
        animationInTiming={2000}
        animationOutTiming={2000}
      >
        <View style={styles.sortedAddressContainer}>
          <View style={[styles.sortedAddressFrame, { height: hp("65%") }]}>
            <Text style={styles.nearestTitle}>Delivery Tracker</Text>
            <View style={styles.trackerContainer}>
              <View style={styles.header}>
                <Text style={styles.columnHeader}>Customer</Text>
                <Text style={styles.columnHeader}>Address</Text>
                <Text style={styles.columnHeader}>Distance</Text>
              </View>
              <FlatList
                data={sortedAddresses}
                renderItem={({ item, index }) => (
                  <View key={index} style={styles.customerContainer}>
                    <Text
                      style={[styles.sortedCustomerInfo, { textAlign: "left" }]}
                    >
                      {item.customerName}
                    </Text>
                    <Text
                      style={[
                        styles.sortedCustomerInfo,
                        { textAlign: "center" },
                      ]}
                    >
                      {item.customerAddress}
                    </Text>
                    <Text
                      style={[
                        styles.sortedCustomerInfo,
                        { textAlign: "right" },
                      ]}
                    >
                      {distances[index]}km
                    </Text>
                  </View>
                )}
                keyExtractor={(item) => item.key.toString()}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sortedCustomerInfo: {
    fontFamily: "karma-regular",
    fontSize: wp("2.7%"),
    color: "#09171B",
    flexDirection: "row",
    flex: 1,
    textAlign: "center",
  },
  columnHeader: {
    fontFamily: "karma-semibold",
    marginVertical: hp("1%"),
    fontSize: hp("1.8%"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginHorizontal: wp("1%"),
  },
  trackerContainer: {
    flex: 1,
    marginHorizontal: wp("6%"),
    borderRadius: hp("2%"),
    backgroundColor: "#6FD1EB",
    padding: wp("2%"),
    flexDirection: "column",
    width: wp("80%"),
    paddingBottom: hp("2.5%"),
  },
  nearestTitle: {
    fontFamily: "karma-bold",
    fontSize: wp("5%"),
    marginTop: hp("1%"),
    marginRight: wp("32%"),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp("10%"),
    marginTop: hp("2%"),
  },
  cancelDeleteButton: {
    margin: wp("2%"),
    backgroundColor: "#9FA0A0",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("2%"),
    width: wp("30%"),
  },
  deleteAllButton: {
    margin: wp("2%"),
    backgroundColor: "#175F73",
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("2%"),
    width: wp("30%"),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp("6%"),
  },
  calculateButton: {
    backgroundColor: "#10ABD5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  clearButton: {
    backgroundColor: "#FF6347",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: "karma-bold",
    fontSize: 16,
    color: "#EBF7F9",
  },
  sortedAddressFrame: {
    backgroundColor: "#EBF7F9",
    height: hp("50%"),
    width: wp("85%"),
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

  floating: {
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
    bottom: hp("20"),
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
  sortedAddressContainer: {
    marginTop: hp("16.4%"),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(9, 23, 27, .6)",
  },
  modalText: {
    fontSize: 18,
    fontFamily: "karma-regular",
    color: "#09171B",
    marginBottom: 20,
  },
  addAddressFrame: {
    backgroundColor: "#EBF7F9",
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
  deleteAddressFrame: {
    backgroundColor: "#EBF7F9",
    height: hp("30%"),
    width: wp("80%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp("5%"),
  },
  deleteButton: {
    backgroundColor: "#147691",
    marginTop: hp("3%"),
    padding: wp("3%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("2%"),
  },
  cancelButton: {
    backgroundColor: "#B9BABB",
    marginRight: wp("2%"),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DeliveryScreen;
