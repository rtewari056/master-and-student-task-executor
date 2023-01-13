import { Link, useNavigate } from "react-router-dom";

import { AuthState } from "../../context/AuthProvider";

import "./NavbarStyle.css";

const Navbar = () => {
  const { setAuth, isAuthenticated, setIsAuthenticated } = AuthState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("auth");
    setAuth((prev) => {});
    setIsAuthenticated((prev) => !prev);
    return navigate("/login"); // Navigate to login page
  };

  return (
    <nav>
      <h2>Task executor</h2>
      {!isAuthenticated ? (
        <ul>
          <li>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
