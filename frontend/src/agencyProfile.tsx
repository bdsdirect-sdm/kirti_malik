import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Agency {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
   
}

const AgencyProfile: React.FC = () => {
    const [agency, setAgency] = useState<Agency | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgencyProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/app/agencyProfile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setAgency(response.data);
            } catch (err) {
                console.error('Error fetching agency profile:', err);
                setError('Failed to fetch agency profile');
            } finally {
                setLoading(false);
            }
        };

        fetchAgencyProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!agency) {
        return <div>No agency data available.</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Agency Profile</h1>
            <div className="card p-4 mt-3">
              
                <p><strong>Contact Person:</strong> {agency.firstName} {agency.lastName}</p>
                <p><strong>Email:</strong> {agency.email}</p>
                <p><strong>Phone:</strong> {agency.phone}</p>
               
            </div>
        </div>
    );
};

export default AgencyProfile;
