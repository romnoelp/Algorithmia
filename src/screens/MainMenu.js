import { 
    SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import * as Font from 'expo-font';
import { StatusBar } from "expo-status-bar";

const SVGLogo = `
<svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.7539 0C38.9687 0 43 4.03125 43 10.2461V32.7539C43 38.9687 38.9687 43 32.7539 43H10.2461C4.03125 43 0 38.9687 0 32.7539V10.2461C0 4.03125 4.03125 0 10.2461 0H32.7539Z" fill="#061215"/>
<mask id="mask0_35_50" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="43" height="43">
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.7539 0C38.9687 0 43 4.03125 43 10.2461V32.7539C43 38.9687 38.9687 43 32.7539 43H10.2461C4.03125 43 0 38.9687 0 32.7539V10.2461C0 4.03125 4.03125 0 10.2461 0H32.7539Z" fill="white"/>
</mask>
<g mask="url(#mask0_35_50)">
<path d="M13.4375 0.179199V42.8209" stroke="#147691" stroke-linecap="square"/>
<path d="M5.1958 0.179199V42.8209" stroke="#147691" stroke-linecap="square"/>
<path d="M29.5625 0.179199V42.8209" stroke="#2CC5EF" stroke-linecap="square"/>
<path d="M37.8041 0.179199V42.8209" stroke="#147691" stroke-linecap="square"/>
<path d="M21.6791 0.179199V42.8209" stroke="#147691" stroke-linecap="square"/>
<path d="M0 24.7706C0 24.7706 1.48909 24.8075 3.23763 25.4922C4.11988 25.8377 4.97678 26.3505 5.92249 26.2926C6.34921 26.2665 6.833 26.1591 7.31358 25.8911C8.12223 25.4403 8.98269 24.4617 9.55798 23.7265C10.027 23.1272 10.4206 22.0468 11.1435 22.2846C11.2482 22.3191 11.3598 22.3851 11.4774 22.4934L12.1243 23.0256C12.4975 23.3327 12.8936 23.8095 13.3546 23.6647C13.5841 23.5926 13.836 23.3583 14.047 22.7854C14.3571 21.9442 14.8118 20.889 15.1464 20.1351C15.434 19.4869 15.5556 18.8781 15.937 18.2803V18.2803C16.2853 17.7344 16.5781 19.086 16.7891 19.6982L17.6618 22.2306C18.2314 23.8832 19.3702 25.2794 20.8748 26.1693V26.1693C21.0211 26.2559 21.1623 26.3539 21.3207 26.4158C21.5542 26.5069 21.9064 26.5567 22.068 26.1341C22.2021 25.7831 22.7027 24.7652 23.1437 23.886C23.6287 22.9188 24.2251 21.9315 25.2635 21.6277C25.2755 21.6242 25.2876 21.6207 25.2998 21.6173C26.3314 21.3252 27.0714 21.2865 27.2659 20.3907L28.9511 15.5486C28.9569 15.5321 28.9623 15.5163 28.9686 15.5C29.0433 15.3043 29.5904 14.0067 30.4393 15.5238L31.7204 18.7908C31.9045 19.2602 32.2275 19.8119 32.6673 19.5653C32.8017 19.4899 32.9599 19.3691 33.1451 19.1838L33.3833 19.0032C34.0276 18.5148 34.945 17.8087 35.2869 18.5413V18.5413L37.2028 22.2551C37.3562 22.5525 37.4699 22.963 37.7982 23.0277C37.9313 23.054 38.0786 22.9682 38.1987 22.6077L38.7749 21.176C39.6423 19.0204 40.8788 17.0324 42.4288 15.3013L43.6163 13.9751" stroke="#8CD4E8" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M-0.00758686 29.2154C-0.00342485 26.7774 1.90801 24.7739 4.08572 25.8701C4.26953 25.9626 4.6171 26.1438 4.81698 26.1928C5.30247 26.3116 6.31494 26.448 7.31357 25.8911C8.12222 25.4403 8.98267 24.4617 9.55797 23.7265C10.027 23.1272 10.4206 22.0468 11.1435 22.2846C11.2482 22.3191 11.3598 22.3851 11.4774 22.4934L12.1243 23.0256C12.4975 23.3327 12.8936 23.8095 13.3546 23.6647C13.5841 23.5926 13.836 23.3583 14.047 22.7854C14.3571 21.9442 14.8118 20.8889 15.1464 20.135C15.434 19.4869 15.5556 18.8782 15.937 18.2804C16.2853 17.7344 16.5781 19.086 16.7891 19.6983L17.6618 22.2305C18.2314 23.8832 19.3702 25.2794 20.8747 26.1693C21.0211 26.2559 21.1623 26.3539 21.3207 26.4158C21.5542 26.5069 21.9064 26.5567 22.0679 26.1341C22.202 25.7831 22.7027 24.7652 23.1437 23.886C23.6287 22.9188 24.2251 21.9315 25.2635 21.6277C25.2755 21.6242 25.2876 21.6207 25.2998 21.6173C26.3314 21.3252 27.0714 21.2865 27.2659 20.3907L28.9511 15.5486C28.9569 15.5321 28.9623 15.5163 28.9686 15.5C29.0433 15.3043 29.5904 14.0067 30.4393 15.5238L31.7204 18.7908C31.9045 19.2602 32.2275 19.8119 32.6673 19.5653C32.8016 19.4899 32.9599 19.3691 33.1451 19.1838L33.3833 19.0032C34.0276 18.5148 34.945 17.8087 35.2869 18.5413L37.2028 22.2551C37.3562 22.5525 37.4699 22.963 37.7981 23.0277C37.9313 23.054 38.0786 22.9682 38.1987 22.6077L39.962 18.2259C40.0441 18.0221 40.161 17.8341 40.3075 17.6704C41.4663 16.3763 43.6105 17.1982 43.6074 18.9353L43.5769 35.8416C43.5686 40.441 39.8368 44.1647 35.2373 44.163L9.55126 44.1533C4.26003 44.1513 -0.0257523 39.8565 -0.0167196 34.5653L-0.00758686 29.2154Z" fill="url(#paint0_linear_35_50)"/>
<path d="M29.5625 15.2292C30.552 15.2292 31.3542 14.427 31.3542 13.4375C31.3542 12.448 30.552 11.6459 29.5625 11.6459C28.573 11.6459 27.7709 12.448 27.7709 13.4375C27.7709 14.427 28.573 15.2292 29.5625 15.2292Z" fill="#2CC5EF" stroke="#061215"/>
</g>
<defs>
<linearGradient id="paint0_linear_35_50" x1="-0.0330811" y1="13.9751" x2="-0.0330811" y2="44.1661" gradientUnits="userSpaceOnUse">
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
//Hi
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
        left: 0,
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
