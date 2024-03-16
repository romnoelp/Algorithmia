import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGOne, loadFont } from "../../loadFontSVG";
import { Button } from "@rneui/base";
import { auth, db } from "../../firebaseConfig";
import { useProductContext } from "../../context/ProductContext";
import Toast from "react-native-simple-toast";
import FloatingButton from "../components/FloatingButton";

const WholeSaleScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const user = auth.currentUser;
  const { addProduct, products, setProductList } = useProductContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteAllModalVisible, setIsDeleteAllModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCalculateModalVisible, setIsCalculateModalVisible] = useState(false);
  const [weightLimit, setWeightLimit] = useState("");
  const [productSelectedList, setProductSelectedList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  console.log(productSelectedList);
  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleDeleteModal = (item) => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
    setSelectedItem(item);
  };

  const toggleIsDeleteAllModal = () => {
    setIsDeleteAllModalVisible(!isDeleteAllModalVisible);
  };

  const toggleCalculateModal = () => {
    setIsCalculateModalVisible(!isCalculateModalVisible);
    setProductSelectedList([]);
    setTotalAmount(0);
    setWeightLimit("");
  };
  const handleDeleteProduct = async (selectedItem) => {
    await db
      .collection("users")
      .doc(user.displayName)
      .collection("products")
      .doc(selectedItem.key)
      .delete();
    Toast.show("Product Deleted Successfully");

    setProductList(products.filter((item) => item.key !== selectedItem.key));
    toggleDeleteModal();
  };

  const handleAddProduct = async () => {
    try {
      if (user && productName && productWeight && productAmount) {
        const docRef = await db
          .collection("users")
          .doc(user.displayName)
          .collection("products")
          .add({
            productName,
            productWeight: parseFloat(productWeight),
            productAmount: parseFloat(productAmount),
          });

        const newProduct = {
          key: docRef.id,
          productName,
          productWeight: parseFloat(productWeight),
          productAmount: parseFloat(productAmount),
        };

        addProduct(newProduct);
        setIsLoading(true);
        Toast.show("Added successfully", Toast.SHORT);
        setIsModalVisible(false);

        setProductName("");
        setProductAmount("");
        setProductWeight("");
      } else {
        Toast.show("Please complete the missing fields");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  const handleDeleteAllProducts = async () => {
    try {
      const docRef = db
        .collection("users")
        .doc(user.displayName)
        .collection("products");
      const querySnapshot = await docRef.get();
      querySnapshot.forEach(async (doc) => {
        await doc.ref.delete();
      });

      setProductList([]);
      Toast.show("All products deleted successfully", Toast.SHORT);
      toggleIsDeleteAllModal();
    } catch (error) {
      Toast.show("Error Deleting", Toast.SHORT);
    }
  };

  const knapSack = (maxWeight, weight, value, size) => {
    if (size == 0 || maxWeight == 0) return { maxValue: 0, selectedItem: [] };

    if (weight[size - 1] > maxWeight)
      return knapSack(maxWeight, weight, value, size - 1);
    else {
      const includedItem = knapSack(
        maxWeight - weight[size - 1],
        weight,
        value,
        size - 1
      );
      const excludedItem = knapSack(maxWeight, weight, value, size - 1);

      const valueWithIncludedItem = value[size - 1] + includedItem.maxValue;
      if (valueWithIncludedItem > excludedItem.maxValue) {
        const selectedItem = {
          productName: products[size - 1].productName,
          productWeight: weight[size - 1],
          productAmount: value[size - 1],
        };
        return {
          maxValue: valueWithIncludedItem,
          selectedItem: [...includedItem.selectedItem, selectedItem],
        };
      } else {
        return excludedItem;
      }
    }
  };

  const calculate = (maxWeight) => {
    if (products.length !== 0) {
      if (!maxWeight) {
        Toast.show("Enter a Weight Limit");
      } else {
        const weight = products.map((item) => item.productWeight);
        const value = products.map((item) => item.productAmount);

        const result = knapSack(maxWeight, weight, value, products.length);
        setProductSelectedList(result.selectedItem);
        setTotalAmount(result.maxValue);
      }
    } else {
      Toast.show("You have no products in the list", Toast.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleSVG}>
        <Text style={styles.headerTitle}>Products</Text>
        <SvgXml xml={SVGOne("black")} height={"29"} width={"21"} />
      </View>
      <View style={styles.testContainer}>
        <View style={{ flexDirection: "row", marginHorizontal: wp("2%") }}>
          <Text style={[styles.columnName, { flex: 2 }]}>Name</Text>
          <Text style={[styles.columnName, { flex: 1 }]}>Weight</Text>
          <Text style={[styles.columnName, { flex: 1 }]}>Amount</Text>
        </View>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.productContainer}
                onPress={() => toggleDeleteModal(item)}
              >
                <Text style={[styles.productInfo, { flex: 2 }]}>
                  {item.productName}
                </Text>

                <Text style={[styles.productInfo, { flex: 1 / 2 }]}>
                  {item.productWeight}
                </Text>

                <Text
                  style={[styles.productInfo, { flex: 1, textAlign: "center" }]}
                >
                  {item.productAmount}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <FloatingButton
          onAddItemsPress={toggleModal}
          onDeleteAllItemsPress={toggleIsDeleteAllModal}
          onCalculateAllItemsPress={() => toggleCalculateModal()}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={isDeleteModalVisible}
          onRequestClose={() => toggleDeleteModal(null)}
        >
          <View style={styles.deleteModalParent}>
            <View style={styles.deleteModalContainer}>
              {selectedItem && (
                <View>
                  <Text
                    style={{
                      marginLeft: wp("5%"),
                      fontSize: hp("2.5%"),
                      fontWeight: "bold",
                      marginTop: hp("0.5%"),
                    }}
                  >
                    Delete Item "{selectedItem.productName}"?
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Button
                      title={"Cancel"}
                      titleStyle={styles.buttonTitle}
                      buttonStyle={styles.saveButton}
                      onPress={() => toggleDeleteModal(null)}
                    />
                    <Button
                      title={"Confirm"}
                      titleStyle={styles.buttonTitle}
                      buttonStyle={styles.saveButton}
                      onPress={() => handleDeleteProduct(selectedItem)}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.addAddressFrame, { height: hp("50%") }]}>
            <Text style={styles.modalTitle}>Add Product</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={[styles.inputField, { fontFamily: "karma-regular" }]}
                onChangeText={(text) => setProductName(text)}
                placeholder="Whey protein"
                placeholderTextColor="#A9A9A9"
                value={productName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>

              <TextInput
                style={[styles.inputField, { fontFamily: "karma-regular" }]}
                onChangeText={(text) => setProductWeight(text)}
                value={productWeight}
                placeholder="10"
                keyboardType="numeric"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Amount</Text>
              <TextInput
                style={[styles.inputField, { fontFamily: "karma-regular" }]}
                onChangeText={(text) => setProductAmount(text)}
                value={productAmount}
                placeholder="5"
                keyboardType="numeric"
                placeholderTextColor="#A9A9A9"
              />
            </View>

            {isLoading ? (
              <View style={styles.saveButton}>
                <ActivityIndicator size="small" color="#EBF7F9" />
              </View>
            ) : (
              <Button
                title={"Add Product"}
                titleStyle={styles.buttonTitle}
                buttonStyle={styles.saveButton}
                onPress={handleAddProduct}
              />
            )}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isDeleteAllModalVisible}
        onRequestClose={() => toggleIsDeleteAllModal()}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.addAddressFrame, { height: hp("25%") }]}>
            <Text style={styles.modalTitle}> Delete all products?</Text>
            <Text style={styles.modalText}>This change cannot be undone.</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                onPress={() => toggleIsDeleteAllModal()}
                buttonStyle={[styles.deleteButton, styles.cancelButton]}
                titleStyle={[
                  styles.buttonTitle,
                  { fontFamily: "karma-regular" },
                ]}
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteAllProducts()}
                buttonStyle={styles.deleteButton}
                titleStyle={[
                  styles.buttonTitle,
                  { fontFamily: "karma-regular" },
                ]}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCalculateModalVisible}
        onRequestClose={() => toggleCalculateModal()}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.addAddressFrame,
              {
                height:
                  productSelectedList.length === 0 ? hp("35%") : hp("65%"),
              },
            ]}
          >
            <Text style={styles.modalTitle}>Calculate</Text>
            <Text
              style={[
                styles.modalText,
                {
                  marginHorizontal: wp("5%"),
                  fontSize: hp("1.5%"),
                  fontFamily: "karma-semibold",
                },
              ]}
            >
              Determine the products, weight and total amount
            </Text>

            <View style={[styles.inputContainer, { marginTop: hp("2%") }]}>
              <Text style={styles.inputLabel}>Set Weight Limit</Text>
              <TextInput
                style={styles.inputField}
                onChangeText={(text) => setWeightLimit(text)}
                value={weightLimit}
                placeholder="15"
                placeholderTextColor="#A9A9A9"
                keyboardType="numeric"
              />
            </View>
            <Button
              title="Calculate"
              onPress={() => calculate(weightLimit)}
              buttonStyle={styles.deleteButton}
            />

            {productSelectedList.length === 0 ? null : (
              <View style={{ height: hp("25%"), marginTop: hp("1%") }}>
                <Text
                  style={[
                    styles.modalText,
                    { textAlign: "center", fontFamily: "karma-bold" },
                  ]}
                >
                  Knapsack Content
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={[styles.modalColumnName, { flex: 2 }]}>
                    Name
                  </Text>
                  <Text style={[styles.modalColumnName, { flex: 1 }]}>
                    Weight
                  </Text>
                  <Text style={[styles.modalColumnName, { flex: 1 }]}>
                    Amount
                  </Text>
                </View>
                <FlatList
                  data={productSelectedList}
                  renderItem={({ item }) => (
                    <View
                      style={styles.modalProductContainer}
                      onPress={() => toggleDeleteModal(item)}
                    >
                      <Text style={[styles.productInfo, { flex: 2 }]}>
                        {item.productName}
                      </Text>

                      <Text style={[styles.productInfo, { flex: 1 / 2 }]}>
                        {item.productWeight}
                      </Text>

                      <Text
                        style={[
                          styles.productInfo,
                          { flex: 1, textAlign: "center" },
                        ]}
                      >
                        {item.productAmount}
                      </Text>
                    </View>
                  )}
                />
                <Text
                  style={[
                    styles.totalAmountText,
                    { fontFamily: "karma-regular" },
                  ]}
                >
                  Total Amount: {totalAmount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WholeSaleScreen;

const styles = StyleSheet.create({
  totalAmountText: {
    fontFamily: "karma-regular",
    fontSize: wp("4.5%"),
    color: "#09171B",
  },
  buttonTitle: {
    fontFamily: "karma-regular",
    fontSize: wp("4%"),
    color: "#EBF7F9",
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
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp("5%"),
  },
  columnName: {
    fontFamily: "karma-bold",
    marginVertical: hp("1%"),
    fontSize: hp("2%"),
  },
  modalColumnName: {
    fontFamily: "karma-bold",
    marginVertical: hp("1%"),
    fontSize: hp("1.8%"),
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
  productContainer: {
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
  modalProductContainer: {
    flexDirection: "row",
    marginBottom: hp("0.5%"),
    minWidth: wp("60%"),
  },
  productInfo: {
    fontFamily: "karma-regular",
    fontSize: wp("3.5%"),
    color: "#09171B",
  },
  deleteModalParent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(9, 23, 27, .6)",
  },
  deleteModalContainer: {
    backgroundColor: "#EBF7F9",
    height: hp("15%"),
    width: wp("90%"),
    borderRadius: wp("5%"),
    paddingBottom: hp("2%"),
  },
  deleteButton: {
    backgroundColor: "#147691",
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
  modalText: {
    fontSize: hp("2%"),
    fontFamily: "karma-regular",
    color: "#09171B",
  },
});
