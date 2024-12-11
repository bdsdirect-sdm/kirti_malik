import React, { useEffect } from 'react'
import ODdashboard from '../components/ODdashboard'
import MDdashboard from '../components/MDdashboard'
import { useNavigate } from 'react-router-dom'



const MainDashboard = () => {
  
    const navigate=useNavigate();
    const doctorType=localStorage.getItem('userType')
    

    useEffect(()=>{
      const token=localStorage.getItem('token');
      if(!token){
        navigate('/login',{replace:true})
      }


    },[navigate])


  return (
  
    <div>{doctorType==='OD'?(<ODdashboard/>):(<MDdashboard/>)}</div>
  )
}

export default MainDashboard