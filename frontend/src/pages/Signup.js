import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; 

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage(" Signup successful! Redirecting to Login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(" Signup failed. Try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Something went wrong!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box glass-box">
        <h2 className="title">Create an Account 📝</h2>
        <form onSubmit={handleSubmit}>
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
            Signup
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="toggle-text">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
