import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { toastWarnNotify, toastSuccessNotify, toastErrorNotify } from './toastNotify'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  // databaseURL:  process.env.REACT_APP_databaseURL, //Bu eklenecek
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

//! REGİSTER FUNCTION

export const createUser = async (email, password, displayName, navigate) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // aşagıdaki display name i güncellemek için
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    toastSuccessNotify("Registered successful!");
    navigate("/");
    console.log("Register succesfully! Here your infos -->", userCredential);
  } catch (error) {
    toastErrorNotify(error.message);
    console.log(error.message);
  }
};

//! LOGIN FUNCTION

export const signIn = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    toastSuccessNotify("Login successful!");
    navigate('/')
    console.log(userCredential);
  } catch (error) {
    toastErrorNotify(error.message);
    console.log(error.message);
  }
};

//! USER OBSERVER 

export const userObserver = (setCurrentUser) => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user)
    } else {
      setCurrentUser(false)
    }
  });
}

//! LOG OUT FUNCTION 

export const logOut = () => {
  signOut(auth)
  toastSuccessNotify("Logout successful!");
  console.log('Logged out succesfully')
}

//! SIGUP WITH GOOGLE

export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result)
    toastSuccessNotify("Login successful!");
    navigate('/')
  }).catch((error) => {
    toastErrorNotify(error.message);
    console.log(error)
  });
}


