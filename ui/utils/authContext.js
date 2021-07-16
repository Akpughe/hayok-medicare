import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { clearState, getUser, saveUser } from './localStorage';
import {
  clearSessionState,
  getUserFromSession,
  saveUserToSession,
} from './sessionStorage';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [validatingToken, setValidatingToken] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState([]);

  const checkLoginState = () => {
    try {
      const user = getUser();
      const sessionUser = getUserFromSession();
      if (!user && !sessionUser) {
        setValidatingToken(false);
        setIsLoggedIn(false);
        setUser(null);
      } else {
        setValidatingToken(false);
        setIsLoggedIn(true);
        setUser(user || sessionUser);
      }
    } catch (e) {
      setValidatingToken(false);
    }
  };

  const login = (data, rememberMe) => {
    if (rememberMe) {
      saveUser({ ...data, rememberMe: rememberMe });
    } else {
      saveUserToSession({ ...data, rememberMe: rememberMe });
    }
    setIsLoggedIn(true);
    setUser({ ...data, rememberMe: rememberMe });
  };

  const logout = async () => {
    await Router.push('/');
    clearState();
    clearSessionState();
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(checkLoginState, []);

  if (validatingToken) {
    return 'Loading';
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoggedIn, isLoggingOut, setIsLoggingOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
