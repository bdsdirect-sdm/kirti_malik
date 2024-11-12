import React, { useEffect, useState } from 'react'
import ODdashboard from './ODdashboard'
import MDdashboard from './MDdashboard'

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
  
    <div>{type==='OD'?(<ODdashboard/>):(<MDdashboard/>)}</div>
  )
}

export default MainDashboard