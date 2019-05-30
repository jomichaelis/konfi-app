import firebase from 'firebase/app'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDt2imuXjPR4bn5DWWGgs3iEtb8hJ8mM_I",
  authDomain: "konfi-app-mdf.firebaseapp.com",
  databaseURL: "https://konfi-app-mdf.firebaseio.com",
  projectId: "konfi-app-mdf",
  storageBucket: "konfi-app-mdf.appspot.com",
  messagingSenderId: "920826594681",
  appId: "1:920826594681:web:8f6c34734936c359"
};
firebase.initializeApp(config);
const db = firebase.firestore();

export default db;
