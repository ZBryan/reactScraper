import Rebase from "re-base";
import firebase from "firebase";
import "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyDakgIeDEZhZZwLM8qR_eDQ11YeMOGKyWs",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "lnscraper.firebaseapp.com",
  databaseURL:
    process.env.REACT_APP_FIREBASE_DATABASE_URL ||
    "https://lnscraper.firebaseio.com"
});
const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
