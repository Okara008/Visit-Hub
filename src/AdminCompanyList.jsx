import React, { useState, useEffect } from 'react';
// Assuming you import the CSS file in your main component file:
import './AdminCompanyList.css'; 
import Navbar from './NavbarAdmin'

// --- Mock Data for Company List ---
const mockCompanyList = [
    { 
        id: 1, 
        companyName: 'Innovate Corp', 
        contactEmail: 'john.doe@innovate.com', 
        website: 'innovate.com', 
        status: 'Accepting Visits' 
    },
    { 
        id: 2, 
        companyName: 'Tech Solutions', 
        contactEmail: 'support@techsol.co', 
        website: 'techsol.co', 
        status: 'Accepting Visits' 
    },
    { 
        id: 3, 
        companyName: 'Global Industries', 
        contactEmail: 'contact@globalind.com', 
        website: 'globalind.com', 
        status: 'Not Accepting Visits' 
    },
];

const AdminCompanyList = () => {
    const [companyList, setCompanyList] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. DATA FETCHING LOGIC with Fallback
    const fetchCompanies = async () => {
        setLoading(true);
        let fetchedData = null;

        try {
            // 🎯 Replace 'YOUR_DJANGO_COMPANY_LIST_ENDPOINT' with your actual Django link
            const djangoApiEndpoint = 'YOUR_DJANGO_COMPANY_LIST_ENDPOINT'; 
            
            // --- Simulated Fetch ---
            const response = await new Promise(resolve => setTimeout(() => {
                resolve({ 
                    ok: true, 
                    json: () => Promise.resolve(mockCompanyList) // Simulate a successful fetch 
                });
            }, 800)); 

            if (response.ok) {
                fetchedData = await response.json();
            } else {
                 throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            console.error("Error fetching company data from API. Using mock data:", error);
            // fetchedData remains null, triggering the fallback below.
        } 
        
        // Use fetchedData OR mockCompanyList
        setCompanyList(fetchedData || mockCompanyList);
        setLoading(false);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    // 2. RENDERING
    return (<>
        <Navbar index="2"/>
        <div className="manage-companies-container">
            <h1 className="companies-page-heading">Manage Companies</h1>
            
            {/* The "+ Add New Company" button is removed from here */}
            
            <div className="company-list-card">
                <h2>Manage Companies</h2>
                
                <div className="filter-options">
                    {/* Placeholder for filter options */}
                    <label>Filter Options</label>
                    <p className="filter-hint">(Mid Gweed Cay)</p>
                </div>
                
                {/* Company List Table */}
                {loading ? (
                    <p className="loading-message">Loading company list...</p>
                ) : (
                    <table className="companies-table">
                        <thead>
                            <tr>
                                <th className="table-th">S/N</th>
                                <th className="table-th">Company Name</th>
                                <th className="table-th">Contact Email</th>
                                <th className="table-th">Website</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companyList.length > 0 ? (
                                companyList.map((company) => (
                                    <tr key={company.id}>
                                        <td className="table-td ">{company.id}</td>
                                        <td className="table-td company-name-cell">{company.companyName}</td>
                                        <td className="table-td contact-email-cell">{company.contactEmail}</td>
                                        <td className="table-td website-cell">
                                            <a href={`http://${company.website}`} target="_blank" rel="noopener noreferrer">{company.website}</a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="table-td no-data-message">
                                        No companies found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    </>);
};

export default AdminCompanyList;