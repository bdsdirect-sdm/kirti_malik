import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get the userId from the URL
import { createLogicalAnd } from "typescript";
import { log } from "console";

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  address: {
    companyAddress: string;
    companyState: string;
    companyCity: string;
    companyZip: string;
    homeAddress: string;
    homeState: string;
    homeCity: string;
    homeZip: string;
  };
}

const Profile: React.FC = () => {
    console.log("component rensdered");
    
  const [userData, setUserData] = useState<UserProfile | null>(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);  
  const { id } = useParams(); 
  const navigate = useNavigate();  
  useEffect(() => {

    if (id) {
      axios.get(`http://localhost:8080/api/profile/${id}`)
        .then((response) => {
            console.log(response, "response")
          setUserData(response.data);  
          setLoading(false);  
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          setError("Something went wrong while fetching user profile.");
          setLoading(false);
        });
    } else {
      setError("User ID not found.");
      setLoading(false);
    }
  }, [id]); 

  const handleUpdateProfile = () => {
    navigate(`/update/${id}`, { state: userData })
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login"); 
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

     
      {loading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>  
      ) : (
        <div className="card p-4 mt-3">
          <h2>User Details</h2>

          {/* Profile Photo */}
          {userData?.profilePhoto && (
            <div className="mb-3">
              <img
                src={userData?.profilePhoto}  
                alt="Profile"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            </div>
          )}

          <p><strong>Email:</strong> {userData?.email}</p>
          <p><strong>Name:</strong> {userData?.firstName} {userData?.lastName}</p>

      
          <h3>Company Address</h3>
          <p><strong>Street:</strong> {userData?.address?.companyAddress}</p>
          <p><strong>State:</strong> {userData?.address?.companyState}</p>
          <p><strong>City:</strong> {userData?.address?.companyCity}</p>
          <p><strong>ZIP Code:</strong> {userData?.address?.companyZip}</p>

          <h3>Home Address</h3>
          <p><strong>Street:</strong> {userData?.address?.homeAddress}</p>
          <p><strong>State:</strong> {userData?.address?.homeState}</p>
          <p><strong>City:</strong> {userData?.address?.homeCity}</p>
          <p><strong>ZIP Code:</strong> {userData?.address?.homeZip}</p>

       
          <button onClick={handleUpdateProfile} className="btn btn-primary mt-2">
            Update Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
