import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgencyDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [jobSeekers, setJobSeekers] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const associatedJobSeekers = localStorage.getItem('associatedJobSeekers');

        if (!token) {
            navigate('/login'); 
        }

        if (associatedJobSeekers) {
            setJobSeekers(JSON.parse(associatedJobSeekers)); 
        }
    }, [navigate]);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Dashboard</h1>
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
