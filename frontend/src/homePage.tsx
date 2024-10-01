import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const HomePage: React.FC = () => {
    return (
        <div className='homePage'>
            <div className='text-center mt-5'>
                <h1 className='display-4'>Welcome to Our Application</h1>
                <div className='mt-4'>
                    <Link to="/login">
                        <button className="btn btn-primary mx-2">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn btn-secondary mx-2">Register</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
