import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGOne, loadFont } from "../../loadFontSVG";
import { Button } from "@rneui/base";

const WholeSaleScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productAmount, setProductAmount] = useState("");

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleAddProduct = () => {
    // Add product function
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleSVG}>
        <Text style={styles.headerTitle}>Products</Text>
        <SvgXml xml={SVGOne("black")} height={"29"} width={"21"} />
      </View>
      <View style={styles.testContainer}>
        <View style={styles.addressRow}>
          <Text style={[styles.columnName, { flex: 1 }]}>Name</Text>
          <Text style={[styles.columnName, { flex: 1 }]}>Boxes</Text>
          <Text style={[styles.columnName, { flex: 1 }]}>Amount</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {/* Cards here */}
        </ScrollView>

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
            <Text style={styles.modalTitle}>Add Product</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={setProductName}
                value={productName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Weight</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={setProductWeight}
                value={productWeight}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Amount</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={setProductAmount}
                value={productAmount}
              />
            </View>

            <Button
              title={"Add Product"}
              buttonStyle={styles.saveButton}
              titleStyle={styles.buttonTitle}
              onPress={handleAddProduct}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WholeSaleScreen;

const styles = StyleSheet.create({
  buttonTitle: {
    fontFamily: "karma-light",
    fontSize: wp("4%"),
    color: "#EBF7F9",
  },
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
    fontFamily: "karma-bold",
    marginVertical: hp("1%"),
    fontSize: hp("2%"),
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
    overflow: "hidden", //This makes the button rounded in IOS
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(9, 23, 27, .6)",
  },
  modalTitle: {
    marginTop: wp("2%"),
    fontFamily: "karma-bold",
    fontSize: wp("5%"),
    marginBottom: hp("2%"),
  },
  addAddressFrame: {
    backgroundColor: "#EBF7F9",
    height: hp("50%"),
    width: wp("80%"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp("5%"),
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
    textAlign: "left",
  },
  inputField: {
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
    marginTop: hp("1%"),
    padding: wp("3%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("2%"),
  },
});
