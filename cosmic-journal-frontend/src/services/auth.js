import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD3ZjDLW5NP8hcrcHgtpQI2O2YaCs7NyeQ",
    authDomain: "cosmic-journal-5cd0e.firebaseapp.com",
    projectId: "cosmic-journal-5cd0e",
    storageBucket: "cosmic-journal-5cd0e.firebasestorage.app",
    messagingSenderId: "1068273151319",
    appId: "1:1068273151319:web:1a4b2184e2981cf31b6212",
    measurementId: "G-7RHVJL2VH7"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();