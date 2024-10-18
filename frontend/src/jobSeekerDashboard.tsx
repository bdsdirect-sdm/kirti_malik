import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobSeekerDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [agencyDetails, setAgencyDetails] = useState<any>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('pending');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const agency = localStorage.getItem('agencyDetails');
        const storedFirstName = localStorage.getItem('firstName'); 
        const storedStatus = localStorage.getItem('status');

        if (!token) {
            navigate('/login'); 
            return; 
        }

        if (agency) {
            const parsedAgency = JSON.parse(agency);
            setAgencyDetails(parsedAgency);
        }

        setFirstName(storedFirstName);
        setStatus(storedStatus || 'pending'); 
    }, [navigate]);

    const handleChatClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); 
        if (agencyDetails) {
            const userId = localStorage.getItem('userId'); 
            const agencyId = agencyDetails.id;
            if (userId) {
                navigate(`/chat/${userId}/${agencyId}`); 
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Job Seeker Dashboard</h1>
            {firstName && (
                <div className="alert alert-info">
                    <h4>Welcome, {firstName}!</h4>
                </div>
            )}
            <div className="card p-4 mt-3">
                <h2>Your Agency Details</h2>
                {agencyDetails ? (
                    <div>
                        <p><strong>Agency Name:</strong> {agencyDetails.firstName} {agencyDetails.lastName}</p>
                        <p><strong>Email:</strong> {agencyDetails.email}</p>
                        <p><strong>Phone:</strong> {agencyDetails.phone}</p>
                        {status === 'confirmed' ? ( 
                            <>
                                <button onClick={handleChatClick} className="btn btn-primary mt-3">
                                    Start Chat
                                </button>
                                <div className="alert alert-success mt-3">
                                    You have been confirmed by your agency. You can start chatting now!
                                </div>
                            </>
                        ) : (
                            <p className="text-danger mt-3">Your agency has not confirmed you for chat.</p>
                        )}
                    </div>
                ) : (
                    <p>No agency associated with your profile.</p>
                )}
            </div>
        </div>
    );
};

export default JobSeekerDashboard;
