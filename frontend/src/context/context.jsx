import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const URL = import.meta.env.VITE_URL;

export const AuthProvider = ({ children }) => {

  // This is a dummy state used to make some components re-render after a login/logout
  const [change, setChange] = useState(false);

  const login = (username) => {
    localStorage.setItem("currentUser", username);
    setChange(!change);
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setChange(!change);
  };

  const isLoggedIn = () => {
    if (localStorage.getItem("currentUser")) {
      return true;
    }
    return false;
  }

  const fillSurvey = (value) => {
    localStorage.setItem("surveyFilledOut", value);
    setChange(!change);
  }

  const isSurveyFilledOut = () => {
    if (localStorage.getItem("surveyFilledOut") === true) {
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, fillSurvey, isSurveyFilledOut }}>
      {children}
    </AuthContext.Provider>
  );
};