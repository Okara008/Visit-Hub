import React, { useState, useEffect } from "react";
// import "./CompanyAdminFeedback.css"; // You'll need to create this CSS file
import Navbar from "./NavbarCompany";

function CompanyAdminFeedback() {
  const [adminFeedbacks, setAdminFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    loadAdminFeedbacks();
  }, []);

  const loadAdminFeedbacks = () => {
    setLoading(true);
    try {
      // 1. Get the current company name from sessionStorage
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      const currentCompanyName = currentUser?.fullName;

      if (!currentCompanyName) {
        console.error("Current company name not found. Cannot load feedback.");
        setCompanyName("Unknown Company");
        setLoading(false);
        return;
      }
      setCompanyName(currentCompanyName);

      // 2. Load the official institutional feedback from the dedicated key
      let allAdminFeedbacks = JSON.parse(localStorage.getItem("adminFeedback") || "[]");

      // 3. Filter feedbacks: only show those submitted FOR THIS specific company
      const filteredFeedbacks = allAdminFeedbacks.filter(
        (feedBack) => 
          feedBack.company === currentCompanyName &&
          feedBack.reviewer === "Admin" // Ensure it's explicitly the Admin submission
      );
      
      setAdminFeedbacks(filteredFeedbacks);

    } catch (error) {
      console.error("Error loading admin feedback:", error);
      setAdminFeedbacks([]);
    }
    setLoading(false);
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

  return (
    <>
      <Navbar index="5" />
      <div className="company-reportsn">
        <h2>Institutional Feedback Received - {companyName}</h2>
        <p>Review the official feedback submitted by Admin Institutions regarding your company.</p>

        {/* Feedback Table */}
        <div className="feedbacks-table-section">
          <h3>Official Institutional Submissions</h3>
          {loading ? (
            <p>Loading feedbacks...</p>
          ) : (
            <section className="table-scroll-section">
              <table className="feedbacks-table">
                <thead>
                  <tr>
                    <th className="table-th">S/N</th>
                    <th className="table-th">Institution</th>
                    <th className="table-th">Rating</th>
                    <th className="table-th">Feedback/Comments</th>
                    <th className="table-th">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {adminFeedbacks.length > 0 ? (
                    adminFeedbacks.map((feedback, index) => (
                      <tr key={feedback.id}>
                        <td className="table-td">{index + 1}</td>
                        {/* The institution field was added in the Admin component */}
                        <td className="table-td">**{feedback.institution}**</td> 
                        <td className="table-td">
                          <span title={`Rating: ${feedback.rating}/5`}>
                            {getRatingStars(feedback.rating)}
                          </span>
                        </td>
                        <td className="table-td feedback-cell">{feedback.feedback}</td>
                        <td className="table-td">{formatDate(feedback.date)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="table-td no-data-message">
                        No institutional feedback has been submitted for {companyName} yet.
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

export default CompanyAdminFeedback;