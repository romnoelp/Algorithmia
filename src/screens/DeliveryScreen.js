import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGDelivery, loadFont } from "../../loadFontSVG";

const DeliveryScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [customerData, setCustomerData] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);
  console.log(customerName);

  if (!fontLoaded) {
    return null;
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddAddress = () => {
    setCustomerData((prev) => [...prev, { customerName, customerAddress }]);
    setIsModalVisible(false);
  };
  console.log(customerData);
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

        <FlatList
          data={customerData}
          renderItem={({ item }) => (
            <View>
              <Text>{item.customerName}</Text>
              <Text>{item.customerAddress}</Text>
            </View>
          )}
        />

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
              <Text
                style={[
                  styles.inputLabel,
                  { textAlign: "left", width: wp("20%") },
                ]}
              >
                Name
              </Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setCustomerName(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.inputLabel,
                  { textAlign: "left", width: wp("20%") },
                ]}
              >
                Address
              </Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setCustomerAddress(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={[
                  styles.inputLabel,
                  { textAlign: "left", width: wp("20%") },
                ]}
              >
                Distance from source
              </Text>
              <TextInput style={styles.inputField} />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddAddress} // Call handleAddAddress function
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
    position: "relative",
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
    fontFamily: "karma-bold",
    marginVertical: hp("1%"),
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
    marginBottom: hp("1%"),
    borderRadius: wp("3%"),
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
    width: "80%",
  },
  inputLabel: {
    fontFamily: "karma-semibold",
    fontSize: wp("4%"),
    marginRight: wp("3%"),
    textAlign: "left",
  },
  inputField: {
    flex: 1,
    borderWidth: wp(".5%"),
    borderColor: "#09171B",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("3%"),
    paddingVertical: hp(".8%"),
    fontSize: wp("4%"),
    marginLeft: wp("3%"),
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
