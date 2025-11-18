import React, { useEffect, useState } from "react";
import "./SignUpProfile.css";
import { useNavigate, Link } from "react-router-dom";

function SignUpProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    institution: "",
    department: "",
    password: "",
    confirmPassword: "",
    location: "",
    role: "",
  });

  const [errors, setErrors] = useState({ email: "", phone: "" });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone.replace(/\s/g, ''));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email and phone
    if (!validateEmail(formData.email)) {
      setErrors({...errors, email: "Please enter a valid email address"});
      return;
    }
    if (!validatePhone(formData.phone)) {
      setErrors({...errors, phone: "Please enter a valid phone number"});
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userExists = existingUsers.find(user => user.userName === formData.userName);
      if (userExists) {
        alert("Username already exists!");
        return;
      }

      const newUser = { id: Date.now(), ...formData };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      
      alert("Account created successfully!");
      setFormData({
        fullName: "", userName: "", email: "", phone: "", institution: "",
        department: "", password: "", location: "", confirmPassword: "", role: "",
      });

    } catch (error) {
      alert("Error creating account.");
    }

    const roleRadio = Array.from(document.querySelectorAll(".roleRadio"));
    if (roleRadio[0].checked) navigate("/CompanyDashboard");
    else if (roleRadio[1].checked) navigate("/AdminDashboard");
    else if (roleRadio[2].checked) navigate("/StudentDashboard");
  };

  return (
    <div className="signup-box">
      <h2>Join Visit Hub</h2>

      <form onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name / Company Name"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            required
          />
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            value={formData.userName}
            onChange={(e) => setFormData({...formData, userName: e.target.value.replace(/\s/g, '')})}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => {
              setFormData({...formData, email: e.target.value});
              if (errors.email) setErrors({...errors, email: ""});
            }}
            required
          />
          {errors.email && <p style={{color: "red", fontSize: "12px"}}>{errors.email}</p>}
          
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => {
              setFormData({...formData, phone: e.target.value});
              if (errors.phone) setErrors({...errors, phone: ""});
            }}
            required
          />
          {errors.phone && <p style={{color: "red", fontSize: "12px"}}>{errors.phone}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        </div>

        <div className="role-group">
          <label>I am a:</label>
          <label><input type="radio" className="roleRadio" name="role" value="faculty" checked={formData.role === "faculty"} onChange={(e) => setFormData({...formData, role: e.target.value})}/>Faculty/Staff</label>
          <label><input type="radio" className="roleRadio" name="role" value="admin" checked={formData.role === "admin"} onChange={(e) => setFormData({...formData, role: e.target.value})}/>Admin</label>
          <label><input type="radio" className="roleRadio" name="role" value="student" checked={formData.role === "student"} onChange={(e) => setFormData({...formData, role: e.target.value})}/>Student</label>
        </div>

        <button type="submit" className="signup-btn">Create Account</button>

        <p className="login-link">
          Already have your account? <Link to="/">Log In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpProfile;