import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { SvgXml } from "react-native-svg";
import * as Font from 'expo-font';
import React, { useEffect, useState } from "react";


const SVGSorted = `
<svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24.3478 17.1111H28L23.1304 22L18.2609 17.1111H21.913V0H24.3478V17.1111ZM8.52174 
    15.8889H12.1739V12.2222H8.52174V15.8889ZM14.6087 2.44444H13.3913V0H10.9565V2.44444H6.08696V0H3.
    65217V2.44444H2.43478C1.08348 2.44444 0 3.53222 0 4.88889V18.3333C0 19.69 1.08348 20.7778 2.43478 
    20.7778H14.6087C15.96 20.7778 17.0435 19.69 17.0435 18.3333V4.88889C17.0435 3.53222 15.96 2.44444 
    14.6087 2.44444ZM2.43478 18.3333V9.77778H14.6087V18.3333H2.43478Z" fill="#E6F2F6"/>
</svg>
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
    },
    HeaderLine: {
        position: "absolute",
        backgroundColor: "#2CC5EF",
        top: 130,
        left: 0,
        right: 0,
        height: 3,
        marginBottom: 20,
    },
    ParentContainer: {
        backgroundColor: "#147691",
        width: 335,
        height: 585,
        top: 75,
        left: 30,
        right: 30,
        marginBottom: 20,
        borderRadius: 20,
    },
    ChildContainer: {
        backgroundColor: "#2CC5EF",
        alignItems: "center",
        position: "absolute",
        width: 295,
        height: 67.5,
        borderRadius: 20,
        marginBottom: 0,
    },

    NamesContainer: {
        backgroundColor: "#FFFFFF",
        width: 110,
        height: 67.5,
        marginBottom: 20,
        borderRadius: 20,
        position: "absolute",
    },

    BoxContainer: {
        backgroundColor: "#FFFFFF",
        width: 50,
        height: 67.5,
        marginBottom: 20,
        borderRadius: 20,
        position: "absolute",
    },

    AmountContainer: {
        backgroundColor: "#FFFFFF",
        width: 110,
        height: 67.5,
        marginBottom: 20,
        borderRadius: 20,
        position: "absolute",
    },

    ParentContainerText: {
        fontFamily:"karma-bold",
        color:"#FFFFFF",
        fontSize: 11.5,
        top: 13.5,
        left: 50,
        alignItems: "center",
        position: "absolute",
    },
    Rectangle: {
        backgroundColor: "#147691",
        width: 55,
        height: 22,
        top: 1,
        left: 270,
        borderRadius: 20,
        position: "absolute",
    },

    RectangleText: {
        fontFamily:"karma-regular",
        color:"#FFFFFF",
        fontSize: 11.5,
        top: 3,
        left: 13,
        alignItems: "center",
        position: "absolute",
    },

    textAndSvgContainer: {
        flexDirection: "row",
    },

    textBelowHeader: {
        fontFamily: "karma-bold",
        color: "#FFFFFF",
        fontSize: 22,
        marginTop: -1,
    },
    textBelowHeader1: {
        fontFamily: "karma-regular",
        color: "#FFFFFF",
        fontSize: 22.5,
        left: 35,
        top: -1,
    },
});
const loadFont = () => {
    return Font.loadAsync({
      "karma-regular": require("../assets/fonts/Karma-Regular.ttf"),
      "karma-light": require("../assets/fonts/Karma-Light.ttf"),
      "karma-bold": require("../assets/fonts/Karma-Bold.ttf"),
      "karma-semibold": require("../assets/fonts/Karma-SemiBold.ttf"),
    });
  };

const SortingScreen = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);
  if (!fontLoaded) {
    return null;
  }
    return (
        <View style={styles.container}>
            <View style={styles.HeaderLine} />
            <View style={styles.ParentContainer}>
                <Text style={styles.ParentContainerText}>    Name                  Boxes                 Amount</Text>
            <View style={[styles.textAndSvgContainer, { top: -40}]}>
            <Text style={styles.textBelowHeader}>Sorted List  </Text>
            <SvgXml xml={SVGSorted} width="27.5" height="22" />
            <Text style={styles.textBelowHeader1}>Sort By</Text>
                <View style={[styles.ChildContainer, { top: 530, left: 20 }]} />
                <View style={[styles.ChildContainer, { top: 454, left: 20 }]} />
                <View style={[styles.ChildContainer, { top: 378, left: 20 }]} />
                <View style={[styles.ChildContainer, { top: 302, left: 20 }]} />
                <View style={[styles.ChildContainer, { top: 226, left: 20 }]} />
                <View style={[styles.ChildContainer, { top: 150, left: 20 }]} />
                <View style={[styles.ChildContainer, { top: 76, left: 20 }]} />
                
                <View style={[styles.NamesContainer, { top: 530, left: 20 }]} />
                <View style={[styles.NamesContainer, { top: 454, left: 20 }]} />
                <View style={[styles.NamesContainer, { top: 378, left: 20 }]} />
                <View style={[styles.NamesContainer, { top: 302, left: 20 }]} />
                <View style={[styles.NamesContainer, { top: 226, left: 20 }]} />
                <View style={[styles.NamesContainer, { top: 150, left: 20 }]} />
                <View style={[styles.NamesContainer, { top: 76, left: 20 }]} />

                <View style={[styles.BoxContainer, { top: 530, left: 142.5}]} />
                <View style={[styles.BoxContainer, { top: 454, left: 142.5}]} />
                <View style={[styles.BoxContainer, { top: 378, left: 142.5}]} />
                <View style={[styles.BoxContainer, { top: 302, left: 142.5}]} />
                <View style={[styles.BoxContainer, { top: 226, left: 142.5}]} />
                <View style={[styles.BoxContainer, { top: 150, left: 142.5 }]} />
                <View style={[styles.BoxContainer, { top: 76, left: 142.5 }]} />

                <View style={[styles.AmountContainer, { top: 530, left: 205}]} />
                <View style={[styles.AmountContainer, { top: 454, left: 205}]} />
                <View style={[styles.AmountContainer, { top: 378, left: 205}]} />
                <View style={[styles.AmountContainer, { top: 302, left: 205}]} />
                <View style={[styles.AmountContainer, { top: 226, left: 205}]} />
                <View style={[styles.AmountContainer, { top: 150, left: 205 }]} />
                <View style={[styles.AmountContainer, { top: 76, left: 205 }]} />
                 <View style={styles.Rectangle}>
                    <Text style={styles.RectangleText}>Name</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default SortingScreen;

