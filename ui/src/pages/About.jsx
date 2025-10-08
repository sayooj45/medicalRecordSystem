import React from 'react'
import about1 from '../assets/images/about1.jpg'
const About = () => {
  return (
    <div id="about">
          <h1 className="text-[40px] font-bold md:ml-[200px] max-md:text-center">
            About Us
          </h1>
          <div className="md:flex items-center justify-evenly max-md:text-center">
            <div className="text-[20px] text-[#807A7A] md:w-[700px] max-md:p-4">
              At Medical Records System, we are committed to transforming the way
              healthcare data is stored, accessed, and shared. Our platform is built
              to empower patients, doctors, and medical institutions with secure,
              user-friendly, and intelligent tools to manage health records
              digitally. We believe that efficient healthcare starts with better
              information management – and that starts here.
            </div>
            <img
              src={about1}
              alt="image"
              className="w-[450px] h-[260px] max-md:m-auto max-md:p-4"
            />
          </div>
        </div>
  )
}

export default About