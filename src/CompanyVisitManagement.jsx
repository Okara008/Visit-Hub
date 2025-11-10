import React, { useState, useEffect } from 'react';
import './CompanyVisitManagement.css';
import Navbar from "./NavbarCompany";


const CompanyVisitManagement = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for company visit requests
  const mockVisitsData = [
    {
      id: 1,
      institution: 'University of Technology',
      contact: 'Dr. Sarah Johnson',
      email: 's.johnson@utech.edu',
      visit_date: '2023-12-15',
      purpose: 'Research Collaboration',
      students: 15,
      status: 'pending'
    },
    {
      id: 2,
      institution: 'State College',
      contact: 'Prof. Michael Chen',
      email: 'm.chen@statecollege.edu',
      visit_date: '2023-12-18',
      purpose: 'Technical Workshop',
      students: 25,
      status: 'pending'
    },
    {
      id: 3,
      institution: 'Institute of Science',
      contact: 'Dr. Emily Davis',
      email: 'e.davis@scienceinstitute.edu',
      visit_date: '2023-12-12',
      purpose: 'Factory Tour',
      students: 20,
      status: 'approved'
    },
    {
      id: 4,
      institution: 'Metropolitan University',
      contact: 'Dr. Lisa Thompson',
      email: 'l.thompson@metro.edu',
      visit_date: '2023-12-05',
      purpose: 'Studio Tour',
      students: 18,
      status: 'completed'
    }
  ];

  // Simulate API fetch
  useEffect(() => {
    const fetchVisits = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const sortedVisits = [...mockVisitsData].sort((a, b) => 
        new Date(b.visit_date) - new Date(a.visit_date)
      );
      setVisits(sortedVisits);
      setLoading(false);
    };

    fetchVisits();
  }, []);

  const handleApprove = async (visitId) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    setVisits(visits.map(v => v.id === visitId ? { ...v, status: 'approved' } : v));
    setLoading(false);
  };

  const handleReject = async (visitId) => {
    if (!window.confirm('Reject this visit request?')) return;
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 200));
    setVisits(visits.map(v => v.id === visitId ? { ...v, status: 'rejected' } : v));
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="company-visit">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (<>
    <Navbar index="4"/>
    <div className="company-visit">
      <div className="container">
        <div className="header">
          <h1>Visit Requests</h1>
          <div className="stats">
            <span>{visits.filter(v => v.status === 'pending').length} pending</span>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Institution</th>
                <th>Contact</th>
                <th>Date</th>
                <th>Purpose</th>
                <th>Students</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visits.map(visit => (
                <tr key={visit.id}>
                  <td>{visit.institution}</td>
                  <td>{visit.contact}</td>
                  <td>{visit.visit_date}</td>
                  <td>{visit.purpose}</td>
                  <td>{visit.students}</td>
                  <td>
                    <span className={`status ${visit.status}`}>
                      {visit.status}
                    </span>
                  </td>
                  <td>
                    {visit.status === 'pending' && (
                      <div className="actions">
                        <button className="approve" onClick={() => handleApprove(visit.id)}>
                          Accept
                        </button>
                        <button className="reject" onClick={() => handleReject(visit.id)}>
                          Reject
                        </button>
                      </div>
                    )}
                    {visit.status !== 'pending' && (
                      <span className="final-status">{visit.status}</span>
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