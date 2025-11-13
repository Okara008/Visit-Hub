import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import Navbar from "./NavbarStudent";
import axios from 'axios';

function StudentDashboard() {
  const [studentName, setStudentName] = useState("John Doe"); // mock name
  const [visits, setVisits] = useState([
    { id: 1, company: "TechNova Industries", status: "Pending", date: "2024-10-26" },
    { id: 2, company: "SkyReach Airlines", status: "Approved", date: "2024-09-15" },
    { id: 3, company: "Medilife Health Ltd", status: "Completed", date: "2024-08-01" },
    { id: 4, company: "Softwave Systems", status: "Pending", date: "2024-11-03" },
    { id: 5, company: "SteelPro Manufacturing", status: "Completed", date: "2024-07-10" },
  ]);

  useEffect(() => {
    // Fetch name and visits from backend (Django)
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/dashboard/");
        setStudentName(res.data.student_name || studentName);
        setVisits(res.data.visits || visits);
      } catch (err) {
        console.log("Backend not connected, using mock data.");
      }
    };

    fetchDashboardData();
  }, []);

  // Count visits by status
  const pendingVisits = visits.filter(v => v.status === "Pending").length;
  const approvedVisits = visits.filter(v => v.status === "Approved").length;
  const completedVisits = visits.filter(v => v.status === "Completed").length;

  // Get upcoming visits (pending and approved)
  const upcomingVisits = visits.filter(v => v.status === "Completed");

  return (
    <>
      <Navbar index="0" person="user"/>
      <div className="dashboard">
        <h2 className="studenth1">Welcome, {studentName}!</h2>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="stat-card pending">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-content">
              <h3>Pending Visits</h3>
              <div className="stat-number">{pendingVisits}</div>
            </div>
          </div>

          <div className="stat-card approved">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3>Approved Visits</h3>
              <div className="stat-number">{approvedVisits}</div>
            </div>
          </div>

          <div className="stat-card completed">
            <div className="stat-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="stat-content">
              <h3>Completed Visits</h3>
              <div className="stat-number">{completedVisits}</div>
            </div>
          </div>
        </div>

        {/* Upcoming Visits Section */}
        <div className="upcoming-visits">
          <h3 className="visitH3">Upcoming Visit</h3>
          <div className="visit-cards">
            {upcomingVisits.length > 0 ? (
              upcomingVisits.map((visit) => (
                <div key={visit.id} className={`visit-card ${visit.status.toLowerCase()}`}>
                  <div className="visit-header">
                    <h4>{visit.company}</h4>
                  </div>
                  <div className="visit-date">
                    <i className="fas fa-calendar-alt"></i>
                    {visit.date}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-visits">No upcoming visits scheduled.</p>
            )}
          </div>
        </div>

      </div>
    </>
  );
}

export default StudentDashboard;