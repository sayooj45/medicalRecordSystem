import React, { useState } from 'react'
import SignupButton from '../../components/SignupButton'
import logo from '../../assets/images/logo.png'
import loginImage from '../../assets/images/login-image.jpg'
import { Link, useNavigate } from 'react-router-dom'

const HospitalSignup = () => {
            const [selected, setSelected] = useState("");
        const [hospitalName,setHospitalName] = useState('')
        const [userName,setUserName] = useState('')
        const [email,setEmail] = useState('')
        const [phoneNumber,setPhoneNumber] = useState('')
        const [type,setType] = useState('')
        const [address,setAddress] = useState('')
        const [password,setPassword] = useState('')
        const [estYear,setEstYear] = useState('')
        const [role,setRole] = useState('hospital')
        const [error,setError] = useState('')
        const [isDate, setIsDate] = useState(false);
        const [about,setAbout] = useState('')

        const navigate = useNavigate()

        const handleSubmit= async (e)=>{
            e.preventDefault()
            try {
                const response =await fetch('/api/hospital/signup',{
                    method:'POST',
                    credentials:'include',
                    headers:{
                        'Content-Type':'Application/json'
                    },
                    body:JSON.stringify({
                        hospitalName:hospitalName,
                        userName:userName,
                        email:email,
                        phoneNumber:phoneNumber,
                        type:type,
                        address:address,
                        password:password,
                        estYear:estYear,
                        role:role,
                        about:about
                    })
                })
                if (!response.ok){
                    const errorData =await response.json()
                    alert('signup Failed')
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
    <div className="md:flex md:pt-[50px] md:h-[90%] m-auto w-[70%] shadow-xl  ">
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
        <form  className="p-4 h-full" onSubmit={handleSubmit}>
          <h1 className="text-center font-bold text-[32px] font-[inria-serif]">
            Access Your Health Dashboard
          </h1>
          <div className="">
            <input
              type="text"
              className=" text-[24px] border-b border-[#807A7A] mt-[20px] w-full focus:outline-hidden focus:text-black"
              placeholder="Hospital Name"
              onChange={(e)=>setHospitalName(e.target.value)}
              required
            />
            <input
              type="text"
              className=" text-[24px] border-b border-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder="User Name"
              onChange={(e)=>setUserName(e.target.value)}
              required
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
              required
            />
            <input
            //   type="date" 
            onFocus={() => setIsDate(true)}
             type={isDate ? "date" : "text"}
              className=" text-[24px] border-b border-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder="Est Year"
              onChange={(e)=>setEstYear(e.target.value)}
              required
            />
            <select name="" id="" value={selected}  onChange={(e) => {setSelected(e.target.value)
              setType(e.target.value)
            } }
            className={`text-[24px] border-b border-[#807A7A] mt-[20px] w-full focus:outline-none
            ${selected === "" ? "text-[#807A7A]" : "text-[#474545]"}` 
            } required>
              <option value="" disabled hidden >Type</option>
              <option value="Government Hospitals" >Government Hospitals</option>
              <option value="Private Hospitals"  >Private Hospitals</option>
              <option value="Charitable / Trust Hospitals"  >Charitable / Trust Hospitals</option>
            </select>
            <input
              type="text"
              className=" text-[24px] border-b border-b-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder="Address"
              onChange={(e)=>setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              className=" text-[24px] border-b border-b-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder="About"
              onChange={(e)=>setAbout(e.target.value)}
              required
            />
            <input
              type="password"
              className=" text-[24px] border-b border-b-[#807A7A] mt-[20px] w-full focus:outline-hidden"
              placeholder=" Password"
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            
            <SignupButton name={'Sign Up'}/>
          </div>
          <div className="text-center mt-[10px]">
            <span>I am a </span>
            <Link
              to='/patientSignup'
              className="text-[#2428f2] hover:underline"
              >Patient</Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default HospitalSignup