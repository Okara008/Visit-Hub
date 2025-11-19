import React, { useEffect, useState } from "react";
import "./CompanyDashboard.css";
import Navbar from "./NavbarCompany";

function CompanyDashboard() {
  const [companyName, setCompanyName] = useState("");
  const [totalInstitutions, setTotalInstitutions] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [avgStudentsPerVisit, setAvgStudentsPerVisit] = useState(0);

  useEffect(() => {
    const fetchData = () => {
      try {
        // Get current company user
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || '{}');
        setCompanyName(currentUser.fullName || "Company");

        // Get total institutions from allInstitution localStorage
        const allInstitutions = JSON.parse(localStorage.getItem('allInstitutions') || '[]');
        setTotalInstitutions(allInstitutions.length);

        // Get visits data from institutionVisits localStorage
        const institutionVisits = JSON.parse(localStorage.getItem('institutionVisits') || '{}');
        
        let total = 0;
        let totalStudents = 0;

        // Calculate visits statistics across all institutions
        Object.values(institutionVisits).forEach(institutionArray => {
          if (Array.isArray(institutionArray)) {
            institutionArray.forEach(visit => {
              if (visit.company === currentUser.fullName) {
                total++;
                totalStudents += Number(visit.students) || 0;
              }
            });
          }
        });

        // Calculate average students per visit (regardless of status)
        const avgStudents = total > 0 ? Math.round(totalStudents / total) : 0;

        setTotalVisits(total);
        setAvgStudentsPerVisit(avgStudents);

      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  return (<>
    <Navbar index="0" person="company"/>
    <div className="company-dashboard">
      <h2 className="h2">Welcome, {companyName}!</h2>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-university"></i>
          </div>
          <div className="stat-content">
            <h3>Total Institutions</h3>
            <div className="stat-number">{totalInstitutions}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="stat-content">
            <h3>Total Visits</h3>
            <div className="stat-number">{totalVisits}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>Avg. Students/Visit</h3>
            <div className="stat-number">{avgStudentsPerVisit}</div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default CompanyDashboard;