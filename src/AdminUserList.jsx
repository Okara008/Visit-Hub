import React, { useState, useEffect, useMemo } from 'react';
import './AdminUserList.css'; 
import Navbar from './NavbarAdmin';

const AdminUserList = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ 
        fullName: '', 
        email: '', 
        matric_number: '', 
        department: '', 
        phone: '',
        role: 'student'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        setLoading(true);
        try {
            // Get users from localStorage and filter only students
            const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
            const studentUsers = allUsers.filter(user => user.role === "student");
            setUserList(studentUsers);
        } catch (error) {
            console.error("Error fetching data:", error);
            setUserList([]);
        }
        setLoading(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this user?")) {
            // Remove from localStorage
            const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
            const updatedUsers = allUsers.filter(user => user.id !== id);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            
            // Update state
            setUserList(userList.filter(user => user.id !== id));
        }
    };

    const handleAdd = () => {
        if (!formData.fullName || !formData.email) {
            alert("Please fill required fields");
            return;
        }

        // Add to localStorage
        const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const newUser = { 
            id: Date.now(), 
            ...formData 
        };
        
        allUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(allUsers));
        
        // Update state
        setUserList([...userList, newUser]);
        setFormData({ fullName: '', email: '', matric_number: '', department: '', phone: '', role: 'student' });
        setShowForm(false);
    };

    const filteredUsers = useMemo(() => {
        if (!searchQuery) return userList;
        const lowerCaseQuery = searchQuery.toLowerCase();
        return userList.filter(user => 
            user.fullName.toLowerCase().includes(lowerCaseQuery) ||
            user.email.toLowerCase().includes(lowerCaseQuery) ||
            (user.matric_number && user.matric_number.toLowerCase().includes(lowerCaseQuery)) ||
            (user.department && user.department.toLowerCase().includes(lowerCaseQuery)) ||
            (user.phone && user.phone.toLowerCase().includes(lowerCaseQuery))
        );
    }, [userList, searchQuery]);

    return (<>
        <Navbar index="1" person="admin"/>
        <div className="manage-users-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 className="users-page-heading">Manage Students</h1>
                <button onClick={() => setShowForm(true)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                    + Add Student
                </button>
            </div>

            {showForm && (
                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ marginTop: 0 }}>Add New Student</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                        <input type="text" placeholder="Full Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={{ padding: '8px' }} />
                        <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '8px' }} />
                        <input type="text" placeholder="Matric Number" value={formData.matric_number} onChange={e => setFormData({...formData, matric_number: e.target.value})} style={{ padding: '8px' }} />
                        <input type="text" placeholder="Department" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} style={{ padding: '8px' }} />
                        <input type="text" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: '8px' }} />
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={handleAdd} style={{ background: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                            Save
                        </button>
                        <button onClick={() => setShowForm(false)} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

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

            {loading ? (
                <p>Loading student list...</p>
            ) : (
                <section>
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th className="table-checkbox-header">S/N</th>
                                <th className="table-th">Full Name</th>
                                <th className="table-th">Email Address</th>
                                <th className="table-th">Matric Number</th>
                                <th className="table-th">Department</th>
                                <th className="table-th">Phone Number</th>
                                <th className="table-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr key={user.id}>
                                        <td className="table-checkbox-cell">{index + 1}</td>
                                        <td className="table-td">{user.fullName}</td>
                                        <td className="table-td table-email-cell">{user.email}</td>
                                        <td className="table-td">{user.matric_number || '-'}</td>
                                        <td className="table-td">{user.department || '-'}</td>
                                        <td className="table-td">{user.phone || '-'}</td>
                                        <td className="table-td">
                                            <button onClick={() => handleDelete(user.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="table-td no-data-message">
                                        No students found matching the search criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}
        </div>
    </>);
};

export default AdminUserList;