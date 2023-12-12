import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import {
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./config/firebase.config";
import { validateUser } from "./api";
import {
  Dashboard,
  Home,
  Loader,
  Login,
  
  UserProfile,
  
} from "./components";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {

  const images = [
    'https://sellbery.com/wp-content/uploads/2022/11/How-to-Create-an-Amazon-Listing-A-Complete-Guide-Picture-1.png', 
    'https://sellerlegend.com/wp-content/uploads/2020/06/how-to-create-amazon-product-listing-01.png', 
    'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/127571358/original/47472fcb7ca790d7b2613fabf11ca0e34c359c04/do-amazon-product-listing.png', // Replace with a valid image URL
  ];

  
  const randomImage = images[Math.floor(Math.random() * images.length)];
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [
    { user, allSongs, song, isSongPlaying, miniPlayer },
    dispatch,
  ] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          // console.log(token);
          window.localStorage.setItem("auth", "true");
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);
  return (
    <div>
      
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        
        <Route path="/*" element={<Home />} />
        
        
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </div>
  );
};

export default App;
