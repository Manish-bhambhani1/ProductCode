import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0MkacPEKXWEWLQmbN8HJA1O4bDL63-tw",
  authDomain: "product-code-b0dff.firebaseapp.com",
  projectId: "product-code-b0dff",
  storageBucket: "product-code-b0dff.appspot.com",
  messagingSenderId: "382470689619",
  appId: "1:382470689619:web:62a68c78e73768be5f07a6",
  measurementId: "G-TJKEPX2KYH"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
