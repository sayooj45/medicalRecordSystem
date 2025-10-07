import React, { useContext } from 'react'
import { LoginContext } from '../context/LoginProvider'
import HospitalImg from '../assets/images/hospital.jpg'
const HospitalProfileInfo = ({hospitalData}) => {
  const {loginDetails} = useContext(LoginContext)
  console.log(loginDetails,'logindetaila');
  console.log(hospitalData ,'hospital data');
  
  
  return (
    <div className="mx-10 flex flex-col justify-center">
          <div className="text-center bg-white w-[350px] h-[250px] flex flex-col justify-center rounded-2xl">
            <div className="">
              <img
                src={HospitalImg}
                alt=""
                className=" h-[150px]  mx-auto"
              />
              {/* <img
                src={HospitalImg}
                alt=""
                className="absolute bottom-0  h-[150px] mx-auto"
              /> */}
            </div>
            <h1 className="text-[24px] font-bold">{loginDetails?loginDetails.userName:''}</h1>
            <h2 className="text-[#807A7A]">Since {hospitalData?hospitalData.EstYear:''}</h2>
          </div>

          <div className="bg-white rounded-2xl px-5 py-10 mt-[50px]">
            <h1 className="font-semibold text-[20px]">Information :</h1>
            <div className="flex my-5">
              <h1 className="font-semibold">Hospital ID :</h1>
              <h1 className="text-[#807A7A] pl-2">{hospitalData?hospitalData.HospitalId:''}</h1>
            </div>
            <div className="flex my-5">
              <h1 className="font-semibold">Location :</h1>
              <h1 className="text-[#807A7A] pl-2">{hospitalData?hospitalData.Address:''}</h1>
            </div>
            <div className="flex my-5">
              <h1 className="font-semibold">Specialties :</h1>
              <h1 className="text-[#807A7A] pl-2">{hospitalData?hospitalData.Specialties:''}</h1>
            </div>
            <div className="flex my-5">
              <h1 className="font-semibold">Facilities :</h1>
              <h1 className="text-[#807A7A] pl-2">{hospitalData?hospitalData.Facilities:''}</h1>
            </div>
          </div>
        </div>
  )
}

export default HospitalProfileInfo