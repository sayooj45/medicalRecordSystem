import React from 'react'
import doctor1 from '../assets/images/doctor1.png'
const DoctorCard = () => {
  return (
          <div className="md:flex justify-evenly mt-[50px]">
        <div className="bg-gray-400 rounded-lg w-[350px] max-md:mx-auto">
          <img
            src={doctor1}
            alt="doctor"
            className="h-[400px] mx-auto"
          />
          <div className="bg-white text-center rounded-b-lg">
            <h1 className="text-[36px] font-bold">David Jhon</h1>
            <h2 className="text-[24px] font-medium">Doctor</h2>
          </div>
        </div>

        <div
          className="bg-gray-400 rounded-lg w-[350px] max-md:mx-auto max-md:mt-5"
        >
          <img
            src={doctor1}
            alt="doctor"
            className="h-[400px] mx-auto"
          />
          <div className="bg-white text-center rounded-b-lg">
            <h1 className="text-[36px] font-bold">David Jhon</h1>
            <h2 className="text-[24px] font-medium">Doctor</h2>
          </div>
        </div>

        <div
          className="bg-gray-400 rounded-lg w-[350px] max-md:mx-auto max-md:mt-5"
        >
          <img
            src={doctor1}
            alt="doctor"
            className="h-[400px] mx-auto"
          />
          <div className="bg-white text-center rounded-b-lg">
            <h1 className="text-[36px] font-bold">David Jhon</h1>
            <h2 className="text-[24px] font-medium">Doctor</h2>
          </div>
        </div>
      </div>
  )
}

export default DoctorCard