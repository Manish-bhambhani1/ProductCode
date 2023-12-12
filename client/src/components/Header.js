import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
//import { Logo } from "../assets/img";
import { useStateValue } from "../context/StateProvider";
import { isActiveStyles, isNotActiveStyles } from "../utils/style";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { motion } from "framer-motion";

import { FaCrown } from "react-icons/fa";
 import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const logout = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth
      .signOut()
      .then(() => {
        window.localStorage.setItem("auth", "false");
      })
      .catch((e) => console.log(e));
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center w-full p-4 md:py-2 md:px-6">
      {/* <nav>
        <h2>Made2Automate</h2>
      </nav> */}
      

      <ul className="flex items-center justify-center ml-7">
        <li className="mx-5 text-lg">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
        </li>
        <li className="mx-5 text-lg">
          <NavLink
            to={"/quiz"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
         
          </NavLink>
        </li>
      </ul>
      <nav>
        <h1 className="text-3xl font-bold text-headingColor">Made2Automate</h1>
      </nav>

      <div
        className="flex items-center ml-auto cursor-pointer gap-2 relative"
        onMouseEnter={() => setIsMenu(true)}
        onMouseLeave={() => setIsMenu(false)}
      >
        <img
          className="w-12 min-w-[44px] object-cover rounded-full shadow-lg"
          src={user?.user?.imageURL}
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col">
          <p className="text-textColor text-lg hover:text-headingColor font-semibold">
            {user?.user.name}
          </p>
        </div>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-10 top-12 right-0 w-275 p-4 gap-4 bg-card shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
          >
            <NavLink to={"/userProfile"}>
              <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out" style={{ fontSize: '16px', color: '#222', margin: '8px 0', fontWeight: 'normal', transition: 'font-weight 0.15s ease-in-out' }} 
   onMouseOver={(e) => e.currentTarget.style.fontWeight = 'bold'}
   onMouseOut={(e) => e.currentTarget.style.fontWeight = 'normal'}>
                Profile
              </p>
            </NavLink>

            <hr />
            {user?.user.role === "admin" && (
              <>
                <NavLink to={"/dashboard/home"}>
                  <p className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out " style={{ fontSize: '16px', color: '#222', margin: '8px 0', fontWeight: 'normal', transition: 'font-weight 0.15s ease-in-out' }} 
   onMouseOver={(e) => e.currentTarget.style.fontWeight = 'bold'}
   onMouseOut={(e) => e.currentTarget.style.fontWeight = 'normal'}>
                    Dashboard
                  </p>
                </NavLink>
                <hr />
              </>
            )}
            <p
              className="text-base text-textColor hover:font-semibold duration-150 transition-all ease-in-out"
              style={{ fontSize: '16px', color: '#222', margin: '8px 0', fontWeight: 'normal', transition: 'font-weight 0.15s ease-in-out' }} 
   onMouseOver={(e) => e.currentTarget.style.fontWeight = 'bold'}
   onMouseOut={(e) => e.currentTarget.style.fontWeight = 'normal'}
              onClick={logout}
            >
              Sign out
            </p>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
