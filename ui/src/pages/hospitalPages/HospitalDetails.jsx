import React, { useContext, useEffect, useState } from 'react'
import HomeNavbar from '../../components/HomeNavbar';
import SideBar from '../../components/SideBar';
import HospitalProfile from '../../components/HospitalProfile';
import HospitalData from '../../components/HospitalData';
import { LoginContext } from '../../context/LoginProvider';
import { useParams } from 'react-router-dom';
import ApprovingTable from './ApprovingTable';



const HospitalDetails = () => {
  const {UserName} = useParams()
  console.log(UserName,'username');
  

  const {loginDetails} = useContext(LoginContext)
  console.log(loginDetails,'details');
  

    const [hospitalData,setHospitalData] = useState()

    const [patientHospitalData,setPatientHospitalData]= useState()
    const [adminHospitalData,setAdminHospitalData]= useState()

    useEffect(()=>{
                
                
            const hospitalSubmit = async()=>{
            try {
                
                const res = await fetch('/api/hospital/details',{
                method:'POST',
                credentials:'include',
                headers: {
                        'Content-Type': 'application/json',   
                        },

                body:JSON.stringify({UserName:loginDetails.userName})
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


const patientHospitalSubmit = async ()=>{
  try {
                
                const res = await fetch('/api/user/hospital',{
                method:'POST',
                credentials:'include',
                headers: {
                        'Content-Type': 'application/json',   
                        },

                body:JSON.stringify({userName:UserName})
            })
            if(!res.ok){
                console.log(res);
                throw new Error('cant fetch hospital data')
                
            }
            const data = await res.json()
            console.log(data);
           setPatientHospitalData(data)
            
        }
             catch (error) {
                console.log(error);
                
            }   
}

const adminHospitalSubmit = async()=>{
            try {
                
                const res = await fetch('/api/admin/singleHospital',{
                method:'POST',
                credentials:'include',
                headers: {
                        'Content-Type': 'application/json',   
                        },

                body:JSON.stringify({userName:UserName})
            })
            if(!res.ok){
                console.log(res);
                throw new Error('cant fetch hospital data')
                
            }
            const data = await res.json()
            console.log(data);
            setAdminHospitalData(data)
            
        }
             catch (error) {
                console.log(error);
                
            }   
    }

    adminHospitalSubmit()
patientHospitalSubmit()

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
          <HospitalProfile hospitalData={hospitalData} patientHospitalData={patientHospitalData} adminHospitalData={adminHospitalData}/>

          {/* Hospital Details */}
          <HospitalData hospitalData={hospitalData} patientHospitalData={patientHospitalData} adminHospitalData={adminHospitalData}/>

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
      <div className='m-auto w-[50%] mt-10'>
          <ApprovingTable/>
        </div>
    </div>
  )
}

export default HospitalDetails