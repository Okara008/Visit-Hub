import React, { useState, useEffect, useMemo } from 'react';
import './AdminUserList.css'; 
import Navbar from './NavbarAdmin';

const mockUserList = [
    { id: 1, fullName: 'Jane Doe', emailAddress: 'jane.doe@example.com', matNumber: "21/2182", department: 'Software Engineering', phoneNumber: '08028372432' },
    { id: 2, fullName: 'Jane Crith', emailAddress: 'jane.crith@example.com', matNumber: "21/9208", department: 'Electrical Engineering', phoneNumber: '08028341243' },
    { id: 3, fullName: 'John Smith', emailAddress: 'john.smith@example.com', matNumber: "24/2839", department: 'Mechanical Engineering', phoneNumber: '08028333467' },
    { id: 4, fullName: 'Emily White', emailAddress: 'emily.white@example.com', matNumber: "21/3232", department: 'Civil Engineering', phoneNumber: '08028472532' },
    { id: 5, fullName: 'Pomin White', emailAddress: 'pomin.white@example.com', matNumber: "18/2182", department: 'Aeronotic Engineering', phoneNumber: '08028442432' },
    { id: 6, fullName: 'Admin User', emailAddress: 'admin.user@example.com', matNumber: "20/2812", department: 'Marine Engineering', phoneNumber: '08028373948' },
];

const AdminUserList = () => {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ 
        fullName: '', 
        emailAddress: '', 
        matNumber: '', 
        department: '', 
        phoneNumber: '' 
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setUserList(mockUserList);
        } catch (error) {
            console.error("Error fetching data:", error);
            setUserList(mockUserList);
        }
        setLoading(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this user?")) {
            setUserList(userList.filter(user => user.id !== id));
        }
    };

    const handleAdd = () => {
        if (!formData.fullName || !formData.emailAddress) {
            alert("Please fill required fields");
            return;
        }
        setUserList([...userList, { id: userList.length + 1, ...formData }]);
        setFormData({ fullName: '', emailAddress: '', matNumber: '', department: '', phoneNumber: '' });
        setShowForm(false);
    };

    const filteredUsers = useMemo(() => {
        if (!searchQuery) return userList;
        const lowerCaseQuery = searchQuery.toLowerCase();
        return userList.filter(user => 
            user.fullName.toLowerCase().includes(lowerCaseQuery) ||
            user.emailAddress.toLowerCase().includes(lowerCaseQuery) ||
            user.matNumber.toLowerCase().includes(lowerCaseQuery) ||
            user.department.toLowerCase().includes(lowerCaseQuery) ||
            user.phoneNumber.toLowerCase().includes(lowerCaseQuery) 
        );
    }, [userList, searchQuery]);

    return (<>
        <Navbar index="1" person="admin"/>
        <div className="manage-users-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 className="users-page-heading">Manage Users</h1>
                <button onClick={() => setShowForm(true)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                    + Add User
                </button>
            </div>

            {showForm && (
                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ marginTop: 0 }}>Add New User</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                        <input type="text" placeholder="Full Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={{ padding: '8px' }} />
                        <input type="email" placeholder="Email Address" value={formData.emailAddress} onChange={e => setFormData({...formData, emailAddress: e.target.value})} style={{ padding: '8px' }} />
                        <input type="text" placeholder="Matric Number" value={formData.matNumber} onChange={e => setFormData({...formData, matNumber: e.target.value})} style={{ padding: '8px' }} />
                        <input type="text" placeholder="Department" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} style={{ padding: '8px' }} />
                        <input type="text" placeholder="Phone Number" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} style={{ padding: '8px' }} />
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
                <p>Loading user list...</p>
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
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="table-checkbox-cell">{user.id}</td>
                                        <td className="table-td">{user.fullName}</td>
                                        <td className="table-td table-email-cell">{user.emailAddress}</td>
                                        <td className="table-td">{user.matNumber}</td>
                                        <td className="table-td">{user.department}</td>
                                        <td className="table-td">{user.phoneNumber}</td>
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
                                        No users found matching the search criteria.
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