import React, { useState, useEffect } from 'react';
import './StudentVisitsManagement.css';
import Navbar from "./NavbarStudent";
import { Link } from 'react-router-dom';

const StudentVisitsManagement = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for student visits
  const mockStudentVisitsData = [
    {
      id: 1,
      company_name: 'Innovate Corp',
      contact_email: 'contact@innovatecorp.com',
      visit_date: '2023-12-15',
      purpose: 'Research Collaboration Meeting',
      status: 'pending',
      admin_reply: ''
    },
    {
      id: 2,
      company_name: 'Tech Solutions',
      contact_email: 'info@techsolutions.com',
      visit_date: '2023-12-18',
      purpose: 'Technical Workshop Attendance',
      status: 'rejected',
      admin_reply: 'Unfortunately, we cannot accommodate your visit at this time due to scheduling conflicts with company events.'
    },
    {
      id: 3,
      company_name: 'Global Industries',
      contact_email: 'visits@globalind.com',
      visit_date: '2023-12-12',
      purpose: 'Factory Tour and Demonstration',
      status: 'approved',
      admin_reply: 'Visit approved. Please bring your student ID card.'
    },
    {
      id: 4,
      company_name: 'Innovate Corp',
      contact_email: 'contact@innovatecorp.com',
      visit_date: '2023-12-14',
      purpose: 'Product Development Discussion',
      status: 'approved',
      admin_reply: 'Your visit has been scheduled. Arrive at the main reception.'
    },
    {
      id: 5,
      company_name: 'Tech Solutions',
      contact_email: 'info@techsolutions.com',
      visit_date: '2023-12-16',
      purpose: 'Internship Program Overview',
      status: 'approved',
      admin_reply: 'Approved. Dress code: Business casual.'
    },
    {
      id: 6,
      company_name: 'Digital Creations',
      contact_email: 'hello@digitalcreations.com',
      visit_date: '2023-12-05',
      purpose: 'Design Studio Tour',
      status: 'completed',
      admin_reply: 'Visit completed successfully.'
    },
    {
      id: 7,
      company_name: 'Future Tech',
      contact_email: 'contact@futuretech.com',
      visit_date: '2023-12-10',
      purpose: 'AI Research Presentation',
      status: 'rejected',
      admin_reply: 'Visit rejected due to scheduling conflicts.'
    }
  ];

  // Simulate API fetch with mock data
  useEffect(() => {
    const fetchVisits = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      const sortedVisits = [...mockStudentVisitsData].sort((a, b) => 
        new Date(b.visit_date) - new Date(a.visit_date)
      );
      setVisits(sortedVisits);
      setLoading(false);
    };

    fetchVisits();
  }, []);

  const handleCancelVisit = async (visitId) => {
    if (!window.confirm('Are you sure you want to cancel this visit?')) {
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setVisits(visits.map(visit => 
      visit.id === visitId ? { ...visit, status: 'cancelled' } : visit
    ));
    setLoading(false);
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      pending: 'Pending',
      approved: 'Approved',
      completed: 'Completed',
      cancelled: 'Cancelled',
      rejected: 'Rejected'
    };
    return statusMap[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="student-visits">
        <div className="container">
          <div className="loading">Loading visits...</div>
        </div>
      </div>
    );
  }

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
              {visits.map((visit) => (
                <tr key={visit.id}>
                  <td>{visit.company_name}</td>
                  <td>{visit.contact_email}</td>
                  <td>{formatDate(visit.visit_date)}</td>
                  <td>{visit.purpose}</td>
                  <td>
                    <span className={`status status-${visit.status}`}>
                      {getStatusDisplay(visit.status)}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>);
};

export default StudentVisitsManagement;