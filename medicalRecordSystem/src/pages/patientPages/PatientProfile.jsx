import React, { useContext, useEffect, useState } from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import SideBar from '../../components/SideBar'
import { useParams } from 'react-router-dom'
import PatientProfileCard from '../../components/PatientProfileCard'
import PatientProfileData from '../../components/PatientProfileData'
import { LoginContext } from '../../context/LoginProvider'


const PatientProfile = () => {

  const {loginDetails} = useContext(LoginContext)
  
    const [fullName,setFullName] = useState()
    const [age,setAge] = useState()
    const [gender,setGender] = useState()
const [bloodGroup,setBloodGroup] = useState()
const [allergies,setAllergies] = useState()
const [disease,setDisease] = useState()
const [height,setHeight] = useState()
const [weight,setWeight] = useState()
const [dp,setDp] = useState()
const [heartRate,setHeartRate] = useState()
const [Temperature,setTemperature]= useState()
const [glucose,setGlucose] = useState()
const [testReport,setTestReport] = useState([])
const [prescription,setprescription] = useState()

    const {UserName} = useParams()
    console.log(UserName);
    
    // useEffect(()=>{
    //     const fetchPatientDetails = async()=>{
    //         try {
    //             const res = await fetch(`/api/admin/singlePatient?PatientId=${encodeURIComponent(PatientId)}`)
    //         if(!res.ok){
    //             throw new Error("Failed to fetch patient details!")
    //         }
    //         const data = await res.json()
    //         if(!data || !data.UserName){
    //             throw new Error('user not found!')
    //         }
    //         console.log(data);
    //         setFullName(data.FullName)
    //         setAge(data.Age)
    //         setGender(data.Gender)
    //         setBloodGroup(data.BloodGroup)
    //         setAllergies(data.Alergies)
    //         setDisease(data.Dieseases)
    //         setHeight(data.Height)
    //         setWeight(data.Weight)
    //         setDp(data.Image)
    //         setHeartRate(data.HartRate)
    //         setTemerature(data.Temperature)
    //         setGlucose(data.Glucose)
    //         setTestReport(data.TestReports)
    //         setprescription(data.Prescription)
    //         } catch (error) {
    //             console.log(error);
                
    //         }
            
    //     }
    //     fetchPatientDetails()
    // },[]) 

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
                throw new Error("Failed to fetch patient details!")
            }
            const data = await res.json()
            if(!data || !data.UserName){
                throw new Error('user not found!')
            }
            console.log(data);
            setFullName(data.FullName)
            setAge(data.Age)
            setGender(data.Gender)
            setBloodGroup(data.BloodGroup)
            setAllergies(data.Allergies)
            setDisease(data.Dieseases)
            setHeight(data.Height)
            setWeight(data.Weight)
            setDp(data.Image)
            setHeartRate(data.HartRate)
            setTemperature(data.Temperature)
            setGlucose(data.Glucose)
            setTestReport(data.TestReports)
            setprescription(data.Prescription)
            } catch (error) {
                console.log(error);
                
            }
            
        }

        const fetchAdminPatientDetails = async()=>{
            try {
                const res = await fetch('/api/admin/singlePatient',{
                  method:"POST",
                  credentials:'include',
                  headers:{
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({userName:UserName})
                })
            if(!res.ok){
                throw new Error("Failed to fetch patient details!")
            }
            const data = await res.json()
            if(!data || !data.UserName){
                throw new Error('user not found!')
            }
            console.log(data);
            setFullName(data.FullName)
            setAge(data.Age)
            setGender(data.Gender)
            setBloodGroup(data.BloodGroup)
            setAllergies(data.Allergies)
            setDisease(data.Dieseases)
            setHeight(data.Height)
            setWeight(data.Weight)
            setDp(data.Image)
            setHeartRate(data.HartRate)
            setTemperature(data.Temperature)
            setGlucose(data.Glucose)
            setTestReport(data.TestReports)
            setprescription(data.Prescription)
            } catch (error) {
                console.log(error);
                
            }
            
        }
        fetchAdminPatientDetails()
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
        <PatientProfileCard cardDetails = {{gender,bloodGroup,allergies,disease,height,weight,fullName,age,dp}}/>

        {/* <!-- data  --> */}
        <PatientProfileData profileData = {{heartRate,Temperature,glucose,testReport,prescription}}/>
        </div>
      </div>
    </div>

  )
}

export default PatientProfile