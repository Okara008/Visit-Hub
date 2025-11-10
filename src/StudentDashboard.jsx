import React, { useEffect, useState } from "react";
import "./StudentDashboard.css";
import Navbar from "./NavbarStudent";
import axios from "axios";

function StudentDashboard() {
  const [studentName, setStudentName] = useState("John Doe"); // mock name
  const [visits, setVisits] = useState([
    { id: 1, company: "TechNova Industries", status: "Pending", date: "2024-10-26" },
    { id: 2, company: "SkyReach Airlines", status: "Approved", date: "2024-09-15" },
    { id: 3, company: "Medilife Health Ltd", status: "Completed", date: "2024-08-01" },
    { id: 4, company: "Softwave Systems", status: "Pending", date: "2024-11-03" },
    { id: 5, company: "SteelPro Manufacturing", status: "Completed", date: "2024-07-10" },
  ]);

  useEffect(() => {
    // Fetch name and visits from backend (Django)
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/dashboard/");
        setStudentName(res.data.student_name || studentName);
        setVisits(res.data.visits || visits);
      } catch (err) {
        console.log("Backend not connected, using mock data.");
      }
    };

    fetchDashboardData();
  }, []);

  return (<>
    <Navbar index="0" person="user"/>
    <div className="dashboard">
      <h2 className="studenth1">Welcome, {studentName}!</h2>

      <h3>My Recent Visit Requests</h3>
      <table className="visit-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Status</th>
            <th>Proposed Date</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v) => (
            <tr key={v.id}>
              <td>{v.company}</td>
              <td>
                <span className={`status ${v.status.toLowerCase()}`}>
                  {v.status}
                </span>
              </td>
              <td>{v.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a className="seeMore" href="/StudentPrevVisits">See more...</a>
    </div>
  </>);
}

export default StudentDashboard;
