import React, { useEffect, useState } from 'react'

const MainDashboard = () => {
    const[type,setType]=useState<any>('null')
    const doctorType=localStorage.getItem('userType')
    console.log("00000000",doctorType)
    const fetchType=async()=>{
        try{
              setType(doctorType)
        }
        catch(error)
        {
           console.log('error fetching doctor')
        }
    }
    useEffect(()=>{
          fetchType();
    },[])
  return (
  
    <div>MainDashboard</div>
  )
}

export default MainDashboard