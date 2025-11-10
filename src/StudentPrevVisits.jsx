import React, { useState, useEffect } from "react";
import Navbar from "./NavbarStudent";
import "./StudentPrevVisits.css";
import axios from "axios";

function StudentPrevVisits() {
  const [completedVisits, setCompletedVisits] = useState([
    { id: 1, company: "SkyReach Airlines", location: "Lagos", date: "2025-02-14" },
    { id: 2, company: "Green Energy Co", location: "Abuja", date: "2025-03-10" },
    { id: 3, company: "CyberGrid Technologies", location: "Port Harcourt", date: "2025-04-05" },
    { id: 4, company: "Softwave Systems", location: "Ibadan", date: "2025-04-20" },
    { id: 5, company: "BuildRight Construction", location: "Kano", date: "2025-05-02" },
    { id: 6, company: "Medilife Health", location: "Enugu", date: "2025-05-15" },
    { id: 7, company: "SkyReach Airlines", location: "Abuja", date: "2025-05-22" },
    { id: 8, company: "Green Energy Co", location: "Kaduna", date: "2025-06-10" },
    { id: 9, company: "CyberGrid Technologies", location: "Uyo", date: "2025-06-25" },
    { id: 10, company: "BuildRight Construction", location: "Abeokuta", date: "2025-07-08" },
  ]);

  // Optional: fetch from backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/completed-visits/")
      .then((res) => setCompletedVisits(res.data))
      .catch(() => console.log("Using mock completed visits data"));
  }, []);

  return (
    <>
      <Navbar index="4" />
      <div className="completed-visits-page">
        <h2>All Completed Visits</h2>
        <p>Below is a list of all industrial visits you have successfully completed.</p>

        <div className="completed-table-container">
          <table className="completed-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Location</th>
                <th>Date Completed</th>
              </tr>
            </thead>
            <tbody>
              {completedVisits.map((visit) => (
                <tr key={visit.id}>
                  <td>{visit.id}</td>
                  <td>{visit.company}</td>
                  <td>{visit.location}</td>
                  <td>{visit.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default StudentPrevVisits;
