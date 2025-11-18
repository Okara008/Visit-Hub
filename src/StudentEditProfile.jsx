import React, { useEffect, useState } from "react";
// import "./StudentEditProfile.css";
import Navbar from './NavbarStudent.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faEnvelope , faBook, faBuilding, faUser, faList  } from '@fortawesome/free-solid-svg-icons';

function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    userName: "",
    matric_number: "",
    institution: "",
    password: "",
    department: "",
    email: "",
    phone: "",
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
    try {
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
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update profile");
    }
  };

  return (<>
    <Navbar index="4" person="user"/>
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
                <label>Full Name:</label>
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
                <label>Matric Number:</label>
                <input
                  type="text"
                  name="matric_number"
                  value={profileData.matric_number}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-row">
                <label>Institution:</label>
                <input
                  type="text"
                  name="institution"
                  value={profileData.institution}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-row">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={profileData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-row">
                <label>Department:</label>
                <input
                  type="text"
                  name="department"
                  value={profileData.department}
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

export default EditProfile;