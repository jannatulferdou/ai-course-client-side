import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import { app } from '../../firebase/firebase.config';

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const githubProvider= new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Fetch JWT token from backend
  const getJWT = (email) => {
    fetch('https://ai-course-server.vercel.app/jwt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('neuronest-token', data.token);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch JWT:', err);
      });
  };

  //  Register
  const createUser =async (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then((result) => {
      getJWT(result.user.email);
      return result;
    });
  };

  //  Email/Password Sign In
  const createSignIn =async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then((result) => {
      getJWT(result.user.email);
      return result;
    });
  };

  //  Google Sign-In
  const googleSignIn =async () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).then((result) => {
      getJWT(result.user.email);
      return result;
    });
  };
// github
  const githubSignIn =async () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider).then((result) => {
      getJWT(result.user.email);
      return result;
    });
  };

  // Logout & Remove Token
  const logout = () => {
    localStorage.removeItem('neuronest-token');
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUser = async (UpdatedData) => {
    try {
      if (!auth.currentUser) {
        throw new Error('No user is logged in');
      }
      await updateProfile(auth.currentUser, UpdatedData);
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
      return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
      console.error('Update failed:', error);
      return { success: false, message: error.message };
    }
  };

  // Monitor auth state
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser);
      
      if(currentUser){
        getJWT(currentUser.email);
        
      }
      setLoading(false);
     
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logout,
    createSignIn,
    googleSignIn,
    githubSignIn,
    loading,
    setLoading,
    updateUser,
    resetPassword
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
