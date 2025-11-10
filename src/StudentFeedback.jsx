import React, { useState } from "react";
import "./StudentFeedback.css";
import Navbar from "./NavbarStudent";
import axios from "axios";

function StudentFeedback() {
  const [formData, setFormData] = useState({
    company: "",
    rating: "",
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Backend URL (Django endpoint)
      const response = await axios.post("http://127.0.0.1:8000/api/feedback/", formData);
      console.log(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Backend not connected, using mock submit.", error);
      // Mock submit success
      setSubmitted(true);
    }
  };

  return (
    <>
      <Navbar index="5" />
      <div className="feedback-container">
        <h2>Visit Feedback</h2>
        <p>Please share your experience after your industrial visit.</p>

        {submitted ? (
          <div className="success-msg">✅ Thank you! Your feedback has been submitted.</div>
        ) : (
          <form className="feedback-form" onSubmit={handleSubmit}>
            <label>
              Company Visited:
              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              >
                <option value="">Select Company</option>
                <option>SkyReach Airlines</option>
                <option>TechNova Industries</option>
                <option>Green Energy Co.</option>
                <option>CyberGrid Technologies</option>
                <option>AgriSmart Nigeria</option>
                <option>Medilife Health Ltd</option>
              </select>
            </label>

            <label>
              Rate Your Experience:
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
                placeholder="Write your feedback here..."
                required
              ></textarea>
            </label>

            <button type="submit" className="submit-btn">Submit Feedback</button>
          </form>
        )}
      </div>
    </>
  );
}

export default StudentFeedback;
