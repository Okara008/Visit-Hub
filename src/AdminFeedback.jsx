import React, { useState, useEffect } from "react";
import "./AdminFeedback.css";
import Navbar from "./NavbarAdmin";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    rating: "",
    feedback: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    try {
      // Get feedbacks from localStorage
      const savedFeedbacks = JSON.parse(localStorage.getItem("studentFeedback") || "[]");
      setFeedbacks(savedFeedbacks);
      
      // Get companies from localStorage
      const savedCompanies = JSON.parse(localStorage.getItem("companies") || "[]");
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

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing feedbacks from localStorage
    const existingFeedbacks = JSON.parse(localStorage.getItem("studentFeedback") || "[]");
    
    // Create new feedback object
    const newFeedback = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
      reviewer: "Admin"
    };

    // Save to localStorage
    existingFeedbacks.push(newFeedback);
    localStorage.setItem("studentFeedback", JSON.stringify(existingFeedbacks));
    
    // Update state
    setFeedbacks(existingFeedbacks);
    setFormData({ company: "", rating: "", feedback: "" });
    setSubmitted(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const formatDate = (dateString) => {
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
    return stars[rating] || rating;
  };

  const getCompanyInfo = (companyName) => {
    const company = companies.find(c => c.name === companyName);
    return company || { name: companyName, industry: 'Unknown' };
  };

  return (
    <>
      <Navbar index="6" />
      <div className="feedback-container">
        <h2>Company Feedback</h2>
        <p>Provide feedback about companies and view all students feedback submissions.</p>

        {/* Feedback Form */}
        <div className="feedback-form-section">
          <h3>Submit Company Feedback</h3>
          {submitted && (
            <div className="success-msg">✅ Thank you! Your feedback has been submitted.</div>
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
                placeholder="Write your feedback about the company..."
                required
              ></textarea>
            </label>

            <button type="submit" className="submit-btn">Submit Feedback</button>
          </form>
        </div>

        {/* Feedbacks Table */}
        <div className="feedbacks-table-section">
          <h3>All Students Feedbacks</h3>
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
                        No admin feedback submissions found.
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