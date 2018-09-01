import Rebase from "re-base";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";
import "firebase/database";

const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
const authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const databaseURL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

const firebaseApp = firebase.initializeApp({
  apiKey,
  authDomain,
  databaseURL
});
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
