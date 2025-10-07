import React from 'react'

import logo from '../assets/images/logo.png'
import landing1 from '../assets/images/landing1.jpg'
import waveHaikei from '../assets/images/wave-haikei.svg'
import { Link } from 'react-router-dom'
import { Link as ScorllLink } from 'react-scroll'
import Navbar from '../components/Navbar'
const Landing = () => {
  return (
    <div className="h-screen relative">
          <img
            src={landing1}
            alt="image"
            className="h-screen absolute top-0 left-0 w-full z-0"
          />
          <div
            className="bg-gradient-to-r from-[#66D0C6] to-[#66D0C6]/15 h-screen absolute top-0 left-0 w-full z-10"
          >
            <div className="md:flex justify-between items-center z-20">
              <img
                src={logo}
                alt="logo"
                className="h-[150px] w-[150px]"
              />
              <Navbar/>
            </div>
            <div className="p-10">
              <h1 className="font-bold text-[40px] text-white md:w-[600px]">
                Secure. Accessible. Smarter Healthcare Records.
              </h1>
              <p className="text-[24px] font-medium text-white md:w-[400px]">
                Manage and access medical records anytime, anywhere - with complete
                privacy and efficiency.
              </p>
              <div className="flex md:mt-[100px] mt-[25px]">
                <div
                  className="bg-white p-1 md:w-[100px] text-center rounded-lg mr-10 hover:bg-[#2679AD] text-[#66D0C6] hover:text-white duration-600"
                >
                  <Link to={'/login'} className="text-[24px] font-medium"
                    >Login</Link>
                </div>
                <div
                  className="bg-white p-1 md:w-[100px] text-center rounded-lg mr-10 hover:bg-[#2679AD] text-[#66D0C6] hover:text-white duration-600"
                >
                  <Link to={'/patientSignup'} className="text-[24px] font-medium"
                    >Sign Up</Link>
                </div>
                <ScorllLink to='features' smooth={true}  className="p-1 text-center cursor-pointer">
                  <h1 className="text-[24px] font-medium text-white hover:underline  hover:text-[#2679AD] duration-600 ">
                    Learn More
                  </h1>
                </ScorllLink >
              </div>
            </div>
            <img
              src={waveHaikei}
              alt=""
              className="absolute w-full bottom-0 z-[-10]"
            />
          </div>
        </div>
  )
}

export default Landing