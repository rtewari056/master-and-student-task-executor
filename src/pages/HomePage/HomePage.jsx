import { useState } from "react";

import { AuthState } from "../../context/AuthProvider";
import calculate from "../../utils/calculate";

import "./HomePageStyle.css";

const HomePage = ({ alert, setAlert, handleAlert }) => {
  const [calculateValue, setCalculateValue] = useState("");
  const [result, setResult] = useState("");

  const { auth, activityLog, setActivityLog } = AuthState();

  const handleChange = (e) => {
    setCalculateValue((prev) => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (calculateValue.length === 0) {
      return handleAlert("warning", "Please Fill all the Feilds");
    }

    const regex1 = /\d/; // Check any digit
    const regex2 = /[\s`!@#$%^&*+\-=\[\]{};':"\\|,.<>\/?~]/; // Check any Special Character excluding '_', '(' and ')'
    if (regex1.test(calculateValue) || regex2.test(calculateValue)) {
      return handleAlert("warning", "Please enter a valid value");
    }

    const res = calculate(calculateValue);
    setResult((prev) => res);

    // Set activity log
    const newActivityLog = [...activityLog];
    newActivityLog.push({ input: calculateValue, output: res });
    setActivityLog((prev) => newActivityLog);
    localStorage.setItem("activityLog", JSON.stringify(newActivityLog));

    return;
  };

  return (
    <div className="container home-box">
      {auth.isMaster ? (
        <>
          <h1>Calculate</h1>

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

          <label htmlFor="inputBox">
            <b>Input</b>
          </label>
          <input
            type="text"
            placeholder="Enter Input"
            name="inputBox"
            id="inputBox"
            onChange={(e) => handleChange(e)}
          />

          <label htmlFor="output">
            <b>Output</b>
          </label>
          <input
            type="text"
            name="output"
            id="output"
            value={result}
            disabled
          />

          <hr />

          <button
            type="submit"
            className="calculatebtn"
            onClick={(e) => handleSubmit(e)}
          >
            Calculate
          </button>
        </>
      ) : (
        <>
          <h1 id="activity-log">Activity log</h1>
          <table id="customers">
            <thead>
              <tr>
                <th>Input</th>
                <th>Output</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.input}</td>
                  <td>{activity.output}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default HomePage;
