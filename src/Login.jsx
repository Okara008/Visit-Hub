import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Load saved credentials on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("rememberUser");
    if (savedUser) {
      const { username, password } = JSON.parse(savedUser);
      setFormData({ username, password });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("Login successful!");
        console.log("Token or session info:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // ✅ Save credentials if "Remember Me" checked
        if (rememberMe) {
          localStorage.setItem("rememberUser", JSON.stringify(formData));
        } else {
          localStorage.removeItem("rememberUser");
        }

        navigate("/EditProfile");     
       } else {
        const err = await response.json();
        setError(err.detail || "Invalid username or password");
      }
    } catch (error) {
      setError("Server error: " + error.message);
    } finally {
      setLoading(false);
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
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
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
          {success && <p style={{ color: "green" }}>{success}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          <p className="signup-text">
            Don't have an account? <Link to="/SignUpProfile">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
