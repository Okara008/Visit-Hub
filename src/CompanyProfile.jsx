import React, { useEffect, useState } from "react";
// import "./CompanyProfile.css";
import Navbar from './NavbarCompany.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    userName: "",
    lineOfBusiness: "",
    location: "",
    email: "",
    phone: "",
    maxVisits: "",
  });

  // 🧠 Fetch user profile from localStorage
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser) {
      setProfileData(currentUser);
    }
  }, []);

  // ✏️ Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // 💾 Save updated profile to localStorage
  const handleSave = () => {
    // Update current user in sessionStorage
    sessionStorage.setItem("currentUser", JSON.stringify(profileData));
    
    // Update user in the main users list in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(user => 
      user.userName === profileData.userName ? profileData : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  return (<>
    <Navbar index="4" />
    <div className="profile-container">
      <div className="profile-box">

        <div className="headContainer">
            <div className="profile-avatar">
              <FontAwesomeIcon icon={faUser} className="avatar-circle"/>
            </div>
            
            <h2>My Profile</h2>
        </div>

        <form className="profile-form">
          <div className="inputContainer">
              <div className="form-row">
                <label>Company Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-row">
                <label>User Name:</label>
                <input
                  type="text"
                  name="userName"
                  value={profileData.userName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="form-row">
                <label>Line Of Business:</label>
                <input
                  type="text"
                  name="lineOfBusiness"
                  value={profileData.lineOfBusiness}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-row">
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={profileData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-row">
                <label>Max Visits:</label>
                <input
                  type="text"
                  name="maxVisits"
                  value={profileData.maxVisits}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-row">
                <label>Contact Email:</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-row">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
          </div>

          {isEditing ? (
            <button
              type="button"
              className="save-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </form>
      </div>
    </div>
  </>);
}

export default CompanyProfile;