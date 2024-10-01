import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { clearConfigCache } from "prettier";

const Profile: React.FC = () => {
    const [userData, setUserData] = useState<any>(null);
    const navigate = useNavigate();
    

    useEffect(() => {
        const token = localStorage.getItem('token'); 
        if (token) {
            axios.get('http://localhost:8000/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then((response) => {
                setUserData(response.data);
                console.log("users", response.data)
                console.log('profile',userData)
              
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    localStorage.removeItem('token'); 
                    navigate('/login');
                }
            });
        } else {
            console.error('No token found');
            navigate('/login');
        }
    }, [navigate]);

    const handleUpdateProfile = () => {
        navigate('/update',{state:{userData}}); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <header className="d-flex justify-content-between align-items-center">
                <h1>Profile Page</h1>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </header>
            <hr />
            {userData ? (
                <div className="card p-4 mt-3">
                    <h2>User Details</h2>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Name:</strong> {userData.first_name} {userData.last_name}</p>
                    <p><strong>Gender:</strong> {userData.gender || "N/A"}</p>
                    <p><strong>Date of Birth:</strong> {userData.dob ? new Date(userData.dob).toLocaleDateString() : "N/A"}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber || "N/A"}</p>
                    <button onClick={handleUpdateProfile} className="btn btn-primary mt-2">
                        Update Profile
                    </button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Profile;
