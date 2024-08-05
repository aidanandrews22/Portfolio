import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';

const firebaseAuthObj = firebase.auth;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Initialize the FirebaseUI Widget
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// FirebaseUI config
const uiConfig = {
  signInOptions: [
    {
      provider: firebaseAuthObj.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: true
    },
    {
      provider: firebaseAuthObj.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: 'image',
        size: 'normal',
        badge: 'bottomleft'
      },
      defaultCountry: 'US'
    },
    firebaseAuthObj.GoogleAuthProvider.PROVIDER_ID
  ],
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

// Function to start the UI
const startFirebaseUI = (elementId) => {
  ui.start(elementId, uiConfig);
};

export { app, auth, database, startFirebaseUI };