import React, { useState, useEffect } from "react";
import "./AdminFeedback.css";
import Navbar from "./NavbarAdmin";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); 
  const [formData, setFormData] = useState({
    company: "",
    rating: "",
    feedback: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const user = JSON.parse(sessionStorage.getItem("currentUser"));
      setCurrentUser(user);
    } catch (error) {
      console.error("Error loading current user:", error);
    }
  }, []); 

  useEffect(() => {
      if (currentUser) {
          fetchData();
      }
  }, [currentUser]);


  const fetchData = () => {
    setLoading(true);
    try {
      const currentInstitutionName = currentUser?.institution;

      // --- 1. Get Student Feedbacks for the table from "studentFeedback" ---
      let savedFeedbacks = JSON.parse(localStorage.getItem("studentFeedback") || "[]");
      
      // Filter feedbacks to only show SUBMISSIONS MADE BY STUDENTS for THIS Institution.
      // We explicitly exclude entries tagged as "Admin" (which are now saved in a separate key anyway, 
      // but this filter ensures no legacy Admin data shows up here).
      const studentFeedbacks = savedFeedbacks.filter(
        (feedBack) => 
            feedBack.institution === currentInstitutionName &&
            feedBack.reviewer !== "Admin" 
      );
      setFeedbacks(studentFeedbacks);
      
      // --- 2. Get Companies ---
      const savedCompanies = JSON.parse(localStorage.getItem("allCompanies") || "[]"); // Assuming "allCompanies" is the key
      setCompanies(savedCompanies);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFeedbacks([]);
      setCompanies([]);
    }
    setLoading(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit (Admin submits official feedback)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentUser || !currentUser.institution) {
        alert("Cannot submit feedback. Institution information is missing.");
        return;
    }

    // *** CORRECTION: Get and save feedback to the new "adminFeedback" key ***
    const existingAdminFeedbacks = JSON.parse(localStorage.getItem("adminFeedback") || "[]");
    
    const newFeedback = {
      id: Date.now(), 
      company: formData.company,
      rating: formData.rating,
      feedback: formData.feedback,
      date: new Date().toISOString().split('T')[0],
      institution: currentUser.institution, 
      // Keep the reviewer tag for clarity and company-side filtering
      reviewer: "Admin" 
    };

    // Save the institutional feedback to the dedicated "adminFeedback" key
    existingAdminFeedbacks.push(newFeedback);
    localStorage.setItem("adminFeedback", JSON.stringify(existingAdminFeedbacks));
    // *** END CORRECTION ***
    
    // Update the student feedback table data (which is fetched from "studentFeedback")
    fetchData();
    
    setFormData({ company: "", rating: "", feedback: "" });
    setSubmitted(true);
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRatingStars = (rating) => {
    const stars = {
      '5': '⭐⭐⭐⭐⭐',
      '4': '⭐⭐⭐⭐',
      '3': '⭐⭐⭐',
      '2': '⭐⭐',
      '1': '⭐'
    };
    return stars[String(rating)] || rating;
  };

  const getCompanyInfo = (companyName) => {
    const company = companies.find(c => c.name === companyName); 
    return company || { name: companyName, industry: 'Unknown' }; 
  };
  
  if (!currentUser) {
      return (
          <>
            <Navbar index="6" />
            <div className="feedback-container" style={{ textAlign: 'center', padding: '50px' }}>
                <p>Loading user session...</p>
            </div>
          </>
      );
  }


  return (
    <>
      <Navbar index="6" />
      <div className="feedback-container">
        <h2>Company Feedback - Admin ({currentUser.institution})</h2>
        <p>Submit official institutional feedback and view all student submissions.</p>

        {/* Feedback Form (Admin Submission) */}
        <div className="feedback-form-section">
          <h3>Submit Official Institutional Feedback</h3>
          {submitted && (
            <div className="success-msg">✅ Thank you! Your institutional feedback has been submitted (Saved to **adminFeedback**).</div>
          )}
          <form className="feedback-form" onSubmit={handleSubmit}>
            <label>
              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              >
                <option value="">Select Company</option>
                {companies.map((company, index) => (
                  <option key={index} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Rate Company:
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              >
                <option value="">Select Rating</option>
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Very Good</option>
                <option value="3">⭐⭐⭐ Good</option>
                <option value="2">⭐⭐ Fair</option>
                <option value="1">⭐ Poor</option>
              </select>
            </label>

            <label>
              Feedback / Comments:
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Write your official feedback about the company..."
                required
              ></textarea>
            </label>

            <button type="submit" className="submit-btn">Submit Feedback</button>
          </form>
        </div>

        {/* Feedbacks Table (View Student Submissions) */}
        <div className="feedbacks-table-section">
          <h3>Student Feedbacks Collected by {currentUser.institution}</h3>
          {loading ? (
            <p>Loading feedbacks...</p>
          ) : (
            <section className="table-scroll-section">
              <table className="feedbacks-table">
                <thead>
                  <tr>
                    <th className="table-th">S/N</th>
                    <th className="table-th">Company</th>
                    <th className="table-th">Industry</th>
                    <th className="table-th">Rating</th>
                    <th className="table-th">Feedback</th>
                    <th className="table-th">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.length > 0 ? (
                    feedbacks.map((feedback, index) => {
                      const companyInfo = getCompanyInfo(feedback.company);
                      return (
                        <tr key={feedback.id}>
                          <td className="table-td">{index + 1}</td>
                          <td className="table-td">{companyInfo.name}</td>
                          <td className="table-td">{companyInfo.industry}</td>
                          <td className="table-td">
                            <span title={`Rating: ${feedback.rating}/5`}>
                              {getRatingStars(feedback.rating)}
                            </span>
                          </td>
                          <td className="table-td feedback-cell">{feedback.feedback}</td>
                          <td className="table-td">{formatDate(feedback.date)}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="table-td no-data-message">
                        No student feedback submissions found for {currentUser.institution}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminFeedback;