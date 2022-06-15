import "./App.css";
import React from "react";
import { Link } from "react-router-dom";
import { auth } from "./authentication/firebase-config";
import {useState} from "react";
import { onAuthStateChanged } from "firebase/auth";

function Nav() {
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })
    const navStyle = {
        color: 'white'
    };
  return (
    <nav className="Nav">
      <ul className="nav-links">
        <Link style= {navStyle} to="/home">
          <li>Home</li>
        </Link>
        <Link style= {navStyle} to="/signup">
          <li>SignUp</li>
        </Link>
        <Link style = {navStyle} to="/signin">
          <li>SignIn</li>
        </Link>
        <Link style = {navStyle} to="/signout">
          <li>SignOut</li>
        </Link>
        <Link style = {navStyle} to = "/">
        <li>Dashboard</li>
        </Link>
        <p>User Logged In:</p>
         {user?.email}
      </ul>

    </nav>
  );
}

export default Nav; 