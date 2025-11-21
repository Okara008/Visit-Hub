import React, { useState, useEffect } from 'react';
import './CompanyVisitManagement.css';
import Navbar from "./NavbarCompany";

const CompanyVisitManagement = () => {
  const [companyVisits, setCompanyVisits] = useState([]);
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    loadCompanyVisits();
  }, []);

  const loadCompanyVisits = () => {
  try {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    // Ensure currentUser exists and has the required fullName property
    if (!currentUser || !currentUser.fullName) {
      console.error("Current user or company name not found in sessionStorage.");
      setCompanyVisits([]);
      setCompanyName('');
      return;
    }
    const currentCompany = currentUser.fullName;
    setCompanyName(currentCompany);

    let institutionVisits = JSON.parse(localStorage.getItem("institutionVisits") || "{}");
    let storedCompanyVisits = JSON.parse(localStorage.getItem("companyVisits") || "{}");

    // Initialize or clear the existing visits for this company to prevent stale/empty rows
    let existingVisits = {}; 

    // Only process institutions that have visits for this company
    Object.keys(institutionVisits).forEach(institutionKey => {
      const visitRecords = institutionVisits[institutionKey];
      
      if (Array.isArray(visitRecords)) {
        visitRecords.forEach(record => {
          if (record.company === currentCompany) {
            // Only add if it matches current company
            existingVisits[institutionKey] = {
              institution: institutionKey,
              // Use approvedStudents, students, or visits, defaulting to 0
              approvedStudents: record.students || record.visits || record.approvedStudents || 0,
              companyStatus: record.companyStatus || "pending"
            };
          }
        });
      } else if (visitRecords && visitRecords.company === currentCompany) {
        // Only add if it matches current company
        existingVisits[institutionKey] = {
          institution: institutionKey,
          // Use approvedStudents, students, or visits, defaulting to 0
          approvedStudents: visitRecords.students || visitRecords.visits || visitRecords.approvedStudents || 0,
          companyStatus: visitRecords.companyStatus || "pending"
        };
      }
    });

    console.log("Processed visits:", existingVisits);

    // Update the companyVisits object in localStorage with the newly processed, clean data
    storedCompanyVisits[currentCompany] = existingVisits;
    localStorage.setItem("companyVisits", JSON.stringify(storedCompanyVisits));

    // Convert object to array for state and rendering
    const visitsArray = Object.values(existingVisits);
    setCompanyVisits(visitsArray);
    
  } catch (err) {
    console.log("Error loading visits:", err);
    setCompanyVisits([]);
  }
};


  const handleApprove = (institution) => {
    let storedCompanyVisits = JSON.parse(localStorage.getItem("companyVisits") || "{}");

    if (storedCompanyVisits[companyName] && storedCompanyVisits[companyName][institution]) {
      // Update the specific institution in the object
      storedCompanyVisits[companyName][institution] = {
        ...storedCompanyVisits[companyName][institution],
        companyStatus: "approved"
      };

      // --- CRITICAL: Must also update the source data (institutionVisits) for persistence ---
      let institutionVisits = JSON.parse(localStorage.getItem("institutionVisits") || "{}");
      if (institutionVisits[institution]) {
        if (Array.isArray(institutionVisits[institution])) {
          // Find and update the record that matches the companyName
          const recordIndex = institutionVisits[institution].findIndex(r => r.company === companyName);
          if (recordIndex !== -1) {
            institutionVisits[institution][recordIndex].companyStatus = "approved";
          }
        } else if (institutionVisits[institution].company === companyName) {
          institutionVisits[institution].companyStatus = "approved";
        }
        localStorage.setItem("institutionVisits", JSON.stringify(institutionVisits));
      }
      // --- END CRITICAL SECTION ---

      localStorage.setItem("companyVisits", JSON.stringify(storedCompanyVisits));

      // Convert object to array for state
      const visitsArray = Object.values(storedCompanyVisits[companyName]);
      setCompanyVisits(visitsArray);
    }
  };

  const handleReject = (institution) => {
    if (!window.confirm("Reject all pending visits from this institution?")) return;

    let storedCompanyVisits = JSON.parse(localStorage.getItem("companyVisits") || "{}");

    if (storedCompanyVisits[companyName] && storedCompanyVisits[companyName][institution]) {
      // Update the specific institution in the object
      storedCompanyVisits[companyName][institution] = {
        ...storedCompanyVisits[companyName][institution],
        companyStatus: "rejected"
      };

      // --- CRITICAL: Must also update the source data (institutionVisits) for persistence ---
      let institutionVisits = JSON.parse(localStorage.getItem("institutionVisits") || "{}");
      if (institutionVisits[institution]) {
        if (Array.isArray(institutionVisits[institution])) {
          // Find and update the record that matches the companyName
          const recordIndex = institutionVisits[institution].findIndex(r => r.company === companyName);
          if (recordIndex !== -1) {
            institutionVisits[institution][recordIndex].companyStatus = "rejected";
          }
        } else if (institutionVisits[institution].company === companyName) {
          institutionVisits[institution].companyStatus = "rejected";
        }
        localStorage.setItem("institutionVisits", JSON.stringify(institutionVisits));
      }
      // --- END CRITICAL SECTION ---


      localStorage.setItem("companyVisits", JSON.stringify(storedCompanyVisits));

      // Convert object to array for state
      const visitsArray = Object.values(storedCompanyVisits[companyName]);
      setCompanyVisits(visitsArray);
    }
  };

  return (
    <>
      {/* Assuming NavbarCompany is imported and handles navigation */}
      <Navbar index="1" person="company" /> 
      <div className="company-visit">
        <div className="container">
          <div className="header">
            <h1>Visit Requests - {companyName}</h1>
            <div className="stats">
              <span>**{companyVisits.filter(v => v.companyStatus === 'pending').length} pending**</span>
            </div>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Institution</th>
                  <th>Students Count</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {companyVisits.length > 0 ? (
                  companyVisits.map((visit, index) => (
                    // Ensure that a visit has an institution name before rendering
                    // This handles any remaining corrupted data gracefully.
                    visit.institution ? ( 
                      <tr key={index}>
                        <td>{visit.institution}</td>
                        <td>{visit.approvedStudents}</td>
                        <td>
                          {/* Note: CSS for .status .pending, .approved, .rejected is required */}
                          <span className={`status ${visit.companyStatus}`}>
                            {visit.companyStatus.charAt(0).toUpperCase() + visit.companyStatus.slice(1)}
                          </span>
                        </td>
                        <td>
                          {visit.companyStatus === "pending" ? (
                            <div className="actions">
                              <button 
                                className="approve" 
                                onClick={() => handleApprove(visit.institution)}
                              >
                                Accept
                              </button>
                              <button 
                                className="reject" 
                                onClick={() => handleReject(visit.institution)}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <div className="actions">
                              {/* Disabled buttons with inline styles for a grayed-out look */}
                              <button 
                                disabled 
                                className="approve"
                                style={{ 
                                  backgroundColor: '#e0e0e0', // Light Gray
                                  color: '#666',           // Darker text color
                                  cursor: 'not-allowed',    // Disabled cursor
                                  border: '1px solid #c0c0c0'
                                }}
                              >
                                Accept
                              </button>
                              <button 
                                disabled 
                                className="reject"
                                style={{ 
                                  backgroundColor: '#e0e0e0', // Light Gray
                                  color: '#666',           // Darker text color
                                  cursor: 'not-allowed',    // Disabled cursor
                                  border: '1px solid #c0c0c0'
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ) : null // Skip rendering if institution name is missing
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                      No visit requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyVisitManagement;