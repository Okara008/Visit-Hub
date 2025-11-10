import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import Navbar from './NavbarAdmin'; 

const AdminDashboard = () => {
    const [overviewData, setOverviewData] = useState({
        totalUsers: '500+',
        activeCompanies: '50+',
        pendingRequests: 15,
        newInstitutions: 5,
        visitsCompleted: 85,
        todayVisits: 8,
        facilityUtilization: '68%'
    });
    const [loading, setLoading] = useState(true);

    // Mock data - just one pending approval
    const [pendingApproval, setPendingApproval] = useState({
        id: 1, 
        company: "TechNova Industries", 
        institution: "State University", 
        date: "2024-10-26", 
        students: 25 
    });

    const [todayVisits, setTodayVisits] = useState([
        { id: 1, company: "AutoWorks Ltd", institution: "Engineering College", time: "10:00 AM", status: "In Progress" },
        { id: 2, company: "GreenEnergy Corp", institution: "Science University", time: "2:00 PM", status: "Scheduled" }
    ]);

    const fetchOverviewData = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOverviewData();
    }, []);

    return (
        <>
            <Navbar index="0" person="admin"/>
            <div className="dashboard">
                <h2 className="adminh1">Welcome, Admin!</h2>

                {/* Stats Cards */}
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Total Users</h3>
                            <div className="stat-number">{overviewData.totalUsers}</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-building"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Active Companies</h3>
                            <div className="stat-number">{overviewData.activeCompanies}</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-clock"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Pending Requests</h3>
                            <div className="stat-number">{overviewData.pendingRequests}</div>
                        </div>
                    </div>
                </div>

                {/* Second Row Stats */}
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-university"></i>
                        </div>
                        <div className="stat-content">
                            <h3>New Institutions</h3>
                            <div className="stat-number">{overviewData.newInstitutions}</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-calendar-check"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Monthly Visits</h3>
                            <div className="stat-number">{overviewData.visitsCompleted}</div>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-eye"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Today's Visits</h3>
                            <div className="stat-number">{overviewData.todayVisits}</div>
                        </div>
                    </div>
                </div>

                {/* Single Pending Approval Section */}
                <div className="section">
                    <h3>Pending Approval</h3>
                    <div className="visit-cards">
                        <div className="visit-card">
                            <div className="visit-header">
                                <h4>{pendingApproval.company}</h4>
                                <span className="status-badge pending">Pending</span>
                            </div>
                            <div className="visit-details">
                                <p><strong>Institution:</strong> {pendingApproval.institution}</p>
                                <p><strong>Date:</strong> {pendingApproval.date}</p>
                                <p><strong>Students:</strong> {pendingApproval.students}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Today's Visits Section */}

            </div>
        </>
    );
};

export default AdminDashboard;