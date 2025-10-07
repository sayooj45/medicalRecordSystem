import React, { useState } from 'react'
import logo from '../../assets/images/logo.png'
import loginImage from '../../assets/images/login-image.jpg'
import SignupButton from '../../components/SignupButton'
import { Link, useNavigate } from 'react-router-dom'
const PatientSignup = () => {
    const [selected, setSelected] = useState("");
    const [fullName,setFullName] = useState('')
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [gender,setGender] = useState('')
    const [address,setAddress] = useState('')
    const [password,setPassword] = useState('')
    const [age,setAge] = useState('')
    const [role,setRole] = useState('patient')
    const [error,setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit= async (e)=>{
            e.preventDefault()
            try {
                const response =await fetch('/api/patient/signup',{
                    method:'POST',
                    credentials:'include',
                    headers:{
                        'Content-Type':'Application/json'
                    },
                    body:JSON.stringify({
                        fullName:fullName,
                        userName:userName,
                        email:email,
                        phoneNumber:phoneNumber,
                        gender:gender,
                        address:address,
                        password:password,
                        age:age,
                        role:role
                    })
                })
                if (!response.ok){
                  console.log(response);
                  
                    const errorData =await response.json()
                    throw new Error(errorData.message||"signup Failed")
                }
                navigate('/login')
            } catch (error) {
                setError(error.message || "Signup Failed: Please Try Again!")
                console.log(error);
                
            }
        }

  return (
    <div
    className="font-inter md:h-screen bg-gradient-to-r from-[#66D0C6] to-[#2679AD]"
  >
    <img src={logo} alt="logo" className="md:size-30 size-40 md:fixed" />
    <div className="md:flex md:pt-[50px] md:h-full m-auto w-[70%] shadow-xl  p-10">
      <div className="max-md:h-[400px]">
        <img
          src={loginImage}
          alt="image"
          className="h-full w-full"
        />
      </div>
      <div className="bg-white md:w-[70%] p-5 h-full">
        <div className="text-end">
          <SignupButton name={'Login'}/>
        </div>
        <form onSubmit={handleSubmit} className="p-4 h-full">
          <h1 className="text-center font-bold text-[32px] font-[inria-serif]">
            Access Your Health Dashboard
          </h1>
          {error && alert(error)}
          <div className="">
            <input
              type="text"
              className=" text-[24px] border-b border-[#807A7A] mt-[20px] w-full focus:outline-hidden focus:text-black"
              placeholder="Full Name"
              onChange={(e)=>setFullName(e.target.value)}
            />
            <input
              type="text"
              className=" text-[24px] border-b border-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder="User Name"
              onChange={(e)=>setUserName(e.target.value)}
            />
            <input
              type="email"
              className=" text-[24px] border-b border-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder=" Email"
              onChange={(e)=>setEmail(e.target.value)}
            />
            
            <input
              type="tel"
              min={10}
              max={10}
              className=" text-[24px] border-b border-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder="Phone Number"
              onChange={(e)=>setPhoneNumber(e.target.value)}
            />
            <input
              type="number" min={1}
              className=" text-[24px] border-b border-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder="Age"
              onChange={(e)=>setAge(e.target.value)}
            />
            <select name="" id="" value={selected}  onChange={(e) => {setSelected(e.target.value)
              setGender(e.target.value)
            } }
            className={`text-[24px] border-b border-[#807A7A] mt-[20px] w-full focus:outline-none
            ${selected === "" ? "text-[#807A7A]" : "text-[#474545]"}` 
            }>
              <option value="" disabled hidden >Gender</option>
              <option value="Male" >Male</option>
              <option value="Female"  >Female</option>
            </select>
            <input
              type="TEXT"
              className=" text-[24px] border-b border-b-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder="Address"
              onChange={(e)=>setAddress(e.target.value)}
            />
            <input
              type="password"
              className=" text-[24px] border-b border-b-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder=" Password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            
            <SignupButton name={'Sign Up'}/>
          </div>
          <div className="text-center mt-[10px]">
            <span>I am a </span>
            <Link
              to='/hospitalSignup'
              className="text-[#2428f2] hover:underline"
              >Hospital</Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default PatientSignup