import React, { useState, useEffect } from 'react';
import './AdminStudentRequest.css'; 
import Navbar from './NavbarAdmin';

const AdminStudentRequest = () => {
    const [visitRequests, setVisitRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');

    useEffect(() => {
        fetchVisitRequests();
    }, []);

    const fetchVisitRequests = () => {
        setLoading(true);
        try {
            // Get visit requests from localStorage
            const savedVisits = JSON.parse(localStorage.getItem("studentVisits") || "[]");
            setVisitRequests(savedVisits);
        } catch (error) {
            console.error("Error fetching data:", error);
            setVisitRequests([]);
        }
        setLoading(false);
    };

    const handleApprove = (id) => {
        // Update in localStorage
        const updatedVisits = visitRequests.map(request => 
            request.id === id ? { ...request, status: 'approved' } : request
        );
        localStorage.setItem("studentVisits", JSON.stringify(updatedVisits));
        
        // Update state
        setVisitRequests(updatedVisits);
    };

    const handleReject = (id) => {
        if (window.confirm("Reject this visit request?")) {
            // Update in localStorage
            const updatedVisits = visitRequests.map(request => 
                request.id === id ? { ...request, status: 'rejected' } : request
            );
            localStorage.setItem("studentVisits", JSON.stringify(updatedVisits));
            
            // Update state
            setVisitRequests(updatedVisits);
        }
    };

    const handleReply = (id) => {
        setShowReplyForm(id);
        const request = visitRequests.find(req => req.id === id);
        setReplyMessage(request.admin_reply || '');
    };

    const saveReply = (id) => {
        // Update in localStorage
        const updatedVisits = visitRequests.map(request => 
            request.id === id ? { ...request, admin_reply: replyMessage } : request
        );
        localStorage.setItem("studentVisits", JSON.stringify(updatedVisits));
        
        // Update state
        setVisitRequests(updatedVisits);
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
                                visitRequests.map((request, index) => (
                                    <tr key={request.id}>
                                        <td className="table-td">{index + 1}</td>
                                        <td className="table-td">
                                            <div>
                                                <div style={{ fontWeight: '500' }}>{request.student_name || 'Student'}</div>
                                                <div style={{ fontSize: '12px', color: '#666' }}>{request.contact_email}</div>
                                            </div>
                                        </td>
                                        <td className="table-td">University</td>
                                        <td className="table-td">{request.company_name}</td>
                                        <td className="table-td">{formatDate(request.visit_date)}</td>
                                        <td className="table-td" style={{ maxWidth: '200px' }}>{request.purpose}</td>
                                        <td className="table-td">
                                            <span className={`status ${request.status}`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="table-td" style={{ maxWidth: '200px', fontSize: '12px' }}>
                                            {request.admin_reply || 'No reply yet'}
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
                                                    {request.admin_reply ? 'Edit Reply' : 'Add Reply'}
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