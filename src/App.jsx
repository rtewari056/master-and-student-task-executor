import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { HomePage, LoginPage, RegisterPage } from "./pages";
import { PrivateRoutes, Navbar } from "./components";

import "./App.css";

function App() {
  const [alert, setAlert] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleAlert = (type, message) => {
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false, type: "", message: "" }));
    }, 3000);
    return setAlert((prev) => ({ ...prev, show: true, type, message }));
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* Private routes (Requires authentication token) */}
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={
              <HomePage
                alert={alert}
                setAlert={setAlert}
                handleAlert={handleAlert}
              />
            }
          />
        </Route>

        {/* Public routes */}
        <Route
          path="/login"
          element={
            <LoginPage
              alert={alert}
              setAlert={setAlert}
              handleAlert={handleAlert}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              alert={alert}
              setAlert={setAlert}
              handleAlert={handleAlert}
            />
          }
        />

        {/* If the user enters an invalid path in the URL it automatically redirects them to the login page */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
