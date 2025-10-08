import React, { useContext, useState } from 'react'
import user from '../assets/images/user.png'
import pen from '../assets/images/pen.png'
import { LoginContext } from '../context/LoginProvider'
const PatientProfileCard = ({cardDetails,patientData}) => {
  console.log(cardDetails);
  console.log(patientData);
  
  const {loginDetails } = useContext(LoginContext)
  
  return (
    <div className="mx-10 flex flex-col justify-center">
          <div
            className="text-center bg-white w-[350px] h-[250px] flex flex-col justify-center rounded-2xl"
          >
            <div className="relative">
              <img
                src={loginDetails?(loginDetails.role==='admin' ? user : user):user}
                alt=""
                className="h-[100px] rounded-full w-[100px] mx-auto"
              />
              { loginDetails?(
                loginDetails.role === 'patent'?
                  <img
                    src={pen}
                      alt=""
                      className="absolute top-5 right-5 h-[30px] mx-auto"
                  />:''):''
               }
            </div>
            <h1 className="text-[24px] font-bold">{loginDetails?(cardDetails?cardDetails.fullName:patientData?(patientData.FullName):''):''}</h1>
            <h2 className="text-[#807A7A]">Age {loginDetails?(cardDetails?cardDetails.age:patientData?(patientData.Age):''):''}</h2>
          </div>
          <div className="bg-white rounded-2xl px-5 py-10 mt-[50px]">
            <h1 className="font-semibold text-[20px]">Information :</h1>
            <div className="flex my-5">
              <h1 className="font-semibold">Gender :</h1>
              <h1 className="text-[#807A7A] pl-2">{loginDetails?(cardDetails?cardDetails.gender:patientData?(patientData.Gender):''):''}</h1>
            </div>
            <div className="flex my-5">
              <h1 className="font-semibold">Blood Group :</h1>
              <h1 className="text-[#807A7A] pl-2">{loginDetails?(cardDetails?cardDetails.bloodGroup:patientData?(patientData.BloodGroup):''):''}</h1>
            </div>
            <div className="flex my-5">
              <h1 className="font-semibold">Allergies :</h1>
              <h1 className="text-[#807A7A] pl-2">{loginDetails?(cardDetails?cardDetails.allergies:patientData?(patientData.Allergies):''):''}</h1>
            </div>
            <div className="flex my-5"> 
              <h1 className="font-semibold">Disease :</h1>
              <h1 className="text-[#807A7A] pl-2">{loginDetails?(cardDetails?cardDetails.disease:patientData?(patientData.Dieseases):''):''}</h1>
            </div>
            <div className="flex my-5">
              <h1 className="font-semibold">Height :</h1>
              <h1 className="text-[#807A7A] pl-2">{loginDetails?(cardDetails?cardDetails.height:patientData?(patientData.Height):''):''}</h1>
            </div>
            <div className="flex my-5">
              <h1 className="font-semibold">Weight :</h1>
              <h1 className="text-[#807A7A] pl-2">{loginDetails?(cardDetails?cardDetails.weight:patientData?(patientData.Weight):''):''}</h1>
            </div>
            {/* <div className="flex my-5">
              <h1 className="font-semibold">Patient ID :</h1>
              <h1 className="text-[#807A7A] pl-2">{loginDetails?(cardDetails?cardDetails.patientId:patientData?(patientData.PatientID):''):''}</h1>
            </div> */}
          </div>
        </div>
  )
}

export default PatientProfileCard