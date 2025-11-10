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

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", location: "", email: "", phone: "" });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/institutions/")
      .then((res) => setInstitutions(res.data))
      .catch(() => console.log("Using mock institution data"));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Delete this institution?")) {
      setInstitutions(institutions.filter(inst => inst.id !== id));
    }
  };

  const handleAdd = () => {
    if (!formData.name || !formData.location || !formData.email) {
      alert("Please fill required fields");
      return;
    }
    setInstitutions([...institutions, { id: institutions.length + 1, ...formData }]);
    setFormData({ name: "", location: "", email: "", phone: "" });
    setShowForm(false);
  };

  return (
    <>
      <Navbar index="2" />
      <div className="institutions-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2>Registered Institutions</h2>
            <p>Below is a list of institutions currently registered for industrial visits.</p>
          </div>
          <button onClick={() => setShowForm(true)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            + Add Institution
          </button>
        </div>

        {showForm && (
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Add New Institution</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <input type="text" placeholder="Institution Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '8px' }} />
              <input type="text" placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ padding: '8px' }} />
              <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '8px' }} />
              <input type="tel" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ padding: '8px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleAdd} style={{ background: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                Save
              </button>
              <button onClick={() => setShowForm(false)} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="institution-table-container">
          <table className="institution-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Institution Name</th>
                <th>Location</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Actions</th>
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
                  <td>
                    <button onClick={() => handleDelete(inst.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </td>
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