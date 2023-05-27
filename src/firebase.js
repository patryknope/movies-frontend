// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
​​import {
​​  GoogleAuthProvider,
​​  getAuth,
​​  signInWithPopup,
​​  signInWithEmailAndPassword,
​​  createUserWithEmailAndPassword,
​​  sendPasswordResetEmail,
​​  signOut,
​​} from "firebase/auth";
​​import {
​​  getFirestore,
​​  query,
​​  getDocs,
​​  collection,
​​  where,
​​  addDoc,
​​} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW-5HjeNwmCFaH-ESABpkPe0o-uQISbZs",
  authDomain: "movieapp-26c86.firebaseapp.com",
  projectId: "movieapp-26c86",
  storageBucket: "movieapp-26c86.appspot.com",
  messagingSenderId: "1054054620955",
  appId: "1:1054054620955:web:3eea871ae7b5d375043dbe",
  measurementId: "G-PGGNX4YKY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
​​const auth = getAuth(app);
​​const db = getFirestore(app);
// const analytics = getAnalytics(app);


const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  const logout = () => {
    signOut(auth);
  };