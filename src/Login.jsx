import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("rememberUser");
    if (savedUser) {
      const { username, password } = JSON.parse(savedUser);
      setFormData({ username, password });
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.userName === formData.username && u.password === formData.password);

    if (user) {
      // Store current user in sessionStorage instead of localStorage
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      
      if (rememberMe) {
        localStorage.setItem("rememberUser", JSON.stringify(formData));
      } else {
        localStorage.removeItem("rememberUser");
      }

      if (user.role === "admin") navigate("/AdminDashboard");
      else if (user.role === "student") navigate("/StudentDashboard");
      else if (user.role === "faculty") navigate("/CompanyDashboard");
      else navigate("/EditProfile");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="welcome-text">Welcome Back!</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="remember-section">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />{" "}
              Remember me
            </label>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="login-btn">LOGIN</button>

          <p className="signup-text">
            Don't have an account? <Link to="/SignUpProfile">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;