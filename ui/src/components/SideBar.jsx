import React, { useContext } from 'react'
import logo from '../assets/images/logo.png'
import home from '../assets/images/home.png'
import hospital from '../assets/images/hospital.png'
import patient from '../assets/images/patientSb.png'
import chatting from '../assets/images/chattingSb.png'
import { Link, Links } from 'react-router-dom'
import {Link as ScrollLink} from 'react-scroll'
import profile from '../assets/images/profile-user.png'
import { LoginContext } from '../context/LoginProvider'
import { NavLink } from 'react-router-dom'
const SideBar = ({showSidebar,setShowSidebar,page}) => {
  
  const {loginDetails} = useContext(LoginContext)
  return (
    <>
    {/* { 
      showSidebar && ( */}
        <div
          className="bg-[#66D0C6] w-[150px] h-screen mt-[-70px] flex-col justify-around fixed hidden md:flex"
          id="sidebar"
        >
          {/* <div className="flex items-center justify-around">
            <img
              src={logo}
              alt="logo"
              className="h-[120px] w-[120px]"
            />
            <div className="md:hidden p-3">
              <button onClick={()=>setShowSidebar(!showSidebar)} className='cursor-pointer  '>
                <i
                className="fa-solid fa-xmark text-white "
                
              ></i>
              </button>
            </div>
          </div> */}
          <div >
            <div>
              <div
                className="text-white text-center my-10 hover:underline decoration-4 duration-300 hover:translate-y-[-5px] hover:cursor-pointer"
              >
                <img
                  src={home}
                  alt="logo"
                  className="h-[36px] mx-auto"
                />
                <h1 className="text-[16px] font-medium">
                  {loginDetails?(loginDetails.role === 'hospital'?(<NavLink to={'/hospitalDashboard/:UserName'}  className={({ isActive }) =>
        isActive && 'underline decoration-4'
      }>Home</NavLink>):(loginDetails.role === 'patient')?(<NavLink to={'/patientProfile/:PatientId'}
      className={({ isActive }) =>
    isActive && 'underline decoration-4' 
  }>Home</NavLink>):loginDetails.role === 'admin'?(page === 'Home'?(
                  <ScrollLink to='#' smooth={true}>Profile</ScrollLink>):
                  (<NavLink to='/adminDashboard' className={({ isActive }) =>
    isActive && 'underline decoration-4' 
  } >Home</NavLink>)):''):''}
                  
                </h1>
              </div>
              { loginDetails?(
                loginDetails.role!== 'admin'?(
                <div
                className="text-white text-center my-10 hover:underline decoration-4 duration-300 hover:translate-y-[-5px] hover:cursor-pointer"
              >
                <img
                  src={profile}
                  alt="logo"
                  className="h-[36px] mx-auto"
                />
                <h1 className="text-[16px] font-medium">
                  {loginDetails?(loginDetails.role === 'hospital'?(
                  <NavLink to='/hospitalForm' className={({ isActive }) =>
    isActive && 'underline decoration-4' 
  }>Profile</NavLink>):loginDetails.role==='patient'?(
                    <NavLink to='/patientForm' className={({ isActive }) =>
    isActive && 'underline decoration-4' 
  }>Profile</NavLink>
                  ):''):''}
                  
                </h1>
              </div>
                ):''):''
              }
              { loginDetails?(
                loginDetails.role === 'hospital'?'': loginDetails.role === 'patient'?(
                  <div
                className="text-white text-center my-10 hover:underline decoration-4 duration-300 hover:translate-y-[-5px] hover:cursor-pointer"
              >
                <img
                  src={hospital}
                  alt="logo"
                  className="h-[36px] mx-auto"
                />
                <h1 className="text-[16px] font-medium">

                  
                  <NavLink to='/hospitalTable' className={({ isActive }) =>
    isActive && 'underline decoration-4' 
  }>Hospital</NavLink>
                </h1>
              </div>
                ):
                <div
                className="text-white text-center my-10 hover:underline decoration-4 duration-300 hover:translate-y-[-5px] hover:cursor-pointer"
              >
                <img
                  src={hospital}
                  alt="logo"
                  className="h-[36px] mx-auto"
                />
                <h1 className="text-[16px] font-medium">

                  {page === 'Home'?
                  <ScrollLink to='hospital' smooth={true}>Hospital</ScrollLink>:
                  <NavLink to='/adminDashboard' className={({ isActive }) =>
    isActive && 'underline decoration-4' 
  }>Hospital</NavLink>}
                </h1>
              </div>):''
              }
              { loginDetails?(
                loginDetails.role==='patient'?'':loginDetails.role === 'hospital'?<div
                className="text-white text-center my-10 hover:underline decoration-4 duration-300 hover:translate-y-[-5px] hover:cursor-pointer"
              >
                <img
                  src={patient}
                  alt="logo"
                  className="h-[36px] mx-auto"
                />
                <h1 className="text-[16px] font-medium">
                  <NavLink to='/hospitalPatients'className={({ isActive }) =>
    isActive && 'underline decoration-4' 
  }>Patient</NavLink>
                </h1>
              </div>:(
                  <div
                className="text-white text-center my-10 hover:underline decoration-4 duration-300 hover:translate-y-[-5px] hover:cursor-pointer"
              >
                <img
                  src={patient}
                  alt="logo"
                  className="h-[36px] mx-auto"
                />
                <h1 className="text-[16px] font-medium">
                  {page === 'Home'?
                  <ScrollLink to='patient' smooth={true}>Patient</ScrollLink>:
                  <NavLink to='/adminDashboard'className={({ isActive }) =>
    isActive && 'underline decoration-4' 
  }>Patient</NavLink>}
                </h1>
              </div>
                )):''
              }
              <div
                className="text-white text-center my-10 hover:underline decoration-4 duration-300 hover:translate-y-[-5px] hover:cursor-pointer"
              >
                <img
                  src={chatting}
                  alt="logo"
                  className="h-[36px] mx-auto"
                />
                <NavLink to='/message'  className={({ isActive }) =>
    isActive ? 'underline decoration-4 text-[16px] font-medium' :"text-[16px] font-medium" 
  }>Messages</NavLink>
              </div>
            </div>
            <div className="text-white text-center">
              <hr />
              <div className="mt-5">
                <h1
                  className="text-[16px] pt-5 hover:text-zinc-200 duration-300 hover:cursor-pointer"
                >
                  Terms and Conditions
                </h1>
                <h1
                  className="text-[16px] py-5 hover:text-zinc-200 duration-300 hover:cursor-pointer"
                >
                  Help & Support
                </h1>
              </div>
            </div>
          </div>
        </div>
      {/* )
    } */}
    </>
    
  ) 
}

export default SideBar