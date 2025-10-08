import React from 'react'
import user from '../assets/images/user.png'
const HospitalPatientProfileCard = ({patientData}) => {
  return (
    <div className="mx-10 flex flex-col justify-center">
              <div
                className="text-center bg-white w-[350px] h-[250px] flex flex-col justify-center rounded-2xl"
              >
                <div className="relative">
                  <img
                    // src={loginDetails?(loginDetails.role==='admin' ? user : user):user}
                    src={user}
                    alt=""
                    className="h-[100px] rounded-full w-[100px] mx-auto"
                  />
                  
                </div>
                <h1 className="text-[24px] font-bold">{patientData?patientData.FullName:''}</h1>
                <h2 className="text-[#807A7A]">Age {patientData?patientData.Age:''}</h2>
              </div>
              <div className="bg-white rounded-2xl px-5 py-10 mt-[50px]">
                <h1 className="font-semibold text-[20px]">Information :</h1>
                <div className="flex my-5">
                  <h1 className="font-semibold">Gender :</h1>
                  <h1 className="text-[#807A7A] pl-2">{patientData?patientData.Gender:''}</h1>
                </div>
                <div className="flex my-5">
                  <h1 className="font-semibold">Blood Group :</h1>
                  <h1 className="text-[#807A7A] pl-2">{patientData?patientData.BloodGroup:''}</h1>
                </div>
                <div className="flex my-5">
                  <h1 className="font-semibold">Allergies :</h1>
                  <h1 className="text-[#807A7A] pl-2">{patientData?patientData.Allergies:''}</h1>
                </div>
                <div className="flex my-5"> 
                  <h1 className="font-semibold">Disease :</h1>
                  <h1 className="text-[#807A7A] pl-2">{patientData?patientData.Dieseases:''}</h1>
                </div>
                <div className="flex my-5">
                  <h1 className="font-semibold">Height :</h1>
                  <h1 className="text-[#807A7A] pl-2">{patientData?patientData.Height:''}</h1>
                </div>
                <div className="flex my-5">
                  <h1 className="font-semibold">Weight :</h1>
                  <h1 className="text-[#807A7A] pl-2">{patientData?patientData.Weight:''}</h1>
                </div>
                <div className="flex my-5">
                  <h1 className="font-semibold">Patient ID :</h1>
                  <h1 className="text-[#807A7A] pl-2">{patientData?patientData.PatientId:''}</h1>
                </div>
              </div>
            </div>
  )
}

export default HospitalPatientProfileCard