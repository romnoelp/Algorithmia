import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, FlatList } from "react-native";
import { SvgXml } from "react-native-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SVGFour, loadFont } from "../../loadFontSVG";

const FinderScreen = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [occurrences, setOccurrences] = useState('');
  const [position, setPosition] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  useEffect(() => {
    if (!isModalVisible) {
      setSearchTerm('');
      setOccurrences("");
      setPosition("");
    }
  }, [isModalVisible]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleItemPress = (item) => {
    setSelectedAddress(item.address);
    toggleModal();
  };

  const handleSearch = () => {
    // Remove punctuation marks from the search term
    const cleanedSearchTerm = searchTerm.replace(/[^\w\s]/gi, '');
  
    // If the search term is empty, set occurrences and position to empty strings
    if (cleanedSearchTerm.trim() === '') {
      setOccurrences('');
      setPosition('');
      return;
    }
  
    const words = selectedAddress.split(' ');
  
    let occurrences = 0;
    let positions = [];
  
    for (let i = 0; i < words.length; i++) {
      // Remove punctuation marks from the word in the address string
      const cleanedWord = words[i].replace(/[^\w\s]/gi, '');
  
      if (cleanedWord.toLowerCase() === cleanedSearchTerm.toLowerCase()) {
        occurrences++;
        positions.push(i + 1); // Store the position of the word
      }
    }
  
    setOccurrences(occurrences);
    setPosition(positions.join(', '));
  };

  const data = [
    {
      key: 1,
      name: "Elden Lord, Godfrey",
      address: "Lands Between",
      amount: "300",
    },
    {
      key: 2,
      name: "Legolas, Russian",
      address: "Serbia, Russia, serbia",
      amount: "600",
    },
  ];

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
        <View style={styles.addressRow}>
          <Text style={styles.columnName}>Customer</Text>
          <Text style={styles.columnName}>Address</Text>
          <Text style={styles.columnName}>Distance</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View style={styles.dataContainer}>
                <Text style={styles.customerValue}>{item.name}</Text>
                <Text style={styles.addressValue}>{item.address}</Text>
                <Text style={styles.distanceValue}>{item.amount}</Text>
              </View>
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
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={toggleModal}
          activeOpacity={1}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Word Finder</Text>
              <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel]}>Search</Text>
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
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSearch}
              >
                <Text style={styles.saveButtonText}>Extract word</Text>
              </TouchableOpacity>

              <Text style={styles.occurrencesText}>Number of word Instance : {occurrences} </Text>
              <Text style={styles.occurrencesText}>Position : {position}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleSVG: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: wp("8%"),
  },
  mainContainer: {
    height: hp("78%"),
    width: wp("85%"),
    marginTop: hp("1.5%"),
    borderRadius: hp("2%"),
    backgroundColor: "#147691",
    paddingHorizontal: wp("3%"),
  },
  headerTitle: {
    fontFamily: "karma-bold",
    fontSize: 24,
    color: "#09171B",
    marginRight: wp("3"),
  },
  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(0,0,0,0.1)",
    paddingVertical: hp("1%"),
  },
  columnName: {
    fontFamily: "karma-semibold",
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    color: "white",
  },
  customerValue: {
    flex: 3,
    color: "white",
    fontFamily: "karma-regular",
    fontSize: 13,
    maxWidth: 89,
    flexWrap: "wrap",
  },
  addressValue: {
    color: "white",
    flex: 1,
    marginLeft: 20,
    fontFamily: "karma-regular",
    fontSize: 13,
    flexWrap: "wrap",
    textAlign: "center",
  },
  distanceValue: {
    color: "white",
    flex: 1,
    fontFamily: "karma-regular",
    fontSize: 13,
    marginStart: 15,
    marginLeft: 25,
    marginEnd: 1,
    flexWrap: "wrap",
    textAlign: "center",
  },
  dataContainer: {
    backgroundColor: "#2CC5EF",
    flexDirection: "row",
    marginVertical: 5,
    borderRadius: 20,
    marginTop: 10,
    width: 326,
    height: 79,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
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
    fontSize: 13,
    marginBottom: 1,
  },
  inputField: {
    width: wp("70%"), // Make the input field wider
    borderWidth: 1,
    borderColor: "#09171B",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
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
  modalTextDesign: {
    alignSelf: "flex-start",
    top: 100,
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
