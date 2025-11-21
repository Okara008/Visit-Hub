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
    let allCompanies = [
      {
        id: 1,
        name: "TechNova Industries",
        industry: "Manufacturing",
        location: "Lagos",
        email: "info@technova.com",
        contactNumber: "+234-801-234-5678"
      },
      {
        id: 2,
        name: "Green Energy Co.",
        industry: "Renewable Energy",
        location: "Abuja",
        email: "contact@greenenergy.com",
        contactNumber: "+234-802-345-6789"
      },
      {
        id: 3,
        name: "AeroLink Solutions",
        industry: "Aerospace",
        location: "Port Harcourt",
        email: "hello@aerolink.com",
        contactNumber: "+234-803-456-7890"
      },
      {
        id: 4,
        name: "AgriSmart Nigeria",
        industry: "Agriculture",
        location: "Ibadan",
        email: "support@agrismart.com",
        contactNumber: "+234-804-567-8901"
      },
      {
        id: 5,
        name: "CyberGrid Technologies",
        industry: "IT Services",
        location: "Enugu",
        email: "team@cybergrid.com",
        contactNumber: "+234-805-678-9012"
      },
      {
        id: 6,
        name: "BuildRight Construction",
        industry: "Civil Engineering",
        location: "Lagos",
        email: "contact@buildright.com",
        contactNumber: "+234-806-789-0123"
      },
      {
        id: 7,
        name: "FoodCare Industries",
        industry: "Food Processing",
        location: "Ogun",
        email: "info@foodcare.com",
        contactNumber: "+234-807-890-1234"
      },
      {
        id: 8,
        name: "SkyReach Airlines",
        industry: "Aviation",
        location: "Abuja",
        email: "service@skyreach.com",
        contactNumber: "+234-808-901-2345"
      },
      {
        id: 9,
        name: "Medilife Health Ltd",
        industry: "Healthcare",
        location: "Benin",
        email: "info@medilife.com",
        contactNumber: "+234-809-012-3456"
      },
      {
        id: 10,
        name: "AquaPure Nigeria",
        industry: "Water Treatment",
        location: "Lagos",
        email: "hello@aquapure.com",
        contactNumber: "+234-810-123-4567"
      },
      {
        id: 11,
        name: "Softwave Systems",
        industry: "Software Development",
        location: "Port Harcourt",
        email: "team@softwave.com",
        contactNumber: "+234-811-234-5678"
      },
      {
        id: 12,
        name: "SafeHaul Logistics",
        industry: "Transportation",
        location: "Abuja",
        email: "contact@safehaul.com",
        contactNumber: "+234-812-345-6789"
      },
      {
        id: 13,
        name: "SolarRise Energy",
        industry: "Solar Technology",
        location: "Kano",
        email: "info@solarrise.com",
        contactNumber: "+234-813-456-7890"
      },
      {
        id: 14,
        name: "EduSmart Academy",
        industry: "Education",
        location: "Lagos",
        email: "hello@edusmart.com",
        contactNumber: "+234-814-567-8901"
      },
      {
        id: 15,
        name: "FinTrust Bank",
        industry: "Finance",
        location: "Abuja",
        email: "contact@fintrust.com",
        contactNumber: "+234-815-678-9012"
      },
      {
        id: 16,
        name: "SteelPro Manufacturing",
        industry: "Steel & Metal Works",
        location: "Kaduna",
        email: "support@steelpro.com",
        contactNumber: "+234-816-789-0123"
      },
      {
        id: 17,
        name: "ClearView Media",
        industry: "Advertising",
        location: "Lagos",
        email: "info@clearviewmedia.com",
        contactNumber: "+234-817-890-1234"
      },
      {
        id: 18,
        name: "GreenHub Recycling",
        industry: "Environment",
        location: "Abeokuta",
        email: "hello@greenhub.com",
        contactNumber: "+234-818-901-2345"
      },
      {
        id: 19,
        name: "UrbanTech Designs",
        industry: "Architecture",
        location: "Lagos",
        email: "team@urbantech.com",
        contactNumber: "+234-819-012-3456"
      },
      {
        id: 20,
        name: "FarmLink Agro",
        industry: "AgriTech",
        location: "Enugu",
        email: "info@farmlink.com",
        contactNumber: "+234-820-123-4567"
      }
    ]
    allCompanies = JSON.stringify(allCompanies)
    localStorage.setItem("allCompanies", allCompanies);

    let allInstitutions = [
		{
			id: 1,
			name: "University of Lagos",
			location: "Lagos",
			email: "info@unilag.edu.ng",
			phone: "+234 810 234 5678"
		},
		{
			id: 2,
			name: "University of Nigeria Nsukka",
			location: "Enugu",
			email: "info@unn.edu.ng",
			phone: "+234 809 456 7890"
		},
		{
			id: 3,
			name: "Federal University of Technology Akure",
			location: "Ondo",
			email: "contact@futa.edu.ng",
			phone: "+234 703 222 3344"
		},
		{
			id: 4,
			name: "Babcock University",
			location: "Ilishan",
			email: "hello@oauife.edu.ng",
			phone: "+234 816 556 7788"
		},
		{
			id: 5,
			name: "Covenant University",
			location: "Ota",
			email: "info@covenantuniversity.edu.ng",
			phone: "+234 802 889 4433"
		}
  	]
	allInstitutions = JSON.stringify(allInstitutions);
	localStorage.setItem("allInstitutions", allInstitutions);
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