import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const initialStateUser = {};
const inistialStateToken = undefined;


export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(inistialStateToken);
  const [user, setUser] = useState(initialStateUser);

  const saveToken = (token) => {
    setToken(token);
  };

  const saveUser = (user) => {
    setUser(user);
  };

  const resetAuth = () => {
      setUser(initialStateUser);
      setToken(inistialStateToken);
  };

  
  

  const value = {
    token,
    user,
    saveToken,
    saveUser,
    resetAuth
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

