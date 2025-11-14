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
    status: "Pending",
    purpose: "",
    maxTotal: "44",
    currentTotal: "22",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🧠 Fetch student info from Django backend
  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/student/profile/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming Django returns { name: "John Doe" }
          setFormData((prev) => ({ ...prev, student_name: data.name }));
        } else {
          console.warn("Backend not available, using mock name.");
          setFormData((prev) => ({ ...prev, student_name: "John Doe" })); // mock name
        }
      } catch (error) {
        console.error("Error fetching student name:", error);
        setFormData((prev) => ({ ...prev, student_name: "John Doe" })); // fallback
      }
    };

    fetchStudentName();
  }, []);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/requests/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`, // if token auth
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Request submitted successfully ✅");
        setFormData((prev) => ({
          ...prev,
          company: "",
          proposed_date: "",
          status: "Pending",
          purpose: "",
        }));
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || "Error submitting request ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server connection failed ❌");
    } finally {
      setLoading(false);
    }
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
                <option value="TechNova Industries">TechNova Industries</option>
                <option value="Green Energy Co.">Green Energy Co.</option>
                <option value="AeroLink Solutions">AeroLink Solutions</option>
                <option value="AgriSmart Nigeria">AgriSmart Nigeria</option>
                <option value="CyberGrid Technologies">CyberGrid Technologies</option>
                <option value="BuildRight Construction">BuildRight Construction</option>
                <option value="FoodCare Industries">FoodCare Industries</option>
                <option value="SkyReach Airlines">SkyReach Airlines</option>
                <option value="Medilife Health Ltd">Medilife Health Ltd</option>
                <option value="AquaPure Nigeria">AquaPure Nigeria</option>
                <option value="Softwave Systems">Softwave Systems</option>
                <option value="SafeHaul Logistics">SafeHaul Logistics</option>
                <option value="SolarRise Energy">SolarRise Energy</option>
                <option value="EduSmart Academy">EduSmart Academy</option>
                <option value="FinTrust Bank">FinTrust Bank</option>
                <option value="SteelPro Manufacturing">SteelPro Manufacturing</option>
                <option value="ClearView Media">ClearView Media</option>
                <option value="GreenHub Recycling">GreenHub Recycling</option>
                <option value="UrbanTech Designs">UrbanTech Designs</option>
                <option value="FarmLink Agro">FarmLink Agro</option>
              </select>
            </div>

            <div className="Input_Group">
              <label>Proposed Date</label>
              <input
                type="date"
                name="proposed_date"
                value={formData.proposed_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Input_Group">
              <label>Status</label>
              <input type="text" name="status" value={formData.status} readOnly />
            </div>

            <div className="Input_Group">
              <label>Available Slots</label>
              <p>
                {formData.currentTotal} / {formData.maxTotal}
              </p>
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
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Request"}
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
