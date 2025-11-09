import React, { useState, useEffect } from 'react';
// Assuming you import the CSS file in your main component file:
import './AdminDashboard.css';
import Navbar from './NavbarAdmin'; 

// --- Mock Data for System Overview ---
const mockOverview = {
    totalUsers: '500+',
    activeCompanies: '50+',
    pendingRequests: 15,
    newInstitutions: 5,
    visitsCompleted: 85,
};

const AdminDashboard = () => {
    // State to hold the fetched data
    const [overviewData, setOverviewData] = useState(mockOverview);
    const [loading, setLoading] = useState(true);

    // 2. DATA FETCHING LOGIC with Fallback
    const fetchOverviewData = async () => {
        setLoading(true);
        let fetchedData = null;

        try {
            // 🎯 Replace 'YOUR_DJANGO_API_OVERVIEW_ENDPOINT' with your actual link
            const djangoApiEndpoint = 'YOUR_DJANGO_API_OVERVIEW_ENDPOINT'; 
            
            // --- Simulated Fetch ---
            // To test the fallback, change the promise to simulate a network error or a bad response:
            const response = await new Promise(resolve => setTimeout(() => {
                resolve({ 
                    ok: true, // Set to 'false' to test the fallback logic
                    json: () => Promise.resolve({
                        totalUsers: '500', 
                        activeCompanies: '52',
                        pendingRequests: 18,
                        newInstitutions: 4,
                        visitsCompleted: 91,
                    }) 
                });
            }, 800)); 

            if (response.ok) {
                fetchedData = await response.json();
            } else {
                 throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            console.error("Error fetching overview data from API. Using mock data:", error);
            // `fetchedData` remains null, triggering the fallback below.
        } 
        
        // This is the key part: Use fetchedData OR mockOverview
        // The || operator ensures we always use a valid data object.
        setOverviewData(fetchedData || mockOverview);
        setLoading(false);
    };

    useEffect(() => {
        fetchOverviewData();
    }, []);

    // Helper function to safely access data or use a fallback value
    const getData = (key, fallback = 'N/A') => {
        // This ensures if the entire fetched object is null/undefined, or if a specific key is missing, we use a fallback.
        return overviewData[key] || fallback; 
    };

    return (<>
        <Navbar index="0" person="admin"/>
        <div className="dashboard-content-area-new">
            
            {/* Welcome and Title Section */}
            <div className="welcome-header-new">
                <h1>Welcome, John Doe!</h1>
            </div>

            {loading ? (
                <p>Loading System Metrics...</p>
            ) : (
                /* Expanded System Overview Grid */
                <div className="overview-grid">
                    
                    <div className="overview-card total-users">
                        <span className="overview-icon">👥</span>
                        <p className="metric-value">{getData('totalUsers', 'N/A')}</p>
                        <p className="metric-label">Total Users</p>
                    </div>

                    <div className="overview-card active-companies">
                        <span className="overview-icon">🏢</span>
                        <p className="metric-value">{getData('activeCompanies', 'N/A')}</p>
                        <p className="metric-label">Active Companies</p>
                    </div>
                    
                    <div className="overview-card pending-requests">
                        <span className="overview-icon">⏳</span>
                        <p className="metric-value">{getData('pendingRequests', 'N/A')}</p>
                        <p className="metric-label">Pending Requests</p>
                    </div>

                    <div className="overview-card new-institutions">
                        <span className="overview-icon">🎓</span>
                        <p className="metric-value">{getData('newInstitutions', 'N/A')}</p>
                        <p className="metric-label">New Institutions (Last 30 Days)</p>
                    </div>
                    
                    <div className="overview-card visits-completed">
                        <span className="overview-icon">✅</span>
                        <p className="metric-value">{getData('visitsCompleted', 'N/A')}</p>
                        <p className="metric-label">Visits Completed (Month)</p>
                    </div>

                </div>
            )}

            {/* Placeholder for the rest of the content */}
            <div className="dashboard-placeholder">
                <p>Management sections (Companies, Institutions, Users) are now accessed via the main navigation bar.</p>
            </div>
            
        </div>
    </>);
};

export default AdminDashboard;