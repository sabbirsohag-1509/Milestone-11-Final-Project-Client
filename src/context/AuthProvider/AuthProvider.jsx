import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebase/firebase-init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerInfo = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInInfo = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOutInfo = () => {
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfileInfo = (profile) => {
    setLoading(true)
    return updateProfile(auth.currentUser , profile)
  } 

  //observe the manage user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // console.log("Auth State Changed:", currentUser);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (<div> 
      <span className="loading loading-infinity loading-xl"></span>
    </div>)
  }

  const authInfo = {
    user,
    loading,
    registerInfo,
    signInInfo,
    signInGoogle,
    updateUserProfileInfo,
    logOutInfo,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
