import React from 'react'
import {  useNavigate } from 'react-router-dom'

const SignupButton = ({name}) => {
  const navigate =useNavigate()
  return (
    <button className=
    {name=='Login'? "bg-[#2679AD] p-2 rounded-lg text-white font-bold md:w-[150px] text-[20px] hover:bg-[#66D0C6] duration-300 hover:text-black":"bg-[#66D0C6] p-2 rounded-lg text-black font-bold md:w-[200px] md:w-[200px] w-full mt-[25px] text-[24px] hover:bg-[#2679AD] hover:text-white duration-300"}
    onClick={()=>{{name==='Login'?navigate('/login'):''}}}
          >
            {name}
          </button>
  )
}

export default SignupButton