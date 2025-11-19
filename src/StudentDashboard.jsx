import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import Navbar from "./NavbarStudent";

function StudentDashboard() {
  const [studentName, setStudentName] = useState("Student");
  const [upcomingVisit, setUpcomingVisit] = useState(null);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    completed: 0
  });

  useEffect(() => {
    // Get data from localStorage
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (currentUser) {
      setStudentName(currentUser.fullName);
    }

    let visits = JSON.parse(localStorage.getItem("studentVisits") || "[]");
    visits = visits.filter(
      visit => visit.fullName === currentUser.fullName
    );
    // Calculate stats
    const pending = visits.filter(v => v.status === "pending").length;
    const approved = visits.filter(v => v.status === "approved").length;
    const completed = visits.filter(v => v.status === "completed").length;
    
    setStats({ pending, approved, completed });

    // Get next upcoming visit (approved status, closest future date)
    const today = new Date();
    const approvedVisits = visits.filter(v => v.status === "approved" ||  v.status === "pending")
    
    if (approvedVisits.length > 0) {
      // Sort by date and find the closest future visit
      const futureVisits = approvedVisits
        .filter(v => new Date(v.visit_date) >= today)
        .sort((a, b) => new Date(a.visit_date) - new Date(b.visit_date));
      
      setUpcomingVisit(futureVisits[0] || null);
    }
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
              <div className="stat-number">{stats.pending}</div>
            </div>
          </div>

          <div className="stat-card approved">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3>Approved Visits</h3>
              <div className="stat-number">{stats.approved}</div>
            </div>
          </div>

          <div className="stat-card completed">
            <div className="stat-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="stat-content">
              <h3>Completed Visits</h3>
              <div className="stat-number">{stats.completed}</div>
            </div>
          </div>
        </div>

        {/* Upcoming Visits Section */}
        <div className="upcoming-visits">
          <h3 className="visitH3">Next Upcoming Visit</h3>
          <div className="visit-cards">
            {upcomingVisit ? (
              <div className="visit-card approved">
                <div className="visit-header">
                  <h4>{upcomingVisit.company_name}</h4>
                  <span className="status-badge approved">{upcomingVisit.status}</span>
                </div>
                <div className="visit-date">
                  <i className="fas fa-calendar-alt"></i>
                  {formatDate(upcomingVisit.visit_date)}
                </div>
                <div className="visit-purpose">
                  <p>{upcomingVisit.purpose}</p>
                </div>
              </div>
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