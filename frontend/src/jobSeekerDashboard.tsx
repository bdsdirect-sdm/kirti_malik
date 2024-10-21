import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for API calls

const JobSeekerDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [agencyDetails, setAgencyDetails] = useState<any>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('pending');
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user'); 
        console.log("Stored user:", storedUser);

        if (!token || !storedUser) {
            navigate('/login'); 
            return;
        }

        const user = JSON.parse(storedUser); 
        setFirstName(user.firstName);
        setUserId(user.id); 

       
        const fetchAgencyDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/app/jobAgency/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data) {
                    setAgencyDetails(response.data); 
                    setStatus(user.status); 
                } else {
                    setAgencyDetails(null); 
                }
            } catch (error) {
                console.error('Error fetching agency details:', error);
            }
        };

        fetchAgencyDetails();
    }, [navigate]);

    const handleChatClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (agencyDetails) {
            const agencyId = agencyDetails.id;
            if (userId) {
                navigate(`/chat/${userId}/${agencyId}`); // Navigate to chat with agency
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
