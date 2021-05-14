import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyBWDASm5C7xFF4orpakADFovjkDW3vjs58",
    authDomain: "truchi-gram.firebaseapp.com",
    projectId: "truchi-gram",
    storageBucket: "truchi-gram.appspot.com",
    messagingSenderId: "16953374022",
    appId: "1:16953374022:web:658db4e5940eaecd4ae147",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
