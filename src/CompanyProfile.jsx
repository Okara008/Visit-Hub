import React, { useEffect, useState } from "react";
// import "./CompanyProfile.css";
import Navbar from './NavbarCompany.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';

function CompanyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    companyName: "",
    userName: "",
    lineOfBusiness: "",
    location: "",
    website: "",
    email: "",
    phone: "",
    maxVisits: "",
  });

  // 🧠 Fetch user profile from Django
  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchProfile();
  }, []);

  // ✏️ Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  // 💾 Save updated profile to Django
  const handleSave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
                  name="companyName"
                  value={profileData.companyName}
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
                <label>Website:</label>
                <input
                  type="text"
                  name="website"
                  value={profileData.website}
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
