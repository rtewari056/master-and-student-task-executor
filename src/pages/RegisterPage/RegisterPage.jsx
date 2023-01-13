import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthState } from "../../context/AuthProvider";

import "./RegisterPageStyle.css";

const RegisterPage = ({ alert, setAlert, handleAlert }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    isMaster: false,
  });

  const navigate = useNavigate();
  const { users, setUsers, setAuth, setIsAuthenticated } = AuthState();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If any field is missing
    if (!user.email || !user.password || !user.confirmPassword) {
      return handleAlert("warning", "Please Fill all the Feilds");
    }

    // Validate email address
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!user.email.match(emailRegex)) {
      return handleAlert("warning", `${user.email} is not valid`);
    }

    // If password and confirm password doesn't match
    if (user.password !== user.confirmPassword) {
      return handleAlert("warning", "Passwords Do Not Match");
    }

    // If password is less than 8 characters
    if (user.password.length < 8) {
      return handleAlert("warning", "Password must be at least 8 characters");
    }

    // Check if user already registered or not
    if (users.length !== 0) {
      for (let i = 0; i < users.length; i++) {
        // Check if email of user is present in users
        if (user.email === users[i].email) {
          return handleAlert("warning", "User already exists");
        }
      }
    }

    // Register the user
    const currentUser = {
      email: user.email,
      password: user.password,
      isMaster: user.isMaster,
    };

    // If the email address of user before '@' is 'master', make the user master
    if(currentUser.email.split("@")[0] === "master") {
      currentUser.isMaster = true;
    }

    const newUsers = [...users];
    newUsers.push(currentUser);

    setUsers((prev) => newUsers);
    setAuth((prev) => currentUser);
    setIsAuthenticated(true);

    localStorage.setItem("users", JSON.stringify(newUsers));
    localStorage.setItem("auth", JSON.stringify(currentUser));
    localStorage.setItem("isAuthenticated", true);

    return navigate("/"); // Navigate to home page
  };

  return (
    <form>
      <div className="container register-box">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>

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

        <label htmlFor="confirmPassword">
          <b>Confirm Password</b>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={(e) => handleChange(e)}
        />
        <hr />

        <button
          type="submit"
          className="registerbtn"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </button>
      </div>

      <div className="container signin-footer">
        <p>
          Already have an account? <Link to="/login">Sign in</Link>.
        </p>
      </div>
    </form>
  );
};

export default RegisterPage;
