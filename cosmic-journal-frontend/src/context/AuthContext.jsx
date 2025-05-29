import React from 'react';

export const AuthContext = React.createContext({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  loading: true,
});