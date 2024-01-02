import React from 'react';

const initialAutthState = {
  userToken: null,
  signIn: () => {},
  signOut: () => {},
  signUp: () => {},
};

export const AuthContext = React.createContext(initialAutthState);
