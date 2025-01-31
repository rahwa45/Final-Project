import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { useSnackbar } from "notistack";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = () => {
    setLoading(true);
    axios
      .post("https://final-project-mnc7.onrender.com/health/api/auth/login", {
        username,
        password,
      })
      .then((res) => {
        const { token, username } = res.data;
        console.log("Username:", username);

        localStorage.setItem("token", token);
        localStorage.setItem("user", username);

        setLoading(true);

        enqueueSnackbar("Login successfull", { variant: "success" });
        navigate("/patient", { state: { username } });
      })
      .catch((error) => {
        console.log("Error Response:", error.response);
        if (error.response?.status === 403) {
          enqueueSnackbar(error.response.data.message, {
            variant: "warning",
          });
        } else if (error.response?.status === 401) {
          enqueueSnackbar("Invalid credentials. Please try again.", {
            variant: "error",
          });
        } else {
          // Notify user of unexpected errors
          enqueueSnackbar("An error occurred. Please try again later.", {
            variant: "error",
          });
        }
      });
  };

  if (loading) {
    return (
      <div className="p-4 d-flex align-items-center justify-content-center container style=height: 100vh flex-column display-4 mb-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 d-flex align-items-center justify-content-center container p-4 style=height: 100vh flex-column log bg-light">
      <h1 className="mx-4 my-4">Login</h1>
      <div className="p-4">
        <div className="my-4">
          <label className="mx-3 mr-4">Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2"
          />
        </div>

        <div className="my-4">
          <label className="mx-3 mr-4">Password</label>

          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2"
          />
        </div>
        <button
          className="btn btn-primary mx-4 my-2 p-2"
          style={{ width: 300 }}
          onClick={handleLogin}
        >
          Login
        </button>
        <div>
          <p className="mx-4">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
