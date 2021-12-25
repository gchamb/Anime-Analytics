import React from "react";

const authContext = React.createContext({
  token: "",
  username: "",
  isLoggedIn: false,
  onLogin: () => {},
  onLogout: () => {},
  setToken: (token) => {},
  setUser: (user) => {},
});

export default authContext;
