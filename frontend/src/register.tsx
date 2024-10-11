import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



const Register = () => {
  const [userType, setUserType] = useState<'job seeker'| 'job agency'>('job seeker'); 

  const handleUserTypeChange = (type:'job seeker' | 'job agency') => {
    setUserType(type);
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-6 d-flex align-items-center justify-content-center'>
          <div>
            <h1>Welcome to the Job Portal</h1>
            <p>Find your dream job or connect with job seekers.</p>
          </div>
        </div>
        <div className='col-6 mt-5'>
          <form className='p-4 border rounded shadow-sm'>
            <div className='mb-3 text-center'>
              <button 
                type='button' 
                className={`btn ${userType === 'job seeker' ? 'btn-primary' : 'btn-light'}`} 
                onClick={() => handleUserTypeChange('job seeker')}
              >
                Job Seeker
              </button>
              <button 
                type='button' 
                className={`btn ${userType === 'job agency' ? 'btn-primary' : 'btn-light'}`} 
                onClick={() => handleUserTypeChange('job agency')}
              >
                Job Agency
              </button>
            </div>

            <div className='mb-3'>
              <label className='form-label'>First Name</label>
              <input
                type='text'
                className='form-control'
                name='firstName'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Last Name</label>
              <input
                type='text'
                className='form-control'
                name='lastName'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Phone Number</label>
              <input
                type='text'
                className='form-control'
                name='phoneNumber'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                name='email'
                required
              />
            </div>

            <div className='mb-3'>
              <label>Gender</label>
              <div>
                <label className='me-2'>
                  <input type='radio' name='gender' value='male' /> Male
                </label>
                <label>
                  <input type='radio' name='gender' value='female' /> Female
                </label>
              </div>
            </div>

            
            {userType === 'job seeker' && (
              <>
                <div className='mb-3'>
                  <label className='form-label'>Choose Agency</label>
                  <select name='agency' className='form-control' required>
                    <option value=''>Select Agency</option>
                    {/* Add your agency options here */}
                    <option value='agency1'>Agency 1</option>
                    <option value='agency2'>Agency 2</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Upload Resume</label>
                  <input type='file' className='form-control' name='resume' required />
                </div>
              </>
            )}

            {userType === 'job agency' && (
              <>
                <div className='mb-3'>
                  <label className='form-label'>Agency Name</label>
                  <input
                    type='text'
                    className='form-control'
                    name='agencyName'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Agency Address</label>
                  <input
                    type='text'
                    className='form-control'
                    name='agencyAddress'
                    required
                  />
                </div>
              </>
            )}

            <button type='submit' className='btn btn-success'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
