import React, { useState, useEffect } from 'react';
import './StudentVisitsManagement.css';
import Navbar from "./NavbarStudent";
import { Link } from 'react-router-dom';

const StudentVisitsManagement = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load visits from localStorage on component mount
  useEffect(() => {
    const savedVisits = localStorage.getItem('studentVisits');
    if (savedVisits) {
      setVisits(JSON.parse(savedVisits));
    }
  }, []);


  const handleCancelVisit = (visitId) => {
    if (!window.confirm('Are you sure you want to cancel this visit?')) {
      return;
    }
    setVisits(visits.map(visit => 
      visit.id === visitId ? { ...visit, status: 'cancelled' } : visit
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (<>
    <Navbar index="3" />
    <div className="student-visits">
      <div className="container">
        <div className="header">
          <h1>My Visits</h1>
          <Link to="/StudentPrepareRequest">
            <button className="btn-new">
              + New Visit Request
            </button>
          </Link>
        </div>

        <div className="table-section">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Email</th>
                <th>Date</th>
                <th>Purpose</th>
                <th>Status</th>
                <th style={{ width: '200px' }}>Admin Reply</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visits.length > 0 ? (
                visits.map((visit) => (
                  <tr key={visit.id}>
                    <td>{visit.company_name}</td>
                    <td>{visit.contact_email}</td>
                    <td>{formatDate(visit.visit_date)}</td>
                    <td>{visit.purpose}</td>
                    <td>
                      <span className={`status status-${visit.status}`}>
                        {visit.status}
                      </span>
                    </td>
                    <td style={{ 
                      fontSize: '12px', 
                      color: '#666',
                      maxWidth: '200px',
                      wordWrap: 'break-word'
                    }}>
                      {visit.admin_reply || 'No reply yet'}
                    </td>
                    <td>
                      {(visit.status === 'pending' || visit.status === 'approved') && (
                        <button 
                          className="btn-cancel"
                          onClick={() => handleCancelVisit(visit.id)}
                        >
                          Cancel
                        </button>
                      )}
                      {visit.status === 'cancelled' && (
                        <span className="cancelled-text">Cancelled</span>
                      )}
                      {visit.status === 'completed' && (
                        <span className="completed-text">Done</span>
                      )}
                      {visit.status === 'rejected' && (
                        <span style={{ color: '#dc3545', fontSize: '12px' }}>Rejected</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                    No visits found. Create your first visit request!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>);
};

export default StudentVisitsManagement;