import React, { useEffect, useState } from "react";
import "./SignUpProfile.css";


function SignUpProfile() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value });
  };

	function deleteWhiteSpace(e){
		if(e.key == " "){
			e.target.value = e.target.value.substring(0, (e.target.value.length-1)).trim();
		}
	}

const handleSubmit = async (e) => {
	e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
		alert("Passwords do not match!");
		return;
    }

    try {
		const response = await fetch("http://127.0.0.1:8000/api/register/", {
        	method: "POST",
        	headers: { "Content-Type": "application/json" },
        	body: JSON.stringify(formData),
		});
      
		if (response.ok) {
			alert("Account created successfully!");
			setFormData({
				fullName: "",
				userName: "",
				email: "",
				phone: "",
				institution: "",
				department: "",
				password: "",
				location: "",
				confirmPassword: "",
				role: "",
			});
			const roleRadio = Array.from(document.querySelectorAll(".roleRadio"))
	
			switch (true) {
				case roleRadio[0].checked:
					window.location.href = "/CompanyDashboard"
					
					break;
			
				case roleRadio[1].checked:
					window.location.href = "/AdminDashboard"
					
					break;
			
				case roleRadio[2].checked:
					window.location.href = "/StudentDashboard"
					
					break;
			
				default:
					break;
			}

		} 
		
		else {
			const errorData = await response.json();
			alert(errorData.detail || "Something went wrong!");
		}
	} 
	catch (error) {
	  alert("Error connecting to server.");
	}
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
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="userName"
                placeholder="User Name (No whitespaces ' ')"
                value={formData.userName}
                onChange={handleChange}
                onKeyUp={deleteWhiteSpace}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            
            
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            
              {/* <input
                type="text"
                name="location"
                placeholder="Location(State)"
                value={formData.location}
                onChange={handleChange}
                required
              /> */}

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            
            
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            
          </div>

          <div className="role-group">
            <label>I am a:</label>
            
			<label>
				<input type="radio" className="roleRadio" name="role" value="faculty" checked={formData.role === "faculty"} onChange={handleChange}/>
				Faculty/Staff
            </label>
            
			<label>
				<input type="radio" className="roleRadio" name="role" value="admin" checked={formData.role === "admin"} onChange={handleChange}/>
				Admin
            </label>
            
			<label>
				<input type="radio" className="roleRadio" name="role" value="student" checked={formData.role === "student"} onChange={handleChange}/>
				Student
            </label>
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>

          <p className="login-link">
            Already have your account? <a href="./">Log In</a>
          </p>
        </form>
		<div className="data">role</div>
      </div>
  );
}

export default SignUpProfile;
