import { 
    SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import * as Font from 'expo-font';
import { StatusBar } from "expo-status-bar";

const SVGLogo = `
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.4219 0C32.625 0 36 3.375 36 8.57814V27.4219C36 32.625 32.625 36 27.4219 36H8.57814C3.375 36 0 32.625 0 27.4219V8.57814C0 3.375 3.375 0 8.57814 0H27.4219Z" fill="#061215"/>
<mask id="mask0_35_50" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.4219 0C32.625 0 36 3.375 36 8.57814V27.4219C36 32.625 32.625 36 27.4219 36H8.57814C3.375 36 0 32.625 0 27.4219V8.57814C0 3.375 3.375 0 8.57814 0H27.4219Z" fill="white"/>
</mask>
<g mask="url(#mask0_35_50)">
<path d="M11.25 0.150024V35.85" stroke="#147691" stroke-linecap="square"/>
<path d="M4.34998 0.150024V35.85" stroke="#147691" stroke-linecap="square"/>
<path d="M24.75 0.150024V35.85" stroke="#2CC5EF" stroke-linecap="square"/>
<path d="M31.6499 0.150024V35.85" stroke="#147691" stroke-linecap="square"/>
<path d="M18.1499 0.150024V35.85" stroke="#147691" stroke-linecap="square"/>
<path d="M0 20.7382C0 20.7382 1.12559 20.766 2.49358 21.2606C3.38462 21.5828 4.25068 22.1224 5.18874 21.9891C5.48522 21.947 5.80495 21.8536 6.123 21.6763C6.74777 21.328 7.40948 20.6033 7.88641 20.0099C8.36313 19.4167 8.86578 18.3126 9.49511 18.7405C9.53227 18.7658 9.57025 18.796 9.609 18.8317L10.0594 19.2023C10.4326 19.5093 10.8712 20.0082 11.2883 19.7642C11.4493 19.6701 11.6162 19.4674 11.7603 19.0762C12.0199 18.3719 12.4006 17.4884 12.6807 16.8573C12.9215 16.3146 13.0233 15.8049 13.3426 15.3045V15.3045C13.6342 14.8474 13.8794 15.979 14.056 16.4915L14.7866 18.6116C15.2635 19.9952 16.2169 21.1641 17.4765 21.9092V21.9092C17.5991 21.9817 17.7173 22.0637 17.8499 22.1155C18.0454 22.1918 18.3403 22.2335 18.4755 21.8797C18.5864 21.5895 18.9964 20.7549 19.3622 20.0253C19.7774 19.197 20.2896 18.3505 21.1812 18.0982V18.0982C22.0449 17.8537 22.6644 17.8213 22.8273 17.0713L24.2368 13.0215C24.2425 13.0049 24.2479 12.9892 24.2542 12.9728C24.3223 12.7965 24.7787 11.7362 25.4841 12.9967L26.5117 15.6171C26.6958 16.0866 27.0398 16.6029 27.4535 16.3145C27.5414 16.2532 27.6398 16.1705 27.7494 16.0609L27.9488 15.9097C28.4882 15.5008 29.2563 14.9096 29.5425 15.523V15.523L31.1091 18.5596C31.2625 18.8569 31.4023 19.362 31.7259 19.277C31.8137 19.2539 31.9036 19.1575 31.9803 18.9274L32.2492 18.2591C33.1167 16.1035 34.3532 14.1156 35.9032 12.3845L36.516 11.7001" stroke="#8CD4E8" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M-0.00636597 24.4594C-0.00288149 22.4182 1.59739 20.7409 3.42059 21.6587V21.6587C3.57447 21.7361 3.86547 21.8879 4.03281 21.9288C4.43926 22.0283 5.28691 22.1425 6.12298 21.6763C6.74775 21.328 7.40946 20.6033 7.88639 20.0099C8.3631 19.4167 8.86576 18.3126 9.49508 18.7405C9.53224 18.7658 9.57023 18.796 9.60898 18.8317L10.0594 19.2023C10.4326 19.5093 10.8712 20.0082 11.2883 19.7642C11.4492 19.6701 11.6161 19.4674 11.7603 19.0762C12.0199 18.3719 12.4006 17.4884 12.6807 16.8572C12.9215 16.3146 13.0233 15.805 13.3426 15.3045V15.3045C13.6342 14.8474 13.8794 15.979 14.056 16.4916L14.7866 18.6116C15.2635 19.9952 16.2169 21.1641 17.4765 21.9092V21.9092C17.5991 21.9817 17.7172 22.0637 17.8499 22.1155C18.0454 22.1918 18.3402 22.2335 18.4755 21.8797C18.5863 21.5895 18.9964 20.7549 19.3621 20.0253C19.7774 19.197 20.2896 18.3505 21.1812 18.0982V18.0982C22.0449 17.8537 22.6644 17.8213 22.8273 17.0713L24.2367 13.0215C24.2425 13.0049 24.2479 12.9892 24.2542 12.9728C24.3223 12.7965 24.7787 11.7362 25.4841 12.9967L26.5116 15.6171C26.6957 16.0866 27.0398 16.6029 27.4534 16.3145C27.5414 16.2532 27.6397 16.1705 27.7494 16.0609L27.9488 15.9097C28.4882 15.5008 29.2562 14.9096 29.5425 15.523V15.523L31.109 18.5596C31.2624 18.8569 31.4023 19.362 31.7259 19.277C31.8137 19.2539 31.9036 19.1575 31.9803 18.9274L33.4566 15.2589C33.5253 15.0882 33.6231 14.9309 33.7458 14.7939V14.7939C34.716 13.7104 36.5111 14.3984 36.5085 15.8528L36.483 30.0069C36.476 33.8576 33.3517 36.9751 29.501 36.9736L7.9964 36.9655C3.56653 36.9638 -0.0215742 33.3682 -0.014012 28.9384L-0.00636597 24.4594Z" fill="url(#paint0_linear_35_50)"/>
<path d="M24.75 12.75C25.5784 12.75 26.25 12.0784 26.25 11.25C26.25 10.4216 25.5784 9.75 24.75 9.75C23.9216 9.75 23.25 10.4216 23.25 11.25C23.25 12.0784 23.9216 12.75 24.75 12.75Z" fill="#2CC5EF" stroke="#061215"/>
</g>
<defs>
<linearGradient id="paint0_linear_35_50" x1="-0.02771" y1="11.7001" x2="-0.02771" y2="36.9763" gradientUnits="userSpaceOnUse">
<stop stop-color="#EEEEEE" stop-opacity="0.265427"/>
<stop offset="1" stop-color="#D8D8D8" stop-opacity="0.01"/>
</linearGradient>
</defs>
</svg>
`;

const SVGSettings =`
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 23.25C16.6076 23.25 15.2723 22.6969 14.2877 21.7123C13.3031 20.7277 12.75 19.3924 12.75 18C12.75 16.6076 13.3031 15.2723 14.2877 14.2877C15.2723 13.3031 16.6076 12.75 18 12.75C19.3924 12.75 20.7277 13.3031 21.7123 14.2877C22.6969 15.2723 23.25 16.6076 23.25 18C23.25 19.3924 22.6969 20.7277 21.7123 21.7123C20.7277 22.6969 19.3924 23.25 18 23.25ZM29.145 19.455C29.205 18.975 29.25 18.495 29.25 18C29.25 17.505 29.205 17.01 29.145 16.5L32.31 14.055C32.595 13.83 32.67 13.425 32.49 13.095L29.49 7.905C29.31 7.575 28.905 7.44 28.575 7.575L24.84 9.075C24.06 8.49 23.25 7.98 22.305 7.605L21.75 3.63C21.69 3.27 21.375 3 21 3H15C14.625 3 14.31 3.27 14.25 3.63L13.695 7.605C12.75 7.98 11.94 8.49 11.16 9.075L7.425 7.575C7.095 7.44 6.69 7.575 6.51 7.905L3.51 13.095C3.315 13.425 3.405 13.83 3.69 14.055L6.855 16.5C6.795 17.01 6.75 17.505 6.75 18C6.75 18.495 6.795 18.975 6.855 19.455L3.69 21.945C3.405 22.17 3.315 22.575 3.51 22.905L6.51 28.095C6.69 28.425 7.095 28.545 7.425 28.425L11.16 26.91C11.94 27.51 12.75 28.02 13.695 28.395L14.25 32.37C14.31 32.73 14.625 33 15 33H21C21.375 33 21.69 32.73 21.75 32.37L22.305 28.395C23.25 28.005 24.06 27.51 24.84 26.91L28.575 28.425C28.905 28.545 29.31 28.425 29.49 28.095L32.49 22.905C32.67 22.575 32.595 22.17 32.31 21.945L29.145 19.455Z" fill="#E6F2F6"/>
</svg>
`;

const SVGOne = `
<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M60.8 60.8C62.8156 60.8 64.7487 61.6007 66.174 63.026C67.5993 64.4513 68.4 66.3844 68.4 68.4C68.4 70.4156 67.5993 72.3487 66.174 73.774C64.7487 75.1993 62.8156 76 60.8 76C56.582 76 53.2 72.58 53.2 68.4C53.2 64.182 56.582 60.8 60.8 60.8ZM0 0H12.426L15.998 7.6H72.2C73.2078 7.6 74.1744 8.00036 74.887 8.71299C75.5996 9.42563 76 10.3922 76 11.4C76 12.046 75.81 12.692 75.544 13.3L61.94 37.886C60.648 40.204 58.14 41.8 55.29 41.8H26.98L23.56 47.994L23.446 48.45C23.446 48.702 23.5461 48.9436 23.7242 49.1218C23.9024 49.2999 24.144 49.4 24.396 49.4H68.4V57H22.8C18.582 57 15.2 53.58 15.2 49.4C15.2 48.07 15.542 46.816 16.112 45.752L21.28 36.442L7.6 7.6H0V0ZM22.8 60.8C24.8156 60.8 26.7487 61.6007 28.174 63.026C29.5993 64.4513 30.4 66.3844 30.4 68.4C30.4 70.4156 29.5993 72.3487 28.174 73.774C26.7487 75.1993 24.8156 76 22.8 76C18.582 76 15.2 72.58 15.2 68.4C15.2 64.182 18.582 60.8 22.8 60.8ZM57 34.2L67.564 15.2H19.532L28.5 34.2H57Z" fill="#E6F2F6"/>
</svg>
`;
const SVGTwo = `
<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="76" height="76" rx="3" fill="#D8D8D8" fill-opacity="0.01"/>
<path d="M66.5 53.8333H76L63.3333 66.5L50.6666 53.8333H60.1666V9.5H66.5V53.8333ZM25.3333 50.6667H34.8333V41.1667H25.3333V50.6667ZM41.1666 15.8333H38V9.5H31.6666V15.8333H19V9.5H12.6666V15.8333H9.49996C5.98496 15.8333 3.16663 18.6517 3.16663 22.1667V57C3.16663 60.515 5.98496 63.3333 9.49996 63.3333H41.1666C44.6816 63.3333 47.5 60.515 47.5 57V22.1667C47.5 18.6517 44.6816 15.8333 41.1666 15.8333ZM9.49996 57V34.8333H41.1666V57H9.49996Z" fill="#E6F2F6"/>
</svg>
`;
const SVGThree = `
<svg width="76" height="56" viewBox="0 0 76 56" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M65.6364 13.8182H55.2727V0H6.90909C3.10909 0 0 3.10909 0 6.90909V44.9091H6.90909C6.90909 50.7818 11.4 55.2727 17.2727 55.2727C23.1455 55.2727 27.6364 50.7818 27.6364 44.9091H48.3636C48.3636 50.7818 52.8545 55.2727 58.7273 55.2727C64.6 55.2727 69.0909 50.7818 69.0909 44.9091H76V27.6364L65.6364 13.8182ZM17.2727 50.0909C14.5091 50.0909 12.0909 47.6727 12.0909 44.9091C12.0909 42.1455 14.5091 39.7273 17.2727 39.7273C20.0364 39.7273 22.4545 42.1455 22.4545 44.9091C22.4545 47.6727 20.0364 50.0909 17.2727 50.0909ZM48.3636 38H24.8727C23.1455 35.9273 20.3818 34.5455 17.2727 34.5455C14.1636 34.5455 11.4 35.9273 9.67273 38H6.90909V6.90909H48.3636V38ZM58.7273 50.0909C55.9636 50.0909 53.5455 47.6727 53.5455 44.9091C53.5455 42.1455 55.9636 39.7273 58.7273 39.7273C61.4909 39.7273 63.9091 42.1455 63.9091 44.9091C63.9091 47.6727 61.4909 50.0909 58.7273 50.0909ZM55.2727 27.6364V19H63.9091L70.8182 27.6364H55.2727ZM17.2727 24.1818V17.2727H38V24.1818H17.2727Z" fill="#D9D9D9"/>
</svg>
`;
const SVGFour = `
<svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30.0833 9.5C35.5424 9.5 40.7778 11.6686 44.6379 15.5287C48.4981 19.3888 50.6667 24.6243 50.6667 30.0833C50.6667 35.1817 48.7983 39.8683 45.7267 43.4783L46.5817 44.3333H49.0833L64.9167 60.1667L60.1667 64.9167L44.3333 49.0833V46.5817L43.4783 45.7267C39.8683 48.7983 35.1817 50.6667 30.0833 50.6667C24.6243 50.6667 19.3888 48.4981 15.5287 44.6379C11.6686 40.7778 9.5 35.5424 9.5 30.0833C9.5 24.6243 11.6686 19.3888 15.5287 15.5287C19.3888 11.6686 24.6243 9.5 30.0833 9.5ZM30.0833 15.8333C22.1667 15.8333 15.8333 22.1667 15.8333 30.0833C15.8333 38 22.1667 44.3333 30.0833 44.3333C38 44.3333 44.3333 38 44.3333 30.0833C44.3333 22.1667 38 15.8333 30.0833 15.8333Z" fill="#E6F2F6"/>
</svg>
`;
const loadFont = () => {
    return Font.loadAsync({
      "karma-regular": require("../assets/fonts/Karma-Regular.ttf"),
      "karma-light": require("../assets/fonts/Karma-Light.ttf"),
      "karma-bold": require("../assets/fonts/Karma-Bold.ttf"),
      "karma-semibold": require("../assets/fonts/Karma-SemiBold.ttf"),
    });
  };

const MainMenu = () => {
    const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);
  if (!fontLoaded) {
    return null;
  }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableOpacity>
                <View style={styles.logoContainer}>
                    <SvgXml xml={SVGLogo} width="43" height="43" />
                </View>
            </TouchableOpacity>
            <View style={styles.settingsContainer}>
                <SvgXml xml={SVGSettings} width="43" height="43" />
            </View>
            <View style={styles.container}>
                <View style={styles.headerLine}/>
                <StatusBar hidden />
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>What to do?</Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => console.log("Wholesale pressed")} style={styles.square} activeOpacity={0.7}>
                        <View style={styles.squareShapeView}>
                            <SvgXml xml={SVGOne} width="76" height="76" />
                        </View>
                        <Text style={styles.title}>Wholesale</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("Sort Items pressed")} style={styles.square} activeOpacity={0.7}>
                        <View style={styles.squareShapeView}>
                            <SvgXml xml={SVGTwo} width="90" height="90" />
                        </View>
                        <Text style={styles.title}>Sort Items</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => console.log("Delivery pressed")} style={styles.square} activeOpacity={0.7}>
                    <View style={styles.squareShapeView}>
                        <SvgXml xml={SVGThree} width="76" height="76" />
                    </View>
                    <Text style={styles.title}>Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Word Finder pressed")} style={styles.square} activeOpacity={0.7}>
                    <View style={styles.squareShapeView}>
                        <SvgXml xml={SVGFour} width="90" height="90" />
                    </View>
                    <Text style={styles.title}>Word Finder</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        justifyContent: "center",
    },
    headerLine: {
        position: "absolute",
        backgroundColor: "#2CC5EF",
        top: 90,
        left: 0,
        right: 0,
        height: 3,
        marginBottom: 20,
    },
    logoContainer: {
        alignItems: "center",
        position: "absolute",
        top: 20,
        left: 20,
        right: 350,
        zIndex: 1,
        paddingTop: 10,
    },
    settingsContainer: {
        alignItems: "center",
        position: "absolute",
        top: 20,
        left: 350,
        right: 0,
        zIndex: 1,
        paddingTop: 10,
    },
    sectionContainer: {
        marginBottom: 20,
        alignItems: "center",
    },
    sectionTitle: {
        fontFamily: "karma-semibold",
        color: "#FFFFFF",
        fontSize: 24,
    },
    row: {
        flexDirection: "row",
        marginBottom: 20,
    },
    square: {
        alignItems: "center",
        flex: 1,
    },
    squareShapeView: {
        width: 159,
        height: 142,
        borderRadius: 20,
        backgroundColor: "#147691",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontFamily: "karma-regular",
        color: "#FFFFFF",
        fontSize: 14,
        marginTop: 10,
    },
});


export default MainMenu;