import React, { useContext, useEffect, useState } from 'react'
import HomeNavbar from '../../components/HomeNavbar';
import SideBar from '../../components/SideBar';
import HospitalProfileInfo from '../../components/HospitalProfileInfo';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginProvider';
const HospitalForm = () => {
  const {loginDetails} = useContext(LoginContext)

    const [about, setAbout] = useState("");
  const [specialties, setSpecialties] = useState("");
  const [facilities, setFacilities] = useState("");
  const [website, setWebsite] = useState("");
  const [hospitalData,setHospitalData] = useState()
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch('/api/hospital/profile',{
        method:'POST',
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({about:about,specialties:specialties,facilities:facilities,website:website})
    })
    if(!res.ok){
        console.log(res);
        throw new Error('cant submit form')
        
    }
    const data = await res.json()
    console.log(data);
    setHospitalData(data)
    console.log('data submited');
    navigate('/hospitalDashboard/:UserName')
    
    
  };
    useEffect(()=>{
                  
                  
              const hospitalSubmit = async()=>{
              try {
                  
                  const res = await fetch('/api/hospital/details',{
                  method:'POST',
                  credentials:'include',
                  headers: {
                          'Content-Type': 'application/json',   
                          },
  
                  body:JSON.stringify({UserName:loginDetails.userName})
              })
              if(!res.ok){
                  console.log(res);
                  throw new Error('cant fetch hospital data')
                  
              }
              const data = await res.json()
              console.log(data);
              setHospitalData(data)
              
          }
               catch (error) {
                  
              }   
      }
      hospitalSubmit()
  },[])
  return (
    <div className="bg-[#F9F9F9] min-h-screen">
      <HomeNavbar />

      <div className="flex justify-between">

        <SideBar />

        <div className='w-[80%] flex m-auto'>
        <HospitalProfileInfo hospitalData={hospitalData}/>


        <div className="w-full mb-[50px] flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="w-[900px] bg-white px-5 py-3"
          >
            <div className="flex justify-around">
              <div className="w-[45%]">
                <div className="mt-[20px]">
                  <label className="text-[#807A7A] text-[20px] font-medium">
                    About
                  </label>
                  <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="bg-[#D9D9D9] rounded-lg h-[80px] w-full"
                  ></textarea>
                </div>
                <div className="mt-[20px]">
                  <label className="text-[#807A7A] text-[20px] font-medium">
                    Website
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="bg-[#D9D9D9] rounded-lg h-[33px] w-full"
                  />
                </div>
              </div>

              <div className="w-[45%]">
                <div className="mt-[20px]">
                  <label className="text-[#807A7A] text-[20px] font-medium">
                    Specialties
                  </label>
                  <input
                    type="text"
                    value={specialties}
                    onChange={(e) => setSpecialties(e.target.value)}
                    className="bg-[#D9D9D9] rounded-lg h-[33px] w-full"
                  />
                </div>
                <div className="mt-[20px]">
                  <label className="text-[#807A7A] text-[20px] font-medium">
                    Facilities
                  </label>
                  <input
                    type="text"
                    value={facilities}
                    onChange={(e) => setFacilities(e.target.value)}
                    className="bg-[#D9D9D9] rounded-lg h-[33px] w-full"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full border border-[#66D0C6] text-[#66D0C6] font-bold h-[75px] text-[24px] rounded-lg mt-[50px]"
            >
              Submit
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default HospitalForm