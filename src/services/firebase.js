import firebase from "firebase/compat/app";
import "firebase/compat/auth";

/*
  apiKey: (this one's easy, it's in the 'General' section in your project settings page, aka the Gear icon button),
  authDomain: "{project_id}.firebaseapp.com", (without brackets)
  databaseURL: "https://{project_id}.firebaseio.com",
  projectId: (again, found in 'General' section in Project Settings),
  storageBucket: "{project_id}.appspot.com",
  messagingSenderId: (found in 'Cloud Messaging' section in Project Settings)
*/

const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password).catch((err) => {
    console.log(err.code);
    console.log(err.message);
  });
};

export const signInWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password).catch((err) => {
    console.log(err.code);
    console.log(err.message);
  });
};
