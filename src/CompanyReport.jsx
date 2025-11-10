import React, { useEffect, useState } from "react";
import Navbar from "./NavbarCompany";
import "./CompanyReport.css";
import axios from "axios";
import * as XLSX from "xlsx";

function CompanyReport() {
  const [reportData, setReportData] = useState([
    { id: 1, day: "9-11-25", visits: 54, institution: "University of Lagos" },
    { id: 2, day: "2-11-25", visits: 33, institution: "University of Nigeria Nsukka" },
    { id: 3, day: "26-10-25", visits: 71, institution: "Federal University of Technology Akure" },
    { id: 4, day: "19-10-25", visits: 45, institution: "Obafemi Awolowo University" },
    { id: 5, day: "12-10-25", visits: 60, institution: "Covenant University" },
  ]);

  useEffect(() => {
    // Fetch from Django backend (optional)
    axios
      .get("http://127.0.0.1:8000/api/company-daily-reports/")
      .then((res) => setReportData(res.data))
      .catch(() => console.log("Using mock report data"));
  }, []);

  const exportToExcel = () => {
    // Prepare data for Excel export using reportData
    const excelData = reportData.map(report => ({
      'Day of Visits': report.day,
      'Number of Students': report.visits,
      'Institution': report.institution
    }));

    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Visit Reports');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `Visit_Reports_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <>
      <Navbar index="3" />
      <div className="company-reports">
        <div className="report-header">
          <div>
            <h2>Visit Report</h2>
            <p>Overview of student visits recorded per day.</p>
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
                <th>Day of Visits</th>
                <th>Number of Students</th>
                <th>Institution</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((record) => (
                <tr key={record.id}>
                  <td>{record.day}</td>
                  <td>{record.visits}</td>
                  <td>{record.institution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CompanyReport;