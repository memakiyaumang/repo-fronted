import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      localStorage.setItem('token',response.data.token)

      if (response.data.status === 1) {
        navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1 className="login-title">
          Login
        </h1>

        <form onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className={`form-input ${
                errors.email ? "error" : ""
              }`}
              placeholder="you@example.com"
            />

            {errors.email && (
              <p className="error-text">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className={`form-input ${
                errors.password ? "error" : ""
              }`}
              placeholder="Enter your password"
            />

            {errors.password && (
              <p className="error-text">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;