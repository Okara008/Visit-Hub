import React, { useEffect, useState } from "react";
import Navbar from "./NavbarCompany";
import "./CompanyReport.css";
import axios from "axios";

function CompanyReport() {
  const [reportData, setReportData] = useState([
    { id: 1, day: "9-11-25", visits: 54 },
    { id: 2, day: "2-11-25", visits: 33 },
    { id: 3, day: "26-10-25", visits: 71 },
    { id: 4, day: "19-10-25", visits: 45 },
    { id: 5, day: "12-10-25", visits: 60 },
  ]);

  useEffect(() => {
    // Fetch from Django backend (optional)
    axios
      .get("http://127.0.0.1:8000/api/company-daily-reports/")
      .then((res) => setReportData(res.data))
      .catch(() => console.log("Using mock report data"));
  }, []);

  return (
    <>
      <Navbar index="2" />
      <div className="company-reports">
        <button className="printBtn" onClick={()=>window.print()}>Print</button>
        <h2>Weekly Visit Report</h2>
        <p>Overview of student visits recorded per day.</p>
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