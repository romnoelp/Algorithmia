import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Component } from "react";

export default class FloatingButton extends Component {
  animation = new Animated.Value(0);

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    this.open = !this.open;
  };
  render() {
    const deleteAllAddressesStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
          }),
        },
      ],
    };

    const addAddressStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140],
          }),
        },
      ],
    };

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"],
          }),
        },
      ],
    };

    const { onDeleteAllAddressesPress, onAddAddressPress } = this.props;

    return (
      <View style={[styles.container]}>
        <TouchableWithoutFeedback onPress={onDeleteAllAddressesPress}>
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

        <TouchableWithoutFeedback onPress={onAddAddressPress}>
          <Animated.View
            style={[
              styles.button,
              styles.secondary,
              styles.menu,
              addAddressStyle,
            ]}
          >
            <Entypo name="address" size={25} color="#EBF7F9" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <AntDesign name="caretdown" size={25} color="#EBF7F9" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

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
