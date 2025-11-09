import React, { useState, useEffect, useMemo } from 'react';
// Assuming you import the CSS file in your main component file:
import './AdminUserList.css'; 
import Navbar from './NavbarAdmin';

// --- Mock Data for User List ---
const mockUserList = [
    { id: 1, fullName: 'Jane Doe', emailAddress: 'jane.doe@example.com', role: 'Staff' },
    { id: 2, fullName: 'Jane Crith', emailAddress: 'jane.crith@example.com', role: 'Student' },
    { id: 3, fullName: 'John Smith', emailAddress: 'john.smith@example.com', role: 'Student' },
    { id: 4, fullName: 'Emily White', emailAddress: 'emily.white@example.com', role: 'Student' },
    { id: 5, fullName: 'Pomin White', emailAddress: 'pomin.white@example.com', role: 'Student' },
    { id: 6, fullName: 'Admin User', emailAddress: 'admin.user@example.com', role: 'Admin' },
];

const AdminUserList = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // 1. DATA FETCHING LOGIC with Fallback
    const fetchUsers = async () => {
        setLoading(true);
        let fetchedData = null;

        try {
            // 🎯 Replace 'YOUR_DJANGO_USER_LIST_ENDPOINT' with your actual link
            const djangoApiEndpoint = 'YOUR_DJANGO_USER_LIST_ENDPOINT'; 
            
            // --- Simulated Fetch ---
            const response = await new Promise(resolve => //setTimeout(() => {
                resolve({ 
                    ok: true, 
                    json: () => Promise.resolve(mockUserList) // Simulate a successful fetch 
                })
            // }, 800)
        ); 

            if (response.ok) {
                fetchedData = await response.json();
            } else {
                 throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            console.error("Error fetching user data from API. Using mock data:", error);
            // fetchedData remains null, triggering the fallback below.
        } 
        
        // Use fetchedData OR mockUserList
        setUserList(fetchedData || mockUserList);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 2. Filtering Logic (Handles Search)
    const filteredUsers = useMemo(() => {
        if (!searchQuery) return userList;

        const lowerCaseQuery = searchQuery.toLowerCase();
        return userList.filter(user => 
            user.fullName.toLowerCase().includes(lowerCaseQuery) ||
            user.emailAddress.toLowerCase().includes(lowerCaseQuery)
        );
    }, [userList, searchQuery]);

    // 3. RENDERING
    return (<>
        <Navbar index="1" person="admin"/>
        <div className="manage-users-container">
            <h1 className="users-page-heading">Manage Users</h1>
            
            <div className="filter-and-search-area">
                <div className="search-box">
                    <label>Search by Name/Email</label>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {/* User List Table */}
            {loading ? (
                <p>Loading user list...</p>
            ) : (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th className="table-checkbox-header">S/N</th>
                            <th className="table-th">Full Name</th>
                            <th className="table-th">Email Address</th>
                            {/* Role column is removed as requested */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="table-checkbox-cell">
                                        {user.id}
                                    </td>
                                    <td className="table-td">{user.fullName}</td>
                                    <td className="table-td table-email-cell">{user.emailAddress}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="table-td no-data-message">
                                    No users found matching the search criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
             <div className="pagination-dots">
                <span>•</span>
                <span>•</span>
                <span className="dot-fade-1">•</span>
                <span className="dot-fade-2">•</span>
            </div>
        </div>
    </>);
};

export default AdminUserList;