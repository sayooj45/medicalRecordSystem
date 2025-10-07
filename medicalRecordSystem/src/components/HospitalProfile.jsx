import React from 'react'
import hospitalImg from '../assets/images/hospital.jpg'
const HospitalProfile = ({hospitalData,patientHospitalData,adminHospitalData}) => {
  return (
    <div className=" w-[750px] bg-white p-5 items-center rounded-2xl">
            <img
              src={hospitalImg}
              alt="hospital-image"
              className="h-[250px] rounded-xl m-auto"
            />
            <div className="pl-5">
              <h1 className="text-center font-bold text-[24px]">{hospitalData?(hospitalData.HospitalName):patientHospitalData?(patientHospitalData.HospitalName): adminHospitalData?(adminHospitalData.HospitalName):''}</h1>
              <h2 className="text-center font-bold text-[20px] text-[#807A7A]">{hospitalData?(hospitalData.Type):patientHospitalData?(patientHospitalData.Type):adminHospitalData?(adminHospitalData.Type):''}</h2>
              <p className="p-5 font-medium text-[#807A7A]">{hospitalData?(hospitalData.About):patientHospitalData?(patientHospitalData.About):adminHospitalData?(adminHospitalData.About):''}</p>
            </div>
          </div>
  )
}

export default HospitalProfile