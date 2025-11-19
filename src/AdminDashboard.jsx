import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import Navbar from './NavbarAdmin'; 

const AdminDashboard = () => {
    const [overviewData, setOverviewData] = useState({
        totalUsers: '0',
        activeCompanies: '0',
        pendingRequests: 0,
        visitsCompleted: 0,
        todayVisits: 0,
    });
    const [loading, setLoading] = useState(true);
    const [pendingApproval, setPendingApproval] = useState(null);
    const [todayVisits, setTodayVisits] = useState([]);
    const [profileData, setProfileData] = useState([]);
    let currentUser;
    // Calculate real data from localStorage
    const calculateRealData = () => {
        setLoading(true);
        
        try {
            // Calculate total students from "users" where role == "student"
            // Calculate total students from "users" belonging to the same institution as admin
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

            users = users.filter(
                user => user.role === 'student' && user.institution === currentUser.institution
            ).length;
            console.log(users);
            console.log(currentUser);
             
            // Calculate active companies from "allCompanies"
            const companies = JSON.parse(localStorage.getItem('allCompanies') || '[]');
            const activeCompaniesCount = companies.length;

            // Calculate pending requests from "studentVisits" where status == "pending"
            const studentVisits = JSON.parse(localStorage.getItem('studentVisits') || '[]');
            const pendingRequestsCount = studentVisits.filter(visit => visit.status === 'pending').length;

            // Get pending approval (first pending request)
            const pendingApprovalData = studentVisits.find(visit => visit.status === 'pending') || null;
            setPendingApproval(() => pendingApprovalData)
            
            // Calculate today's visits (visits with today's date)
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            const todayVisitsData = studentVisits.filter(visit => 
                visit.date === today && visit.status !== 'cancelled'
            );

            currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
            if (currentUser) {
                setProfileData(currentUser);
            }
            // Calculate completed visits (this month)
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const completedVisits = studentVisits.filter(visit => {
                if (visit.status !== 'completed') return false;
                const visitDate = new Date(visit.date);
                return visitDate.getMonth() === currentMonth && visitDate.getFullYear() === currentYear;
            }).length;

            // Update overview data with real calculations
            setOverviewData({
                totalUsers: users.toString(),
                activeCompanies: activeCompaniesCount.toString(),
                pendingRequests: pendingRequestsCount,
                visitsCompleted: completedVisits,
                todayVisits: todayVisitsData.length,
            });

            // Set pending approval data
            setPendingApproval(pendingApprovalData);

            // Set today's visits
            setTodayVisits(todayVisitsData);

        } catch (error) {
            console.error("Error calculating data:", error);
        }
        
        setLoading(false);
    };

    useEffect(() => {
        calculateRealData();
    }, []);

    return (
        <>
            <Navbar index="0" person="admin"/>
            <div className="dashboard">
                <h2 className="adminh1">Welcome, {profileData.fullName}</h2>

                {loading ? (
                    <div className="loading">Loading dashboard data...</div>
                ) : (
                    <>
                        {/* Stats Cards */}
                        <div className="stats-cards">
                            <div className="stat-card">
                                <div className="stat-icon">
                                    <i className="fas fa-users"></i>
                                </div>
                                <div className="stat-content">
                                    <h3>Total Students</h3>
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


                        {/* Pending Approval Section */}
                        {pendingApproval && (
                            <div className="section">
                                <h3>Pending Approval</h3>
                                <div className="visit-cards">
                                    <div className="visit-card">
                                        <div className="visit-header">
                                            <h4>{pendingApproval.company_name}</h4>
                                            <span className="status-badge pending">Pending</span>
                                        </div>
                                        <div className="visit-details">
                                            <p><strong>ID:</strong> {pendingApproval.id}</p>
                                            <p><strong>Date:</strong> {pendingApproval.visit_date}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </>
                )}
            </div>
        </>
    );
};

export default AdminDashboard;