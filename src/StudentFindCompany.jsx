import React, { useState, useEffect } from "react";
import "./StudentFindCompany.css";
import Navbar from "./NavbarStudent";
import { Link } from 'react-router-dom';

const mockCompanies = [
  { id: 1, name: "TechNova Industries", industry: "Manufacturing", location: "Lagos", email: "info@technova.com" },
  { id: 2, name: "Green Energy Co.", industry: "Renewable Energy", location: "Abuja", email: "contact@greenenergy.com" },
  { id: 3, name: "AeroLink Solutions", industry: "Aerospace", location: "Port Harcourt", email: "hello@aerolink.com" },
  { id: 4, name: "AgriSmart Nigeria", industry: "Agriculture", location: "Ibadan", email: "support@agrismart.com" },
  { id: 5, name: "CyberGrid Technologies", industry: "IT Services", location: "Enugu", email: "team@cybergrid.com" },
  { id: 6, name: "BuildRight Construction", industry: "Civil Engineering", location: "Lagos", email: "contact@buildright.com" },
  { id: 7, name: "FoodCare Industries", industry: "Food Processing", location: "Ogun", email: "info@foodcare.com" },
  { id: 8, name: "SkyReach Airlines", industry: "Aviation", location: "Abuja", email: "service@skyreach.com" },
  { id: 9, name: "Medilife Health Ltd", industry: "Healthcare", location: "Benin", email: "info@medilife.com" },
  { id: 10, name: "AquaPure Nigeria", industry: "Water Treatment", location: "Lagos", email: "hello@aquapure.com" },
  { id: 11, name: "Softwave Systems", industry: "Software Development", location: "Port Harcourt", email: "team@softwave.com" },
  { id: 12, name: "SafeHaul Logistics", industry: "Transportation", location: "Abuja", email: "contact@safehaul.com" },
  { id: 13, name: "SolarRise Energy", industry: "Solar Technology", location: "Kano", email: "info@solarrise.com" },
  { id: 14, name: "EduSmart Academy", industry: "Education", location: "Lagos", email: "hello@edusmart.com" },
  { id: 15, name: "FinTrust Bank", industry: "Finance", location: "Abuja", email: "contact@fintrust.com" },
  { id: 16, name: "SteelPro Manufacturing", industry: "Steel & Metal Works", location: "Kaduna", email: "support@steelpro.com" },
  { id: 17, name: "ClearView Media", industry: "Advertising", location: "Lagos", email: "info@clearviewmedia.com" },
  { id: 18, name: "GreenHub Recycling", industry: "Environment", location: "Abeokuta", email: "hello@greenhub.com" },
  { id: 19, name: "UrbanTech Designs", industry: "Architecture", location: "Lagos", email: "team@urbantech.com" },
  { id: 20, name: "FarmLink Agro", industry: "AgriTech", location: "Enugu", email: "info@farmlink.com" },
];

function FindCompany() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulated backend fetch
    fetch("http://localhost:5000/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch(() => setCompanies(mockCompanies)); // fallback if backend fails
  }, []);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.industry.toLowerCase().includes(search.toLowerCase()) ||
      company.location.toLowerCase().includes(search.toLowerCase())
  );

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
              <Link to="/StudentPrepareRequest" className="request-btn">Request Visit</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default FindCompany;
