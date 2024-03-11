import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAqnETxbRlhLDQ3o4AX9DrOjqcsxHW0_ms",
  authDomain: "algorithmia-cb6cd.firebaseapp.com",
  projectId: "algorithmia-cb6cd",
  storageBucket: "algorithmia-cb6cd.appspot.com",
  messagingSenderId: "1080725725740",
  appId: "1:1080725725740:web:274345face8bc3165ce789",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
