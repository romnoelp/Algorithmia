import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FloatingButton = ({ onDeleteAllItemsPress, onAddItemsPress }) => {
  const [animation] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    setOpen(!open);

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const deleteAllAddressesStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  const addAddressStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
        }),
      },
    ],
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  return (
    <View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={onDeleteAllItemsPress}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            styles.menu,
            deleteAllAddressesStyle,
          ]}
        >
          <Entypo name="trash" size={25} color="#EBF7F9" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={onAddItemsPress}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            styles.menu,
            addAddressStyle,
          ]}
        >
          <Entypo name="plus" size={24} color="#EBF7F9" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="caretdown" size={25} color="#EBF7F9" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    bottom: hp("9%"),
    right: wp("11%"),
  },
  button: {
    position: "absolute",
    width: hp("6%"),
    height: hp("6%"),
    borderRadius: hp("20"),
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  menu: {
    backgroundColor: "#09171B",
  },
  secondary: {
    width: hp("5%"),
    height: hp("5%"),
    borderRadius: hp("20"),
  },
});
