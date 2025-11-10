import React, { useState, useEffect } from 'react';
import './AdminStudentRequest.css'; 
import Navbar from './NavbarAdmin';

const mockVisitRequests = [
    { 
        id: 1, 
        studentName: 'Jane Doe', 
        studentEmail: 'jane.doe@example.com', 
        institution: 'University of Lagos',
        company: 'Tech Solutions Ltd',
        visitDate: '2023-12-15',
        purpose: 'Research project on AI implementation',
        status: 'pending',
        reply: ''
    },
    { 
        id: 2, 
        studentName: 'John Smith', 
        studentEmail: 'john.smith@example.com', 
        institution: 'Covenant University',
        company: 'Innovate Corp',
        visitDate: '2023-12-18',
        purpose: 'Industrial training placement',
        status: 'pending',
        reply: ''
    },
    { 
        id: 3, 
        studentName: 'Emily White', 
        studentEmail: 'emily.white@example.com', 
        institution: 'University of Nigeria',
        company: 'Global Industries',
        visitDate: '2023-12-12',
        purpose: 'Final year project data collection',
        status: 'approved',
        reply: 'Visit approved. Please bring your student ID.'
    },
    { 
        id: 4, 
        studentName: 'Michael Brown', 
        studentEmail: 'michael.brown@example.com', 
        institution: 'Federal University of Technology',
        company: 'Digital Solutions',
        visitDate: '2023-12-20',
        purpose: 'Career exploration and networking',
        status: 'rejected',
        reply: 'Unfortunately, we cannot accommodate your visit at this time.'
    },
];

const AdminStudentRequest = () => {
    const [visitRequests, setVisitRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReplyForm, setShowReplyForm] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');

    useEffect(() => {
        fetchVisitRequests();
    }, []);

    const fetchVisitRequests = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setVisitRequests(mockVisitRequests);
        } catch (error) {
            console.error("Error fetching data:", error);
            setVisitRequests(mockVisitRequests);
        }
        setLoading(false);
    };

    const handleApprove = (id) => {
        setVisitRequests(visitRequests.map(request => 
            request.id === id ? { ...request, status: 'approved' } : request
        ));
    };

    const handleReject = (id) => {
        if (window.confirm("Reject this visit request?")) {
            setVisitRequests(visitRequests.map(request => 
                request.id === id ? { ...request, status: 'rejected' } : request
            ));
        }
    };

    const handleReply = (id) => {
        setShowReplyForm(id);
        const request = visitRequests.find(req => req.id === id);
        setReplyMessage(request.reply || '');
    };

    const saveReply = (id) => {
        setVisitRequests(visitRequests.map(request => 
            request.id === id ? { ...request, reply: replyMessage } : request
        ));
        setShowReplyForm(null);
        setReplyMessage('');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (<>
        <Navbar index="4" person="admin"/>
        <div className="manage-visits-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 className="visits-page-heading">Student Visit Requests</h1>
                <div style={{ color: '#666', fontSize: '14px' }}>
                    {visitRequests.filter(req => req.status === 'pending').length} pending requests
                </div>
            </div>

            {loading ? (
                <p>Loading visit requests...</p>
            ) : (
                <section>
                    <table className="visits-table">
                        <thead>
                            <tr>
                                <th className="table-th">S/N</th>
                                <th className="table-th">Student Name</th>
                                <th className="table-th">Institution</th>
                                <th className="table-th">Company</th>
                                <th className="table-th">Visit Date</th>
                                <th className="table-th">Purpose</th>
                                <th className="table-th">Status</th>
                                <th className="table-th">Reply</th>
                                <th className="table-th">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visitRequests.length > 0 ? (
                                visitRequests.map((request) => (
                                    <tr key={request.id}>
                                        <td className="table-td">{request.id}</td>
                                        <td className="table-td">
                                            <div>
                                                <div style={{ fontWeight: '500' }}>{request.studentName}</div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>{request.studentEmail}</div>
                                            </div>
                                        </td>
                                        <td className="table-td">{request.institution}</td>
                                        <td className="table-td">{request.company}</td>
                                        <td className="table-td">{formatDate(request.visitDate)}</td>
                                        <td className="table-td" style={{ maxWidth: '200px' }}>{request.purpose}</td>
                                        <td className="table-td">
                                            <span className={`status ${request.status}`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="table-td" style={{ maxWidth: '200px', fontSize: '12px' }}>
                                            {request.reply || 'No reply yet'}
                                        </td>
                                        <td className="table-td">
                                            <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
                                                {request.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleApprove(request.id)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                                                            Accept
                                                        </button>
                                                        <button onClick={() => handleReject(request.id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                                <button onClick={() => handleReply(request.id)} style={{ background: '#007bff', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                                                    {request.reply ? 'Edit Reply' : 'Add Reply'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="table-td no-data-message">
                                        No visit requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>
            )}

            {/* Reply Form Modal */}
            {showReplyForm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '400px',
                        maxWidth: '90%'
                    }}>
                        <h3 style={{ marginTop: 0 }}>Add Reply</h3>
                        <textarea
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            placeholder="Enter your reply message..."
                            style={{
                                width: '100%',
                                height: '100px',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                marginBottom: '15px',
                                resize: 'vertical'
                            }}
                        />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => saveReply(showReplyForm)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                                Save Reply
                            </button>
                            <button onClick={() => setShowReplyForm(null)} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>);
};

export default AdminStudentRequest;