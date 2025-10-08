import React, { useEffect, useState } from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import SideBar from '../../components/SideBar'
import HospitalProfile from '../../components/HospitalProfile'
import HospitalData from '../../components/HospitalData'
import PatientHospitalProfile from '../../components/PatientHospitalProfile'
import PatientHospitalData from '../../components/PatientHospitalData'
import { useParams } from 'react-router-dom'

const SingleHospital = () => {
  const {hospitalName} = useParams()
  console.log(hospitalName,'hospitalName');
   const [hospitalData,setHospitalData] = useState()

  useEffect(()=>{
                  
                  
              const hospitalSubmit = async()=>{
              try {
                  
                  const res = await fetch('/api/hospital/details',{
                  method:'POST',
                  credentials:'include',
                  headers: {
                          'Content-Type': 'application/json',   
                          },
  
                  body:JSON.stringify({UserName:hospitalName})
              })
              if(!res.ok){
                  console.log(res);
                  throw new Error('cant fetch hospital data')
                  
              }
              const data = await res.json()
              console.log(data);
              setHospitalData(data)
              
          }
               catch (error) {
                  console.log(error);
                  
              }   
      }
      hospitalSubmit()
    },[])
  return (
    <div className="bg-[#F9F9F9] h-screen ">
      {/* Navbar */}
      <HomeNavbar />

      <div className="flex">
        {/* Sidebar */}
        <SideBar />

        {/* Hospital Profile */}
        <div className=" items-center m-auto w-[80%] flex justify-around">
          {/* <HospitalProfile /> */}
          <PatientHospitalProfile hospitalData= {hospitalData}/>
          {/* Hospital Details */}
          {/* <HospitalData /> */}
          <PatientHospitalData hospitalData = {hospitalData}/>

          {/* Contact Hospital */}
          {/* <div className="bg-white text-center p-5 rounded-2xl mt-[50px]">
            <h1 className="text-start text-[20px] font-bold">Need to Contact</h1>
            <textarea
              placeholder="Add your message"
              className="border border-[#807A7A] text-[20px] text-[#807A7A] rounded-lg p-2 mt-[20px] w-full"
            ></textarea>
            <div className="flex justify-end mt-2">
              <img src="../Images/common/paper-plane.png" alt="send" className="h-[50px]" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default SingleHospital