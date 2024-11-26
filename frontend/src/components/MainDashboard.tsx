import React, { useEffect, useState } from 'react'
import ODdashboard from '../components/ODdashboard'
import MDdashboard from '../components/MDdashboard'

const MainDashboard = () => {
    // const[type,setType]=useState<any>('null')
    const doctorType=localStorage.getItem('userType')
    // console.log("00000000",doctorType)
    // const fetchType=async()=>{
    //     try{
    //           setType(doctorType)
    //     }
    //     catch(error)
    //     {
    //        console.log('error fetching doctor')
    //     }
    // }
    // useEffect(()=>{
    //       fetchType();
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])
    // // console.log(type);
    
  return (
  
    <div>{doctorType==='OD'?(<ODdashboard/>):(<MDdashboard/>)}</div>
  )
}

export default MainDashboard