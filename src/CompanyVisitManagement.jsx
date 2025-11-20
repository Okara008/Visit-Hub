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
        const currentCompanyName = currentUser.fullName;
        setCompanyName(currentCompanyName);

        // Get or create companyVisits from localStorage
        let companyVisitsObj = JSON.parse(localStorage.getItem('companyVisits') || '{}');
        
        // If company doesn't exist in companyVisits, create it from institutionVisits
        // if (!companyVisitsObj[currentCompanyName]) {
          companyVisitsObj[currentCompanyName] = [];
          
          // Get institutionVisits and process them
          const institutionVisitsObj = JSON.parse(localStorage.getItem('institutionVisits') || '{}');
          
          // Loop through all institutions and extract visits for this company
          Object.keys(institutionVisitsObj).forEach(institution => {
            const institutionData = institutionVisitsObj[institution];
            
            for (let i = 0; i < institutionData.length; i++) {
              if (institutionData[i] && institutionData[i].company === currentCompanyName) {
                // Create company visit entry
                companyVisitsObj[currentCompanyName].push({
                  institution: institution,
                  approvedStudents: institutionData[i].visits, // Start with 0
                  companyStatus: institutionData.companyStatus || 'pending'
                });
              }
              
            }
          });
          // Save the new companyVisits structure
          localStorage.setItem('companyVisits', JSON.stringify(companyVisitsObj));
        // }

        // Get visits for current company
        const companyVisits = companyVisitsObj[currentCompanyName] || [];

        setGroupedVisits(companyVisits);
        
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchVisits();
  }, []);

  const handleApprove = (institution) => {
    // Update companyVisits in localStorage
    let companyVisitsObj = JSON.parse(localStorage.getItem('companyVisits') || '{}');
    
    if (companyVisitsObj[companyName]) {
      for (let i = 0; i < companyVisitsObj[companyName].length; i++) {
        const visit = companyVisitsObj[companyName][i];
        if(visit.institution === institution){
          console.log(visit.institution, institution );
           companyVisitsObj[companyName] = { 
              ...visit, 
              companyStatus: 'approved',
            } 
        } 
        
      }
    }
    
    localStorage.setItem('companyVisits', JSON.stringify(companyVisitsObj));
    
    // Update local state
    setGroupedVisits(prev => prev.map(group => 
      group.institution === institution 
        ? { 
            ...group, 
            companyStatus: 'approved',
          } 
        : group
    ));
    
  };

  const handleReject = (institution) => {
    if (!window.confirm(`Reject all pending visits from ${institution}?`)) return;
    
    // Update companyVisits in localStorage
    let companyVisitsObj = JSON.parse(localStorage.getItem('companyVisits') || '{}');
    
    if (companyVisitsObj[companyName]) {
      companyVisitsObj[companyName] = companyVisitsObj[companyName].map(visit =>
        visit.institution === institution 
          ? { ...visit, companyStatus: 'rejected' } 
          : visit
      );
    }
    
    localStorage.setItem('companyVisits', JSON.stringify(companyVisitsObj));
    
    // Update local state
    setGroupedVisits(prev => prev.map(group => 
      group.institution === institution 
        ? { ...group, companyStatus: 'rejected' } 
        : group
    ));
  };

  return (<>
    <Navbar index="1" person="company"/>
    <div className="company-visit">
      <div className="container">
        <div className="header">
          <h1>Visit Requests - {companyName}</h1>
          <div className="stats">
            <span>{groupedVisits.filter(v => v.companyStatus === 'pending').length} pending</span>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Institution</th>
                <th>Approved Students</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {groupedVisits.map((group, index) => (
                <tr key={index}>
                  <td>{group.institution}</td>
                  <td>{group.approvedStudents}</td>
                  <td>
                    <span className={`status ${group.companyStatus}`}>
                      {group.companyStatus}
                    </span>
                  </td>
              <td>
                {group.companyStatus === 'pending' && (
                  <div className="actions">
                    <button className="approve" onClick={() => handleApprove(group.institution)}>
                      Accept
                    </button>
                    <button className="reject" onClick={() => handleReject(group.institution)}>
                      Reject
                    </button>
                  </div>
                )}
                {group.companyStatus !== 'pending' && (
                  <div className="actions">
                    <button className="approve" disabled>
                      Accept
                    </button>
                    <button className="reject" disabled>
                      Reject
                    </button>
                  </div>
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