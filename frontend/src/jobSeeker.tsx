import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface JobSeeker {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    hobbies: string | string[];
    profileImage: string;
    resume: string;
}

const JobSeekers: React.FC = () => {
    const navigate = useNavigate();
    const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobSeekers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/app/jobSeekers', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setJobSeekers(response.data);
            } catch (err) {
                console.error('Error fetching job seekers:', err);
                setError('Failed to fetch job seekers');
            } finally {
                setLoading(false);
            }
        };

        fetchJobSeekers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token
        navigate('/loginAgency'); // Redirect to login page
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Job Seekers</h1>
            <button className="btn btn-danger mb-3" onClick={handleLogout}>
                Logout
            </button>
            <div className="card p-4 mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
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
                        {jobSeekers.map(seeker => (
                            <tr key={seeker.id}>
                                <td>{seeker.id}</td>
                                <td>{seeker.firstName}</td>
                                <td>{seeker.lastName}</td>
                                <td>{seeker.email}</td>
                                <td>{seeker.phone}</td>
                                <td>{seeker.gender}</td>
                                <td>
                                    {Array.isArray(seeker.hobbies)
                                        ? seeker.hobbies.join(', ')
                                        : seeker.hobbies}
                                </td>
                                <td>
                                    <img 
                                        src={seeker.profileImage} 
                                        alt={`${seeker.firstName} ${seeker.lastName}`} 
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }} 
                                    />
                                </td>
                                <td>
                                    <a href={seeker.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobSeekers;
