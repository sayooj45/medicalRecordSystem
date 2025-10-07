import React, { useEffect, useState } from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import SideBar from '../../components/SideBar'
import PatientProfileCard from '../../components/PatientProfileCard'
import PatientProfileData from '../../components/PatientProfileData'
import HospitalPatientProfileCard from '../../components/HospitalPatientProfileCard'
import HospitalPatientProfileData from '../../components/HospitalPatientProfileData'
import { useParams } from 'react-router-dom'

const SinglePatient = () => {

    const {patientName} = useParams()

    //     const [fullName,setFullName] = useState()
    //     const [age,setAge] = useState()
    //     const [gender,setGender] = useState()
    // const [bloodGroup,setBloodGroup] = useState()
    // const [allergies,setAllergies] = useState()
    // const [disease,setDisease] = useState()
    // const [height,setHeight] = useState()
    // const [weight,setWeight] = useState()
    // const [dp,setDp] = useState()
    // const [heartRate,setHeartRate] = useState()
    // const [Temperature,setTemperature]= useState()
    // const [glucose,setGlucose] = useState()
    // const [testReport,setTestReport] = useState([])
    // const [prescription,setprescription] = useState()
    const [patientData,setPatientData] = useState()

useEffect(()=>{
        const fetchPatientDetails = async()=>{
            try {
                const res = await fetch('/api/hospital/singleUser',{
                  method:"POST",
                  credentials:'include',
                 
                    headers:{'Content-Type':'application/json'},
                 
                  body:JSON.stringify({userName:patientName})
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
            // setFullName(data.FullName)
            // setAge(data.Age)
            // setGender(data.Gender)
            // setBloodGroup(data.BloodGroup)
            // setAllergies(data.Allergies)
            // setDisease(data.Dieseases)
            // setHeight(data.Height)
            // setWeight(data.Weight)
            // setDp(data.Image)
            // setHeartRate(data.HartRate)
            // setTemperature(data.Temperature)
            // setGlucose(data.Glucose)
            // setTestReport(data.TestReports)
            // setprescription(data.Prescription)
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
        <div className='w-[80%] m-auto flex'>
        {/* <!-- profile  --> */}
        {/* <PatientProfileCard /> */}
        <HospitalPatientProfileCard patientData= {patientData}/>

        {/* <!-- data  --> */}
        {/* <PatientProfileData /> */}
        <HospitalPatientProfileData patientData= {patientData}/>
        </div>
      </div>
    </div>
  )
}

export default SinglePatient