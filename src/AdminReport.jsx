import React, { useState, useEffect, useMemo } from 'react';
import './AdminReport.css'; 
import Navbar from './NavbarAdmin';
import * as XLSX from 'xlsx';

const CompanyReports = () => {
    const [reports, setReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = () => {
        try {
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
            const studentVisits = JSON.parse(localStorage.getItem('studentVisits') || '[]');
            
            const institutionVisits = studentVisits.filter(visit => 
                visit.institution.toUpperCase() === currentUser.institution.toUpperCase()
            );
            
            const companyStats = {};
            
            institutionVisits.forEach(visit => {
                const company = visit.company_name;
                
                if (!companyStats[company]) {
                    companyStats[company] = {
                        company: company,
                        totalStudents: 0,
                        completedVisits: 0
                    };
                }
                
                companyStats[company].totalStudents += Number(visit.students) || 1;
                
                if (visit.status === 'completed' || visit.status === 'approved') {
                    companyStats[company].completedVisits += 1;
                }
            });

            const reportsData = Object.values(companyStats).map(company => ({
                id: company.company,
                company: company.company,
                students: company.totalStudents,
                visits: company.completedVisits,
                institution: currentUser.institution
            }));

            setReports(reportsData);
            
            // Update institutionVisits in localStorage with the new structure
            const existingInstitutionVisits = JSON.parse(localStorage.getItem('institutionVisits') || '{}');
            const updatedInstitutionVisits = {
                ...existingInstitutionVisits,
                [currentUser.institution]: reportsData
            };
            localStorage.setItem('institutionVisits', JSON.stringify(updatedInstitutionVisits));
            
        } catch (error) {
            console.error("Error fetching data:", error);
            setReports([]);
        }
    };

    const filteredReports = useMemo(() => {
        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            return reports.filter(report => 
                report.company.toLowerCase().includes(lowerCaseQuery)
            );
        }
        return reports;
    }, [reports, searchQuery]);

    const exportToExcel = () => {
        const excelData = filteredReports.map(report => ({
            'Company Name': report.company,
            'Number of Students': report.students,
            'Visits Completed': report.visits
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Company Reports');
        XLSX.writeFile(workbook, `Company_Reports_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (<>
        <Navbar index="3" person="admin"/>
        <div className="reports-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="reports-heading">Company Visit Reports</h2>
                <button className="export-button" onClick={exportToExcel}>
                    <i className="fas fa-file-excel"></i>
                    Export to Excel
                </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            </div>

            <table className="reports-table">
                <thead>
                    <tr>
                        <th className="table-th">Company Name</th>
                        <th className="table-th">Number of Students</th>
                        <th className="table-th">Visits Approved</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
                            <tr key={report.id}>
                                <td className="table-td">{report.company}</td>
                                <td className="table-td">{report.students}</td>
                                <td className="table-td">{report.visits}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="table-td">No reports found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>);
};

export default CompanyReports;