import React from 'react';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import HomePage from './homePage';
import RegistrationForm from './userRegister';
import Login from './userLogin';
import Profile from './profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateProfile from './updateProfile';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      
        
          <Route path="/" element={<HomePage/>} />
              <Route path="/register" element={<RegistrationForm/>} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile/:id" element={<Profile/>}/>
              <Route path="/update/:id" element={<RegistrationForm/>}/>

    
    </Routes>
    </BrowserRouter>
  );
};

export default App;
