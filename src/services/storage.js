import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebase";

const app = firebase.initializeApp(firebaseConfig);
export const storage = getStorage(app);
