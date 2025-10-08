import React, { useContext, useState } from 'react'
import adminProfile from '../assets/images/admin-profile.png'
import exit from '../assets/images/exit.png'
import { LoginContext } from '../context/LoginProvider'
import { useNavigate } from 'react-router-dom'
const HomeNavbar = () => {
  const navigate = useNavigate()
  const {loginDetails,logout,loading} = useContext(LoginContext)
  console.log(loginDetails);

   const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
      
    }
  };

  if (loading) {
  return (
    <nav className="w-full px-5">
      <p className="animate-pulse text-gray-500">Loading user...</p>
    </nav>
  );
}
  return (
     <nav className="w-full">
         <ul className="flex justify-end items-center px-5  ">
          {/* <li
            className="p-5 hover:cursor-pointer hover:underline decoration-4 duration-300 hover:translate-y-[-5px]"
          >
            <i className="fa-regular fa-bell text-[24px] relative">
              <i
                className="fa-solid fa-circle absolute text-[10px] left-3 text-red-500"
              ></i></i>
          </li> */}
          <li
            className="p-5  hover:underline decoration-4 duration-300 "
          >
            <img
              src={adminProfile}
              alt="user"
              className="h-[30px] rounded-full"
              
            />
          </li>
          <li className="pr-5">
  <h1 className="text-[20px] font-semibold">
    {loading
      ? "Loading..."
      : loginDetails?.userName
      ? loginDetails.userName
      : "User"}
  </h1>
</li>
          <li>
              <div className='flex'>
                  <button onClick={handleLogout}>
                    <img src={exit} alt="logout"  className='h-[20px] hover:cursor-pointer  duration-300 hover:translate-y-[-5px]'/>
                  </button>
                </div>
          </li>
          
        </ul>
       
        
      </nav>
  )
}

export default HomeNavbar