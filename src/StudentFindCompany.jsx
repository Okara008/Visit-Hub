import React, { useState, useEffect } from "react";
import "./StudentFindCompany.css";
import Navbar from "./NavbarStudent";
import { Link } from 'react-router-dom';

const allCompanies = JSON.parse(localStorage.getItem("allCompanies"))

function FindCompany() {
  const [companies, setCompanies] = useState(allCompanies);
  const [search, setSearch] = useState("");

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.industry.toLowerCase().includes(search.toLowerCase()) ||
      company.location.toLowerCase().includes(search.toLowerCase())
  );

  const compRequest = (index) => {
    index--;
    sessionStorage.setItem("selectedCompany", allCompanies[index].name)
    
  }
  return (
    <>
      <Navbar index="2" person="user"/>
      <div className="find-company">
        <h2>Find a Company</h2>
        <p>Explore available companies for your industrial visit.</p>

        {/* 🔍 Search Bar (Internal Styling) */}
        <div className="searchBarContainer">
          <input
            type="text"
            placeholder="Search for a company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 🏢 Company Cards */}
        <div className="company-grid">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="company-card">
              <div className="company-header">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=0077b6&color=fff`}
                  alt={company.name}
                  className="company-logo"
                />
                <h3>{company.name}</h3>
              </div>
              <div className="company-info">
                <p><strong>Industry:</strong> {company.industry}</p>
                <p><strong>Location:</strong> {company.location}</p>
                <p><strong>Email:</strong> {company.email}</p>
              </div>
                <Link to="/StudentPrepareRequest" className="request-btn"  onClick={() => compRequest(company.id)}>Request Visit</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FindCompany;
