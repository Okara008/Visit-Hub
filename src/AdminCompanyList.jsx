import React, { useState, useEffect } from 'react';
import './AdminCompanyList.css'; 
import Navbar from './NavbarAdmin'

const AdminCompanyList = () => {
    const [companyList, setCompanyList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ 
        companyName: '', 
        contactEmail: '', 
        contactNumber: '', 
        LineOfBusiness: '',
        status: 'Accepting Visits'
    });

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = () => {
        setLoading(true);
        try {
            // Get companies from localStorage
            const savedCompanies = JSON.parse(localStorage.getItem("allCompanies") || "[]");
            setCompanyList(savedCompanies);
        } catch (error) {
            console.error("Error fetching data:", error);
            setCompanyList([]);
        }
        setLoading(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this company?")) {
            // Remove from localStorage
            const updatedCompanies = companyList.filter(company => company.id !== id);
            localStorage.setItem("allCompanies", JSON.stringify(updatedCompanies));
            
            // Update state
            setCompanyList(updatedCompanies);
        }
    };

    const handleAdd = () => {
        if (!formData.companyName || !formData.contactEmail) {
            alert("Please fill required fields");
            return;
        }

        // Add to localStorage
        const newCompany = { 
            id: Date.now(), 
            ...formData 
        };
        
        const updatedCompanies = [...companyList, newCompany];
        localStorage.setItem("allCompanies", JSON.stringify(updatedCompanies));
        
        // Update state
        setCompanyList(updatedCompanies);
        setFormData({ companyName: '', contactEmail: '', contactNumber: '', LineOfBusiness: '', status: 'Accepting Visits' });
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
                    <section>
                        <table className="companies-table">
                            <thead>
                                <tr>
                                    <th className="table-th">S/N</th>
                                    <th className="table-th">Company Name</th>
                                    <th className="table-th">Contact Email</th>
                                    <th className="table-th">Line Of Business</th>
                                    <th className="table-th">Contact Number</th>
                                    <th className="table-th">Status</th>
                                    <th className="table-th">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companyList.length > 0 ? (
                                    companyList.map((company, index) => (
                                        <tr key={company.id}>
                                            <td className="table-td">{index + 1}</td>
                                            <td className="table-td company-name-cell">{company.name || company.companyName}</td>
                                            <td className="table-td contact-email-cell">{company.email || company.contactEmail}</td>
                                            <td className="table-td contact-email-cell">{company.industry || company.LineOfBusiness}</td>
                                            <td className="table-td contact-email-cell">{company.phone || company.contactNumber}</td>
                                            <td className="table-td">
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    fontWeight: '500',
                                                    background: company.status === 'Accepting Visits' ? '#d4edda' : '#f8d7da',
                                                    color: company.status === 'Accepting Visits' ? '#155724' : '#721c24'
                                                }}>
                                                    {company.status || 'Accepting Visits'}
                                                </span>
                                            </td>
                                            <td className="table-td">
                                                <button onClick={() => handleDelete(company.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="table-td no-data-message">
                                            No companies found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>
            </div>
        </div>
    </>);
};

export default AdminCompanyList;