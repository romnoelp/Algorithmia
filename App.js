import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { SvgXml } from 'react-native-svg'; 
import { TouchableOpacity, Button } from 'react-native';

var svgCode = `<svg width="171" height="171" viewBox="0 0 171 171" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M130.254 0C154.969 0 171 16.0312 171 40.7462V130.254C171 154.969 154.969 171 130.254 171H40.7462C16.0312 171 0 154.969 0 130.254V40.7462C0 16.0312 16.0312 0 40.7462 0H130.254Z" fill="#061215"/>
<mask id="mask0_65_40" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="171" height="171">
<path fill-rule="evenodd" clip-rule="evenodd" d="M130.254 0C154.969 0 171 16.0312 171 40.7462V130.254C171 154.969 154.969 171 130.254 171H40.7462C16.0312 171 0 154.969 0 130.254V40.7462C0 16.0312 16.0312 0 40.7462 0H130.254Z" fill="white"/>
</mask>
<g mask="url(#mask0_65_40)">
<path d="M53.4375 0.712524V170.288" stroke="#147691" stroke-linecap="square"/>
<path d="M20.6624 0.712524V170.288" stroke="#147691" stroke-linecap="square"/>
<path d="M117.562 0.712524V170.288" stroke="#2CC5EF" stroke-linecap="square"/>
<path d="M150.337 0.712524V170.288" stroke="#147691" stroke-linecap="square"/>
<path d="M86.2124 0.712524V170.288" stroke="#147691" stroke-linecap="square"/>
<path d="M0 98.5062C0 98.5062 8.26387 98.7107 16.7303 103.126C17.5704 103.564 18.4199 103.994 19.3432 104.206C21.3385 104.665 25.2372 105.108 29.0843 102.962C33.512 100.494 38.3303 94.0463 40.0413 91.6254C40.4806 91.0039 40.8409 90.3294 41.3327 89.7487C42.1505 88.783 43.6922 87.6537 45.6428 89.4503L49.8822 92.9383C50.2554 93.2453 50.6103 93.5799 51.0309 93.8178C52.0676 94.4041 54.2604 94.9581 55.8614 90.6117C57.4657 86.2595 60.043 80.4672 61.2761 77.7466C61.7407 76.7215 62.1092 75.661 62.496 74.6041C63.1491 72.8197 64.2898 70.519 65.1483 73.1722C65.4647 74.15 65.6737 75.1652 66.0086 76.1369L71.349 91.633C72.8958 96.1214 75.9888 99.9132 80.075 102.33L83.2905 104.232C83.688 104.468 84.0732 104.725 84.4913 104.921C85.3885 105.342 87.0434 105.799 87.7586 103.928C88.5496 101.858 92.5481 93.9521 94.2213 90.667C94.7123 89.7029 95.2789 88.7682 96.1383 88.1109C97.0316 87.4277 98.475 86.5706 100.611 85.9662C104.713 84.8048 107.656 84.6509 108.43 81.0884L115.157 61.7589C115.163 61.7423 115.168 61.7275 115.174 61.7111C115.324 61.2954 117.537 55.4577 121.049 61.7341L126.966 76.8229C127.15 77.2924 127.331 77.8084 127.771 78.0554C128.395 78.4061 129.634 78.4642 131.81 76.289L134.967 73.8954C136.06 73.067 137.076 71.6642 138.433 71.8593C139.039 71.9464 139.716 72.4249 140.327 73.734L148.631 89.8307C148.784 90.1281 148.94 90.4247 149.145 90.6891C149.711 91.4185 151.002 92.6184 151.906 89.9049L158.101 74.5127C158.968 72.357 160.205 70.3691 161.755 68.638L173.451 55.5752" stroke="#8CD4E8" stroke-width="2"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M-0.0301469 116.182C-0.0135956 106.487 7.5877 98.5192 16.2479 102.879C16.9788 103.247 18.3611 103.967 19.1559 104.162C21.0866 104.634 25.1129 105.177 29.0842 102.962C33.512 100.494 38.3303 94.0463 40.0413 91.6254C40.4805 91.0039 40.8408 90.3294 41.3327 89.7487C42.1505 88.783 43.6922 87.6537 45.6427 89.4503L49.8822 92.9383C50.2553 93.2453 50.6102 93.5799 51.0309 93.8178C52.0675 94.4041 54.2603 94.9581 55.8614 90.6117C57.4657 86.2594 60.0431 80.467 61.2761 77.7464C61.7407 76.7215 62.1091 75.661 62.4959 74.6043C63.1491 72.8198 64.2899 70.5189 65.1484 73.1722C65.4648 74.15 65.6738 75.1652 66.0087 76.1368L71.349 91.6329C72.8958 96.1214 75.9888 99.9132 80.075 102.33L83.2904 104.232C83.6879 104.468 84.0731 104.725 84.4913 104.921C85.3885 105.342 87.0434 105.799 87.7586 103.928C88.5496 101.858 92.548 93.9521 94.2212 90.667C94.7123 89.7029 95.2789 88.7682 96.1383 88.1109C97.0316 87.4277 98.475 86.5706 100.611 85.9662C104.713 84.8048 107.656 84.6509 108.43 81.0884L115.157 61.7589C115.163 61.7423 115.168 61.7275 115.174 61.7111C115.324 61.2954 117.537 55.4577 121.049 61.7341L126.966 76.8229C127.15 77.2924 127.331 77.8084 127.771 78.0554C128.395 78.4061 129.634 78.4642 131.81 76.289L134.967 73.8954C136.06 73.067 137.076 71.6642 138.433 71.8593C139.039 71.9464 139.716 72.4249 140.327 73.734L148.631 89.8307C148.784 90.1281 148.94 90.4247 149.145 90.6891C149.711 91.4185 151.002 92.6184 151.906 89.9049L158.919 72.4796C159.245 71.6691 159.71 70.9216 160.293 70.2707C164.901 65.1241 173.428 68.3925 173.415 75.3007L173.27 155.666C173.25 166.7 164.297 175.634 153.263 175.63L19.8951 175.579C8.83901 175.575 -0.116217 166.601 -0.0973434 155.545L-0.0301469 116.182Z" fill="url(#paint0_linear_65_40)"/>
<path d="M117.562 60.5626C121.497 60.5626 124.687 57.3726 124.687 53.4376C124.687 49.5026 121.497 46.3126 117.562 46.3126C113.627 46.3126 110.437 49.5026 110.437 53.4376C110.437 57.3726 113.627 60.5626 117.562 60.5626Z" fill="#2CC5EF" stroke="#061215"/>
</g>
<defs>
<linearGradient id="paint0_linear_65_40" x1="-0.131531" y1="55.5752" x2="-0.131531" y2="175.637" gradientUnits="userSpaceOnUse">
<stop stop-color="#EEEEEE" stop-opacity="0.265427"/>
<stop offset="1" stop-color="#D8D8D8" stop-opacity="0.01"/>
</linearGradient>
</defs>
</svg>`;


