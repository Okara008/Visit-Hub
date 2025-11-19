import React, { useState, useEffect } from "react";
import "./StudentPrepareRequest.css";
import Navbar from "./NavbarStudent";
import { useNavigate } from "react-router-dom";

function UserPrepareRequest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student_name: "",
    company: "",
    proposed_date: "",
    status: "pending",
    purpose: "",
    fullName: "",
    institution: "",
  });
  
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // Get current user from sessionStorage and companies from localStorage
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser) {
      setFormData(prev => ({ ...prev, student_name: currentUser.fullName }));
    }

    // Get selected company name from sessionStorage
    const selectedCompany = sessionStorage.getItem("selectedCompany");
    if (selectedCompany) {
      setFormData(prev => ({ ...prev, company: selectedCompany }));
    }

    // Get companies from localStorage
    const savedCompanies = JSON.parse(localStorage.getItem("allCompanies") || "[]");
    setCompanies(savedCompanies);
  }, []);

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validate date is in the future
    const selectedDate = new Date(formData.proposed_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only

    if (selectedDate <= today) {
      setMessage("Please select a future date ❌");
      setLoading(false);
      return;
    }

    // Get existing visits from localStorage
    const existingVisits = JSON.parse(localStorage.getItem("studentVisits"));
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"))
    // Create new visit object
    const newVisit = {
      id: Date.now(),
      company_name: formData.company,
      contact_email: `${formData.company.toLowerCase().replace(/\s+/g, '')}@example.com`,
      visit_date: formData.proposed_date,
      purpose: formData.purpose,
      status: formData.status,
      admin_reply: "",
      institution: currentUser.institution,
      fullName: currentUser.fullName
    };

    // Save to localStorage
    existingVisits.push(newVisit);
    localStorage.setItem("studentVisits", JSON.stringify(existingVisits));
    
    setMessage("Request submitted successfully ✅");
    
    // Reset form and clear sessionStorage
    setFormData(prev => ({
      ...prev,
      company: "",
      proposed_date: "",
      purpose: ""
    }));
    
    // Clear the selected company from sessionStorage
    sessionStorage.removeItem("selectedCompany");
    
    setLoading(false);
    
    // Navigate back after success
    // setTimeout(() => navigate("/StudentVisitsManagement"), 1000);
  };

  return (
    <>
      <Navbar index="1" person="user" />
      <div className="request-container">
        <div className="request-box">
          <h2>Submit a New Industrial Visit Request</h2>

          <form onSubmit={handleSubmit}>
            <div className="Input_Group">
              <label>Student Name</label>
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                disabled
              />
            </div>

            <div className="Input_Group">
              <label>Company</label>
              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a Company --</option>
                {companies.map((company, index) => (
                  <option key={index} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="Input_Group">
              <label>Proposed Date</label>
              <input
                type="date"
                name="proposed_date"
                value={formData.proposed_date}
                onChange={handleChange}
                min={getTodayDate()} // Prevent past dates
                required
              />
            </div>

            <div className="Input_Group">
              <label>Status</label>
              <input type="text" name="status" value={formData.status} readOnly />
            </div>

            <label>Purpose of Visit</label>
            <textarea
              name="purpose"
              placeholder="Enter the purpose of the visit"
              value={formData.purpose}
              onChange={handleChange}
              required
            />

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/StudentDashboard")}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn" >
                Submit Request
              </button>
            </div>
          </form>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default UserPrepareRequest;