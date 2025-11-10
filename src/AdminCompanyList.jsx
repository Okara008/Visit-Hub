import React, { useState, useEffect } from 'react';
import './AdminCompanyList.css'; 
import Navbar from './NavbarAdmin'

const mockCompanyList = [
    { 
        id: 1, 
        companyName: 'Innovate Corp', 
        contactEmail: 'john.doe@innovate.com', 
        website: 'innovate.com',
        contactNumber: '08029318273', 
        LineOfBusiness: 'Manufacturing', 
        status: 'Accepting Visits'
    },
    { 
        id: 2, 
        companyName: 'Tech Solutions', 
        contactEmail: 'support@techsol.co', 
        website: 'techsol.co',
        contactNumber: '09027182716', 
        LineOfBusiness: 'Electronics', 
        status: 'Accepting Visits' 
    },
    { 
        id: 3, 
        companyName: 'Global Industries', 
        contactEmail: 'contact@globalind.com', 
        website: 'globalind.com',
        contactNumber: '09029172615', 
        LineOfBusiness: 'Manufacturing', 
        status: 'Not Accepting Visits' 
    },
];

const AdminCompanyList = () => {
    const [companyList, setCompanyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ 
        companyName: '', 
        contactEmail: '', 
        website: '', 
        contactNumber: '', 
        LineOfBusiness: '' 
    });

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setCompanyList(mockCompanyList);
        } catch (error) {
            console.error("Error fetching data:", error);
            setCompanyList(mockCompanyList);
        }
        setLoading(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this company?")) {
            setCompanyList(companyList.filter(company => company.id !== id));
        }
    };

    const handleAdd = () => {
        if (!formData.companyName || !formData.contactEmail) {
            alert("Please fill required fields");
            return;
        }
        setCompanyList([...companyList, { id: companyList.length + 1, ...formData }]);
        setFormData({ companyName: '', contactEmail: '', website: '', contactNumber: '', LineOfBusiness: '' });
        setShowForm(false);
    };

    return (<>
        <Navbar index="2"/>
        <div className="manage-companies-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 className="companies-page-heading">Manage Companies</h1>
                <button onClick={() => setShowForm(true)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                    + Add Company
                </button>
            </div>

            {showForm && (
                <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ marginTop: 0 }}>Add New Company</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                        <input type="text" placeholder="Company Name" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} style={{ padding: '8px' }} />
                        <input type="email" placeholder="Contact Email" value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} style={{ padding: '8px' }} />
                        <input type="text" placeholder="Website" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} style={{ padding: '8px' }} />
                        <input type="text" placeholder="Contact Number" value={formData.contactNumber} onChange={e => setFormData({...formData, contactNumber: e.target.value})} style={{ padding: '8px' }} />
                        <input type="text" placeholder="Line of Business" value={formData.LineOfBusiness} onChange={e => setFormData({...formData, LineOfBusiness: e.target.value})} style={{ padding: '8px' }} />
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

            <div className="company-list-card">
                <h2>Manage Companies</h2>
                
                {loading ? (
                    <p className="loading-message">Loading company list...</p>
                ) : (
                    <section>
                        <table className="companies-table">
                            <thead>
                                <tr>
                                    <th className="table-th">S/N</th>
                                    <th className="table-th">Company Name</th>
                                    <th className="table-th">Contact Email</th>
                                    <th className="table-th">Website</th>
                                    <th className="table-th">Line Of Business</th>
                                    <th className="table-th">Contact Number</th>
                                    <th className="table-th">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyList.length > 0 ? (
                                    companyList.map((company) => (
                                        <tr key={company.id}>
                                            <td className="table-td">{company.id}</td>
                                            <td className="table-td company-name-cell">{company.companyName}</td>
                                            <td className="table-td contact-email-cell">{company.contactEmail}</td>
                                            <td className="table-td website-cell">
                                                <a href={`http://${company.website}`} target="_blank" rel="noopener noreferrer">{company.website}</a>
                                            </td>
                                            <td className="table-td contact-email-cell">{company.LineOfBusiness}</td>
                                            <td className="table-td contact-email-cell">{company.contactNumber}</td>
                                            <td className="table-td">
                                                <button onClick={() => handleDelete(company.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="table-td no-data-message">
                                            No companies found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                )}
            </div>
        </div>
    </>);
};

export default AdminCompanyList;