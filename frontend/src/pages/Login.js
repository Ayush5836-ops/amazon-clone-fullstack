import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; 

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setMessage(" Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(" Invalid credentials!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Server error!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box glass-box">
        <h2 className="title">Welcome Back 🔐</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn neon-btn w-100">
            Login
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="toggle-text">
          Don’t have an account?{" "}
          <Link to="/signup" className="link">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
