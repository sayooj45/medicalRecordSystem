import React from 'react'
import hospitalImg from '../assets/images/hospital.jpg'
const PatientHospitalProfile = ({hospitalData}) => {
  return (
    <div className=" w-[750px] bg-white p-5 items-center rounded-2xl">
                <img
                  src={hospitalImg}
                  alt="hospital-image"
                  className="h-[250px] rounded-xl m-auto"
                />
                <div className="pl-5">
                  <h1 className="text-center font-bold text-[24px]">{hospitalData?hospitalData.HospitalName:''}</h1>
                  <h2 className="text-center font-bold text-[20px] text-[#807A7A]">{hospitalData?hospitalData.Type:''}</h2>
                  <p className="p-5 font-medium text-[#807A7A]">{hospitalData?hospitalData.About:''}</p>
                </div>
              </div>
  )
}

export default PatientHospitalProfile