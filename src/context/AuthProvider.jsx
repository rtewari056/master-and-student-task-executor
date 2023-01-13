import { useContext, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    !localStorage.getItem("auth")
      ? {}
      : JSON.parse(localStorage.getItem("auth"))
  );
  const [users, setUsers] = useState(
    !localStorage.getItem("users")
      ? []
      : JSON.parse(localStorage.getItem("users"))
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    !localStorage.getItem("isAuthenticated")
      ? false
      : localStorage.getItem("isAuthenticated")
  );
  const [activityLog, setActivityLog] = useState(
    !localStorage.getItem("activityLog")
      ? []
      : JSON.parse(localStorage.getItem("activityLog"))
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        users,
        setUsers,
        isAuthenticated,
        setIsAuthenticated,
        activityLog,
        setActivityLog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
