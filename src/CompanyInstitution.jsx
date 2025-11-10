import React, { useEffect, useState } from "react";
import Navbar from "./NavbarCompany";
import "./CompanyInstitution.css";
import axios from "axios";

function CompanyInstitution() {
  const [institutions, setInstitutions] = useState([
    {
      id: 1,
      name: "University of Lagos",
      location: "Lagos",
      email: "info@unilag.edu.ng",
      phone: "+234 810 234 5678",
    },
    {
      id: 2,
      name: "University of Nigeria Nsukka",
      location: "Enugu",
      email: "info@unn.edu.ng",
      phone: "+234 809 456 7890",
    },
    {
      id: 3,
      name: "Federal University of Technology Akure",
      location: "Ondo",
      email: "contact@futa.edu.ng",
      phone: "+234 703 222 3344",
    },
    {
      id: 4,
      name: "Obafemi Awolowo University",
      location: "Ile-Ife",
      email: "hello@oauife.edu.ng",
      phone: "+234 816 556 7788",
    },
    {
      id: 5,
      name: "Covenant University",
      location: "Ota",
      email: "info@covenantuniversity.edu.ng",
      phone: "+234 802 889 4433",
    },
  ]);

  // Fetch from backend if available
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/institutions/")
      .then((res) => setInstitutions(res.data))
      .catch(() => console.log("Using mock institution data"));
  }, []);

  return (
    <>
      <Navbar index="3" />
      <div className="institutions-page">
        <h2>Registered Institutions</h2>
        <p>Below is a list of institutions currently registered for industrial visits.</p>

        <div className="institution-table-container">
          <table className="institution-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Institution Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {institutions.map((inst) => (
                <tr key={inst.id}>
                  <td>{inst.id}</td>
                  <td>{inst.name}</td>
                  <td>{inst.location}</td>
                  <td>{inst.email}</td>
                  <td>{inst.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CompanyInstitution;
