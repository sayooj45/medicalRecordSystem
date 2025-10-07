import React, { useContext, useEffect, useState } from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import SideBar from '../../components/SideBar'
import PatientProfileCard from '../../components/PatientProfileCard'
import PatientDetailsForm from '../../components/PatientDetailsForm'
import { LoginContext } from '../../context/LoginProvider'
const PatientForm = () => {
    const [patientData,setPatientData]= useState([])

    useEffect(()=>{
        const fetchPatientDetails = async()=>{
            try {
                const res = await fetch('/api/user/singlePatient',{
                  method:"GET",
                  credentials:'include',
                  headers:{
                    headers:{'Content-Type':'application/json'}
                  }
                })
            if(!res.ok){
              console.log(res);
              
                throw new Error("Failed to fetch patient details!")
            }
            const data = await res.json()
            if(!data || !data.UserName){
                throw new Error('user not found!')
            }
            console.log(data);
            setPatientData(data)
            } catch (error) {
                console.log(error);
                
            }
            
        }
        fetchPatientDetails()
    },[])
  return (
    <div className="bg-[#F9F9F9] h-screen">
      <HomeNavbar />

      <div className="flex justify-between">
        {/* <!-- side bar --> */}
        <SideBar />

        <div className='w-[80%] flex m-auto'>
            {/* <!-- profile  --> */}
        <PatientProfileCard patientData = {patientData}/>

        {/* <!-- form --> */}
    
            <PatientDetailsForm/>
        </div>

      </div>
    </div>

  )
}

export default PatientForm