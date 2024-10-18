import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgencyDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [jobSeekers, setJobSeekers] = useState<any[]>([]);
    const [agencyDetails, setAgencyDetails] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const associatedJobSeekers = localStorage.getItem('associatedJobSeekers');
        const agency = localStorage.getItem('agencyDetails');

        if (!token) {
            navigate('/login'); 
        }

        if (associatedJobSeekers) {
            setJobSeekers(JSON.parse(associatedJobSeekers)); 
        }
        
        if (agency) {
            setAgencyDetails(JSON.parse(agency));
        }
    }, [navigate]);

    const updateStatus = async (userId: number, status: string) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/app/updateJobSeekerStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId, status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            setJobSeekers((prev) =>
                prev.map((seeker) =>
                    seeker.id === userId ? { ...seeker, status } : seeker
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleChat = (userId: number, agencyId: number) => {
        navigate(`/chat/${userId}/${agencyId}`); 
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">{agencyDetails ? `${agencyDetails.firstName} ${agencyDetails.lastName}` : 'Agency Dashboard'}</h1>
            <div className="card p-4 mt-3">
                <h2>Associated Job Seekers</h2>
                {jobSeekers.length === 0 ? (
                    <p>No job seekers associated with your agency.</p>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Hobbies</th>
                                <th>Profile Image</th>
                                <th>Resume</th>
                                <th>Status</th>
                                <th>Actions</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {jobSeekers.map((jobSeeker) => (
                                <tr key={jobSeeker.id}>
                                    <td>{jobSeeker.firstName}</td>
                                    <td>{jobSeeker.lastName}</td>
                                    <td>{jobSeeker.email}</td>
                                    <td>{jobSeeker.phone}</td>
                                    <td>{jobSeeker.gender}</td>
                                    <td>{jobSeeker.hobbies.join(', ')}</td>
                                    <td>
                                        <img 
                                            src={jobSeeker.profileImage} 
                                            alt={`${jobSeeker.firstName}'s Profile`} 
                                            style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                                        />
                                    </td>
                                    <td>
                                        {jobSeeker.resume ? (
                                            <a href={jobSeeker.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                                        ) : 'No resume uploaded'}
                                    </td>
                                    <td>{jobSeeker.status}</td>
                                    <td>
                                        {jobSeeker.status === 'pending' && (
                                            <>
                                                <button 
                                                    onClick={() => updateStatus(jobSeeker.id, 'confirmed')}
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Confirm
                                                </button>
                                                <button 
                                                    onClick={() => updateStatus(jobSeeker.id, 'declined')}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    Decline
                                                </button>
                                            </>
                                        )}
                                        {jobSeeker.status === 'confirmed' && (
                                            <button 
                                                onClick={() => handleChat(jobSeeker.id, jobSeeker.agencyId)}
                                                className="btn btn-info btn-sm"
                                            >
                                                Chat
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AgencyDashboard;
