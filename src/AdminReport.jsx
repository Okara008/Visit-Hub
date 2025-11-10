import React, { useState, useEffect, useMemo } from 'react';
import './AdminReport.css'; 
import Navbar from './NavbarAdmin';

const mockReports = [
    { id: 1, company: 'Tech Solutions', students: 25, visits: 8, status: 'Active' },
    { id: 2, company: 'Innovate Corp', students: 42, visits: 12, status: 'Active' },
    { id: 3, company: 'Global Industries', students: 18, visits: 5, status: 'Inactive' },
    { id: 4, company: 'Future Systems', students: 31, visits: 9, status: 'Active' },
    { id: 5, company: 'Digital Creations', students: 12, visits: 3, status: 'Inactive' },
];

const statusOptions = ['All', 'Active', 'Inactive'];

const CompanyReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setReports(mockReports);
        } catch (error) {
            console.error("Error fetching data:", error);
            setReports(mockReports);
        }
        setLoading(false);
    };

    const filteredReports = useMemo(() => {
        let currentReports = reports;

        if (statusFilter !== 'All') {
            currentReports = currentReports.filter(report => report.status === statusFilter);
        }

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            currentReports = currentReports.filter(report => 
                report.company.toLowerCase().includes(lowerCaseQuery)
            );
        }
        
        return currentReports;
    }, [reports, statusFilter, searchQuery]);

    const printReport = () => {
        window.print();
    };

    return (<>
        <Navbar index="3" person="admin"/>
        <div className="reports-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="reports-heading">Company Visit Reports</h2>
                <button onClick={printReport} style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                    Print Report
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Search Company</label>
                    <input
                        type="text"
                        placeholder="Search companies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    >
                        {statusOptions.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <p>Loading reports...</p>
            ) : (
                <table className="reports-table">
                    <thead>
                        <tr>
                            <th className="table-th">Company Name</th>
                            <th className="table-th">Number of Students</th>
                            <th className="table-th">Visits Completed</th>
                            <th className="table-th">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.length > 0 ? (
                            filteredReports.map((report) => (
                                <tr key={report.id}>
                                    <td className="table-td">{report.company}</td>
                                    <td className="table-td">{report.students}</td>
                                    <td className="table-td">{report.visits}</td>
                                    <td className="table-td">
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            fontWeight: '500',
                                            background: report.status === 'Active' ? '#d4edda' : '#f8d7da',
                                            color: report.status === 'Active' ? '#155724' : '#721c24'
                                        }}>
                                            {report.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="table-td">No reports found matching the filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    </>);
};

export default CompanyReports;