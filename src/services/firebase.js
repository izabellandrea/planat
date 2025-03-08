import * as firebase from "firebase";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfrbeEPgjY6WwYX_uQ8BK80tEgn7HI5bM",
  authDomain: "planat-3b625.firebaseapp.com",
  projectId: "planat-3b625",
  storageBucket: "planat-3b625.appspot.com",
  messagingSenderId: "1038255685950",
  appId: "1:1038255685950:web:18fa781754b63eb3fc6c6f",
  measurementId: "G-WGP05ZVVYV"
};

// Initialize 
firebase.initializeApp(firebaseConfig);

export default firebase;
