import React, { useEffect, useState } from "react";
import Navbar from "./NavbarCompany";
import "./CompanyReport.css";
import * as XLSX from "xlsx"; // Used for Excel export

// --- Helper function to format date from 'MM-DD-YY' to 'DD-MM-YY' if needed, but we'll use a simpler placeholder for now ---
const formatReportData = (data) => {
  // We don't have the 'day' in the provided local storage structure, so we'll use the current date
  // for all entries just to demonstrate the data integration.
  const today = new Date();
  const dateString = `${today.getDate()}-${today.getMonth() + 1}-${String(today.getFullYear()).slice(-2)}`;

  return Object.values(data)
    .filter(visit => visit.companyStatus === "approved")
    .map((visit, index) => ({
      id: index + 1,
      // NOTE: The exact 'day' of the visit is not available in the companyVisits structure.
      // We use the current date as a placeholder. In a real app, this date would be stored 
      // alongside 'approvedStudents' in a more detailed visits object.
      day: dateString, 
      visits: visit.approvedStudents,
      institution: visit.institution,
    }));
};

function CompanyReport() {
  // Initialize with an empty array
  const [reportData, setReportData] = useState([]);
  const [companyName, setCompanyName] = useState('');

  useEffect(() => {
    loadApprovedVisits();
  }, []);

  const loadApprovedVisits = () => {
    try {
      // 1. Get the current company name from sessionStorage
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      const currentCompany = currentUser?.fullName;

      if (!currentCompany) {
        console.error("Current company name not found. Cannot load report.");
        return;
      }
      setCompanyName(currentCompany);

      // 2. Load the companyVisits data from localStorage
      let storedCompanyVisits = JSON.parse(localStorage.getItem("companyVisits") || "{}");
      
      const companySpecificVisits = storedCompanyVisits[currentCompany];

      if (companySpecificVisits) {
        // 3. Filter and format the data
        const formattedData = formatReportData(companySpecificVisits);
        setReportData(formattedData);
      } else {
        setReportData([]);
      }
    } catch (err) {
      console.error("Error loading visits data from localStorage:", err);
      setReportData([]);
    }
  };

  const exportToExcel = () => {
    if (reportData.length === 0) {
      alert("No approved visits to export.");
      return;
    }

    // Prepare data for Excel export using reportData
    const excelData = reportData.map(report => ({
      'Day of Visits': report.day,
      'Number of Students': report.visits,
      'Institution': report.institution
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Approved Visits Report');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Approved_Visit_Reports_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <>
      <Navbar index="3" person="company" />
      <div className="company-reports">
        <div className="report-header">
          <div>
            <h2>Visit Report - {companyName}</h2>
            <p>Approved student visits recorded by institution.</p>
          </div>
          <button 
            onClick={exportToExcel} 
            style={{ 
              background: '#28a745', 
              color: 'white', 
              border: 'none', 
              padding: '10px 20px', 
              borderRadius: '5px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <i className="fas fa-file-excel"></i>
            Export to Excel
          </button>
        </div>
        <div className="report-table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Day of Report</th>
                <th>Number of Students</th>
                <th>Institution</th>
              </tr>
            </thead>
            <tbody>
              {reportData.length > 0 ? (
                reportData.map((record) => (
                  <tr key={record.id}>
                    <td>{record.day}</td>
                    <td>{record.visits}</td>
                    <td>{record.institution}</td>
                  </tr>
                ))
              ) : (
                <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "20px" }}>
                      No approved visit reports for {companyName} yet.
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CompanyReport;