import React, { useState, useEffect } from 'react';
import './CompanyVisitManagement.css';
import Navbar from "./NavbarCompany";

const CompanyVisitManagement = () => {
  const [groupedVisits, setGroupedVisits] = useState([]);
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    const fetchVisits = () => {
      try {
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

        // Get institutionVisits from localStorage - now it's an object
        const institutionVisitsObj = JSON.parse(localStorage.getItem('institutionVisits') || '{}');
        
        // Get visits for current user's company from ALL institutions
        let companyVisits = [];
        
        // Loop through all institutions and collect visits for this company
        Object.values(institutionVisitsObj).forEach(institutionVisits => {
          if (Array.isArray(institutionVisits)) {
            const filteredVisits = institutionVisits.filter(visit => 
              visit.company === currentUser.fullName
            );
            companyVisits = [...companyVisits, ...filteredVisits];
          }
        });

        // Group visits by institution and calculate total students
        const grouped = {};
        companyVisits.forEach(visit => {
          if (!grouped[visit.institution]) {
            grouped[visit.institution] = {
              institution: visit.institution,
              totalStudents: 0,
              status: visit.status,
              date: visit.date
            };
          }
          // Add the students count
          grouped[visit.institution].totalStudents += Number(visit.students);
        });

        // Convert to array
        const groupedArray = Object.values(grouped);
        setGroupedVisits(groupedArray);
        
        // Set company name
        if (currentUser) {
          setCompanyName(currentUser.fullName);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchVisits();
  }, []);

  const handleApprove = (institution) => {
    // Update institutionVisits in localStorage
    const institutionVisitsObj = JSON.parse(localStorage.getItem('institutionVisits') || '{}');
    
    // Update visits for this institution
    const updatedInstitutionVisits = { ...institutionVisitsObj };
    if (updatedInstitutionVisits[institution]) {
      updatedInstitutionVisits[institution] = updatedInstitutionVisits[institution].map(visit =>
        visit.company === companyName ? { ...visit, status: 'approved' } : visit
      );
    }
    
    localStorage.setItem('institutionVisits', JSON.stringify(updatedInstitutionVisits));
    
    // Update local state
    setGroupedVisits(prev => prev.map(group => 
      group.institution === institution ? { ...group, status: 'approved' } : group
    ));
  };

  const handleReject = (institution) => {
    if (!window.confirm(`Reject all visits from ${institution}?`)) return;
    
    // Update institutionVisits in localStorage
    const institutionVisitsObj = JSON.parse(localStorage.getItem('institutionVisits') || '{}');
    
    // Update visits for this institution
    const updatedInstitutionVisits = { ...institutionVisitsObj };
    if (updatedInstitutionVisits[institution]) {
      updatedInstitutionVisits[institution] = updatedInstitutionVisits[institution].map(visit =>
        visit.company === companyName ? { ...visit, status: 'rejected' } : visit
      );
    }
    
    localStorage.setItem('institutionVisits', JSON.stringify(updatedInstitutionVisits));
    
    setGroupedVisits(prev => prev.map(group => 
      group.institution === institution ? { ...group, status: 'rejected' } : group
    ));
  };

  return (<>
    <Navbar index="1" person="company"/>
    <div className="company-visit">
      <div className="container">
        <div className="header">
          <h1>Visit Requests - {companyName}</h1>
          <div className="stats">
            <span>{groupedVisits.filter(v => v.status === 'pending').length} pending</span>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Institution</th>
                <th>Total Students</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {groupedVisits.map((group, index) => (
                <tr key={index}>
                  <td>{group.institution}</td>
                  <td>{group.totalStudents}</td>
                  <td>
                    <span className={`status ${group.status}`}>
                      {group.status}
                    </span>
                  </td>
                  <td>
                    {group.status === 'pending' && (
                      <div className="actions">
                        <button className="approve" onClick={() => handleApprove(group.institution)}>
                          Accept
                        </button>
                        <button className="reject" onClick={() => handleReject(group.institution)}>
                          Reject
                        </button>
                      </div>
                    )}
                    {group.status !== 'pending' && (
                      <span className="final-status">{group.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>);
};

export default CompanyVisitManagement;