import React from 'react'
import ODdashboard from '../components/ODdashboard'
import MDdashboard from '../components/MDdashboard'


const MainDashboard = () => {
 
    const doctorType=localStorage.getItem('userType')


  return (
  
    <div style={{height: 'calc(100vh - 97px)'}}>{doctorType==='OD'?(<ODdashboard/>):(<MDdashboard/>)}</div>
  )
}

export default MainDashboard