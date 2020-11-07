import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAL8OWGm6xWaW1M-C0-yRXNSz7nT17BFwo",
  authDomain: "discord-clone-98a34.firebaseapp.com",
  databaseURL: "https://discord-clone-98a34.firebaseio.com",
  projectId: "discord-clone-98a34",
  storageBucket: "discord-clone-98a34.appspot.com",
  messagingSenderId: "270298409407",
  appId: "1:270298409407:web:040c569ffb0979be5c190a",
  measurementId: "G-B91GK29DMH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
