import { createContext, useState } from "react";
import { redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

export const UserContext = createContext();

const localToken = localStorage.getItem("token");

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localToken);

  const login = async (userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
    return redirect("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken();
    return redirect("/login");
  };

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};
