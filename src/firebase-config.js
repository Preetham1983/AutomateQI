// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCehiBFsamngHqHFBIZEceB0YPyoIWjnRI",
  authDomain: "automationnexus-a2539.firebaseapp.com",
  projectId: "automationnexus-a2539",
  storageBucket: "automationnexus-a2539.firebasestorage.app",
  messagingSenderId: "343931003282",
  appId: "1:343931003282:web:a746935e11441ceee8a14b",
  measurementId: "G-VEY9QL4166"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);