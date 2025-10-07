import React from 'react'
import team from '../assets/images/team.jpg'

import DoctorCard from '../components/DoctorCard'
const Doctors = () => {
  return (
        <div
      className="md:h-screen  bg-cover bg-center mt-[100px] p-5"
      style={{backgroundImage: `url(${team})`}}
    >
      <h1 className="text-[40px] font-bold text-white text-center pt-10">
        Our Doctors
      </h1>
      <p
        className="text-[24px] font-medium text-white text-center w-[60%] m-auto mt-[50px]"
      >
        Our team of experienced and certified doctors is committed to providing
        high-quality, personalized care to every patient. With expertise across
        various specialties, they ensure accurate diagnoses, compassionate
        treatment, and trusted healthcare support.
      </p>
        <DoctorCard/>
    </div>
  )
}

export default Doctors