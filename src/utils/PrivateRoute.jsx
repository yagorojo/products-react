import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function PrivateRoute({ children }) {
  const { token } = useContext(UserContext);

  return token ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
