import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaSpotify } from "react-icons/fa";
import { app } from "../config/firebase.config";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStateValue } from "../context/StateProvider";
import { validateUser } from "../api";
import { actionType } from "../context/reducer";

const Login = ({ setAuth }) => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        firebaseAuth.onAuthStateChanged((userCred) => {
          if (userCred) {
            userCred.getIdToken().then((token) => {
              console.log(token);
              validateUser(token).then((data) => {
                dispatch({
                  type: actionType.SET_USER,
                  user: data,
                });
              });
            });
            navigate("/", { replace: true });
          } else {
            setAuth(false);
            dispatch({
              type: actionType.SET_USER,
              user: null,
            });
            navigate("/Login");
          }
        });
      }
    });
  };

  useEffect(() => {
    if (window.localStorage.getItem("auth") === "true") {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <div className="relative w-screen h-screen">
    <img
      src={"https://sellbery.com/wp-content/uploads/2022/11/How-to-Create-an-Amazon-Listing-A-Complete-Guide-Picture-1.png"}
      alt=""
      autoPlay
      muted
      loop
      className="w-full h-full object-cover"
    ></img>
  
    <div className="absolute inset-0 bg-darkOverlay flex items-center justify-center p-4">
      <div className="w-full h-370 md:w-375 p-4 bg-lightOverlay shadow-2xl rounded-md backdrop-blur-md flex flex-col items-center justify-center">
        <div
          className="flex items-center justify-center gap-4 px-4 py-2 rounded-md text-2xl cursor-pointer"
          style={{
            marginBottom: "50px",
            padding: "10px",
            textAlign: "justify",
          }}
        >
          <p className="text-lg text-center">
           
          </p>
        </div>
        <div
          onClick={loginWithGoogle}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cardOverlay cursor-pointer hover:bg-card hover:shadow-md duration-100 ease-in-out transition-all"
        >
          <FcGoogle className="text-xl" />
          <p>Sign in with Google</p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