const LogoSVG = svgCode;

const loadFont = () => {
  return Font.loadAsync({
    'karma-regular': require('./assets/fonts/Karma-Regular.ttf'),
    'karma-bold': require('./assets/fonts/Karma-Bold.ttf'),
    'karma-light': require('./assets/fonts/Karma-Light.ttf'),
    'karma-semibold': require('./assets/fonts/Karma-SemiBold.ttf'),
    'karma-medium': require('./assets/fonts/Karma-Medium.ttf'),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont().then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={['#2CC5EF', '#147691', '#061215']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
      <Text style={[styles.karmaBold, { fontSize: 35, marginTop: -50 }]}>Algorithmia</Text>

      <View style={{ padding: 15 }}> 
        <SvgXml xml={LogoSVG} width="150" height="180" />
      </View>

      <Text style={[styles.karmaSemibold, { fontSize: 20, padding: 1 }]}>Discover your inner analytics with {'\n'}Algorithmia</Text>

      <Text style={[styles.karmaLight, { fontSize: 13, padding: 15 }]}>Knapsack, Selection Sorting, TSP, and String {'\n'} 
      Matching - Your playground awaits!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Add login logic here
        }}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={[styles.karmaLight, { fontSize: 13, padding: 15 }]}>
      Don't have an account? 
      <TouchableOpacity onPress={() => { }}>
        <Text style={[styles.karmaLight, { color: '#2CC5EF',  }]}>Sign up </Text>
      </TouchableOpacity>
    </Text>
    </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  karmaRegular: {
    fontFamily: 'karma-regular',
    marginBottom: 10,
    color: '#E4F2F6',
    textAlign: 'center',
  },
  karmaSemibold: {
    fontFamily: 'karma-semibold',
    marginBottom: 10,
    color: '#E4F2F6',
    textAlign: 'center',
  },
  karmaLight: {
    fontFamily: 'karma-light',
    marginBottom: 10,
    color: '#E4F2F6',
    textAlign: 'center',
  },
  karmaBold: {
    fontFamily: 'karma-bold',
    marginBottom: 10,
    color: '#E4F2F6',
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#147691',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15, 
  },
  buttonText: {
    color: '#E6F2F6',
    fontSize: 16,
    fontFamily: 'karma-semibold',
  },
});




