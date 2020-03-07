import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA5B74pN-tES-4g-xe-tN-CJKinZWPd-eM",
    authDomain: "crwn-db-571ad.firebaseapp.com",
    databaseURL: "https://crwn-db-571ad.firebaseio.com",
    projectId: "crwn-db-571ad",
    storageBucket: "crwn-db-571ad.appspot.com",
    messagingSenderId: "597353490564",
    appId: "1:597353490564:web:86ff81dc19b3b8a6e7fad1",
    measurementId: "G-9TZFFYN0EP"
};

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Config Google Authentication
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

// Facebook Auth
// const providerFacebook = new firebase.auth.FacebookAuthProvider();
// provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
