import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthState } from "../../context/AuthProvider";

import "./LoginPageStyle.css";

const LoginPage = ({ alert, setAlert, handleAlert }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { users, setAuth, setIsAuthenticated } = AuthState();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If any field is missing
    if (!user.email || !user.password) {
      return handleAlert("warning", "Please Fill all the Feilds");
    }

    // If no users in localstorage
    if (!users) {
      return handleAlert("danger", "Please create an account first");
    } else {
      for (let i = 0; i < users.length; i++) {
        // Check if email and password of user is present in users
        if (
          user.email === users[i].email &&
          user.password === users[i].password
        ) {
          setIsAuthenticated((prev) => true);
          setAuth((prev) => users[i]);
          localStorage.setItem("auth", JSON.stringify(users[i]));
          localStorage.setItem("isAuthenticated", true);
          return navigate("/"); // Navigate to home page
        }
      }
      return handleAlert("warning", "Invalid credentials");
    }
  };

  return (
    <form>
      <div className="container login-box">
        <h1>Login</h1>
        <p>Please login to use the app.</p>

        {alert.show && (
          <div className={`alert ${alert.type}`}>
            <span
              className="closebtn"
              onClick={() => {
                setAlert((prev) => ({
                  ...prev,
                  show: false,
                  type: "",
                  message: "",
                }));
              }}
            >
              &times;
            </span>
            <strong>{alert.type}!</strong> {alert.message}
          </div>
        )}

        <hr />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          onChange={(e) => handleChange(e)}
        />

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          id="password"
          onChange={(e) => handleChange(e)}
        />

        <hr />

        <button
          type="submit"
          className="loginbtn"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </div>

      <div className="container register-footer">
        <p>
          Don't have an account? <Link to="/register">Register</Link>.
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
