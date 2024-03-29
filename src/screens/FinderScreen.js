import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SVGFour, loadFont } from "../../loadFontSVG";
import { Button } from "@rneui/base";
import { useDeliveryContext } from "../../context/DeliveryContext";

const FinderScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [occurrences, setOccurrences] = useState("");
  const [position, setPosition] = useState("");
  const { deliveries } = useDeliveryContext();

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setSearchTerm("");
    setOccurrences("");
    setPosition("");
  };

  const handleItemPress = (item) => {
    setSelectedAddress(item.customerAddress);
    toggleModal();
  };

  const handleSearch = () => {
    const cleanedSearchTerm = searchTerm.replace(/[^\w\s]/gi, "");

    if (cleanedSearchTerm.trim() === "") {
      setOccurrences("");
      setPosition("");
      return;
    }

    const words = selectedAddress.split(" ");

    let occurrences = 0;
    let positions = [];

    words.forEach((word, index) => {
      const cleanedWord = word.replace(/[^\w\s]/gi, "");

      if (cleanedWord.toLowerCase() === cleanedSearchTerm.toLowerCase()) {
        occurrences++;
        positions.push(index + 1);
      }
    });

    setOccurrences(occurrences);
    setPosition(positions.join(", "));
  };

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerTitleSVG}>
        <Text style={styles.headerTitle}>Finder</Text>
        <SvgXml xml={SVGFour("black")} width={30} height={30} />
      </View>

      <View style={styles.mainContainer}>
        <View style={{ flexDirection: "row", marginHorizontal: wp("4%") }}>
          <Text style={[styles.columnName, { flex: 1 }]}>Customer</Text>
          <Text style={[styles.columnName, { flex: 1, textAlign: "center" }]}>Address</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={deliveries}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleItemPress(item)}
              style={styles.dataContainer}
            >
              <Text style={[styles.customerInfo, { flex: 1 }]}>
                {item.customerName}
              </Text>
              <Text style={[styles.customerInfo, { flex: 1, textAlign:"center" }]}>
                {item.customerAddress}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Word Finder</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Search</Text>
                <TextInput
                  style={styles.inputField}
                  onChangeText={setSearchTerm}
                  value={searchTerm}
                  placeholder="Search Word"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <Text style={styles.addressText}>{selectedAddress}</Text>
              <Button
                title={"Extract Word"}
                titleStyle={styles.saveButtonText}
                buttonStyle={styles.saveButton}
                onPress={handleSearch}
              />
              <Text style={styles.occurrencesText}>
                Number of word instances: {occurrences}{" "}
              </Text>
              <Text style={styles.occurrencesText}>Position: {position}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  mainContainer: {
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
  columnName: {
    fontFamily: "karma-bold",
    marginVertical: hp("1%"),
    fontSize: hp("2%"),
  },
  customerInfo: {
    fontFamily: "karma-regular",
    fontSize: wp("3%"),
    color: "#09171B",
  },
  dataContainer: {
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
  modalContent: {
    alignItems: "center",
  },
  modalTitle: {
    fontFamily: "karma-bold",
    fontSize: 20,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  inputLabel: {
    fontFamily: "karma-semibold",
    fontSize: wp("4%"),
    marginBottom: hp(".2%"),
  },
  inputField: {
    fontFamily: "karma-regular",
    width: wp("70%"),
    borderWidth: wp(".5%"),
    borderColor: "#09171B",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("3%"),
    paddingVertical: hp(".8%"),
    fontSize: wp("4%"),
  },
  saveButton: {
    backgroundColor: "#175F73",
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    fontFamily: "karma-light",
    color: "#EBF7F9",
    fontSize: 16,
  },
  occurrencesText: {
    fontFamily: "karma-regular",
    fontSize: 16,
    marginTop: 20,
    alignSelf: "flex-start",
  },
  addressText: {
    fontFamily: "karma-regular",
    fontSize: 16,
    marginTop: 10,
  },
});

export default FinderScreen;
