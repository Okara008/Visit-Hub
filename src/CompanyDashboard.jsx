import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CompanyDashboard.css";
import Navbar from "./NavbarCompany";

function CompanyDashboard() {
  const [companyName, setCompanyName] = useState("SkyReach Airlines");
  const [requests, setRequests] = useState([
    { id: 1, student: "Jane Doe", date: "2024-11-15", status: "Pending" },
    { id: 2, student: "Instiliy Smith", date: "2024-11-16", status: "Pending" },
    { id: 3, student: "John Smith", date: "2024-11-18", status: "Approved" },
    { id: 4, student: "Emily White", date: "2024-11-19", status: "Rejected" },
    { id: 5, student: "Pormred", date: "2024-11-20", status: "Completed" },
  ]);

  useEffect(() => {
    // Fetch data from Django backend
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/staff-dashboard/");
        setCompanyName(res.data.company_name || companyName);
        setRequests(res.data.requests || requests);
      } catch (err) {
        console.log("Backend not connected. Using mock data.");
      }
    };
    fetchRequests();
  }, []);

  const handleAction = (id, action) => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status: action === "approve" ? "Approved" : "Rejected" } : req
    );
    setRequests(updatedRequests);

    // Send to Django backend
    axios
      .post("http://127.0.0.1:8000/api/handle-request/", {
        id,
        action,
      })
      .then((res) => console.log("Action saved:", res.data))
      .catch(() => console.log("Mock mode - backend not active"));
  };

  return (<>
    <Navbar index="0"/>
    <div className="company-dashboard">
      <h2>Welcome, {companyName}!</h2>

      <div className="tab-header">Pending Visit Requests</div>

      <div className="request-table-container">
        <table className="request-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Proposed Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.student}</td>
                <td>{req.date}</td>
                <td>{req.status}</td>
                <td>
                  {req.status === "Pending" ? (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleAction(req.id, "approve")}
                      >
                        + Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleAction(req.id, "reject")}
                      >
                        ✕ Reject
                      </button>
                    </>
                  ) : (
                    <span>{req.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </> );
}

export default CompanyDashboard;
