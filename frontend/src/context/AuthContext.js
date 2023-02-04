import React, { createContext, useRef, useState } from 'react';

export const AuthContext = createContext();

const initialStateUser = {};
const initialStateToken = undefined;


export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(initialStateToken);
  const [user, setUser] = useState(initialStateUser);
  
  const saveToken = (token) => {
    setToken(token);
  };

  const saveUser = (user) => {
    setUser(user);
  };

  

  const resetAuth = () => {
      setUser(initialStateUser);
      setToken(initialStateToken);
     
  };

  
  

  const value = {
    token,
    user,
    saveToken,
    saveUser,
    resetAuth,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

