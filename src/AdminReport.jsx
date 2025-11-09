import React, { useState, useEffect, useMemo } from 'react';
import './AdminReport.css'; 
import Navbar from './NavbarAdmin';

// --- Mock Data ---
const mockReports = [
    { id: 1, studentName: 'Jane Doe', company: 'Tech University', status: 'Pending', proposedDate: '2024-11-15', actualDate: null },
    { id: 2, studentName: 'Instilly Smith', company: 'Innovate Corp', status: 'Approved', proposedDate: '2024-11-25', actualDate: '2024-11-25' },
    { id: 3, studentName: 'John Smith', company: 'Global Academy', status: 'Approved', proposedDate: '2024-11-01', actualDate: '2024-11-01' },
    { id: 4, studentName: 'Tech Solutions', company: 'Innovate Corp', status: 'Completed', proposedDate: '2024-11-20', actualDate: '2024-11-20' },
    { id: 5, studentName: 'Alex Johnson', company: 'Future Systems', status: 'Completed', proposedDate: '2024-10-10', actualDate: '2024-10-10' },
];

const statusOptions = ['All', 'Pending', 'Approved', 'Completed', 'Rejected'];

const IndustrialReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        status: 'All',
        dateRange: 'All',
    });

    // 2. ENHANCED DATA FETCHING LOGIC with Fallback
    const fetchReports = async () => {
        setLoading(true);
        let fetchedData = null;

        try {
            // --- REPLACE WITH YOUR ACTUAL DJANGO API ENDPOINT ---
            // For the example, we simulate a fetch that might fail or return no data.
            const response = await new Promise(resolve => setTimeout(() => {
                // To test the fallback, uncomment the line below to simulate a fetch failure:
                // throw new Error("API not available.");
                
                resolve({ 
                    ok: true, 
                    json: () => Promise.resolve(mockReports) // Simulate a successful fetch returning mockData
                });
            }, 1000)); 

            if (response.ok) {
                fetchedData = await response.json();
            }

        } catch (error) {
            console.error("Error fetching data from API:", error);
            // `fetchedData` remains null, triggering the fallback below.
        } 
        
        // This is the key part: Use fetchedData OR mockReports
        setReports(fetchedData || mockReports);
        setLoading(false);
    };

    useEffect(() => {
        fetchReports();
    }, []);

    // 3. FILTERING LOGIC (remains the same)
    const filteredReports = useMemo(() => {
        let currentReports = reports;

        if (filters.status !== 'All') {
            currentReports = currentReports.filter(report => report.status === filters.status);
        }

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            currentReports = currentReports.filter(report => 
                report.studentName.toLowerCase().includes(lowerCaseQuery) ||
                report.company.toLowerCase().includes(lowerCaseQuery)
            );
        }
        
        return currentReports;
    }, [reports, filters.status, searchQuery]);


    // 4. EXPORT HANDLER
    const printReport = () => {
        const parent = document.querySelector('.reports-table');
        window.print(parent);
    };


    // 5. RENDERING (using className)
    return (<>
        <Navbar index="3" person="admin"/>
        <div className="reports-container">
            <h2 className="reports-heading">Industrial Visit Reports</h2>

            {/* Filter Options Section */}
            <div className="filter-options">
                <h3>Filter Options</h3>
                <div className="filter-grid">
                    <div>
                        <label>Search by Student/Company</label>
                        <input
                            type="text"
                            placeholder="Dend..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="filter-input"
                        />
                    </div>
                    <div>
                        <label>Status</label>
                        <select
                            value={filters.status}
                            onChange={(e) => setFilters({...filters, status: e.target.value})}
                            className="filter-select"
                        >
                            {statusOptions.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>From Date:</label>
                        <select value={filters.dateRange} onChange={(e) => setFilters({...filters, dateRange: e.target.value})} className="filter-select">
                            <option value="All">All</option>
                            <option value="Last 7 Days">Last 7 Days</option>
                            <option value="Last 30 Days">Last 30 Days</option>
                        </select>
                    </div>
                    <div>
                        <label>Actual Date</label>
                        <select className="filter-select">
                            <option>Completed</option>
                            <option>Proposed</option>
                        </select>
                    </div>
                    <button onClick={printReport} className="export-button">
                        Print
                    </button>
                </div>
            </div>

            {/* Reports Table Section */}
            {loading ? (
                <p>Loading reports...</p>
            ) : (
                <table className="reports-table">
                    <thead>
                        <tr>
                            <th className="table-th">Student Name</th>
                            <th className="table-th">Company</th>
                            <th className="table-th">Status</th>
                            <th className="table-th">Proposed Date</th>
                            <th className="table-th">Actual Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.length > 0 ? (
                            filteredReports.map((report) => (
                                <tr key={report.id}>
                                    <td className="table-td">{report.studentName}</td>
                                    <td className="table-td">{report.company}</td>
                                    <td className="table-td">{report.status}</td>
                                    <td className="table-td">{report.proposedDate || '-'}</td>
                                    <td className="table-td">{report.actualDate || '-'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="table-td">No reports found matching the filters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            <div className="pagination">
                <span>•</span>
                <span>•</span>
                <span className="dot-fade-1">•</span>
                <span className="dot-fade-2">•</span>
            </div>
        </div>
    </>);
};

export default IndustrialReports;