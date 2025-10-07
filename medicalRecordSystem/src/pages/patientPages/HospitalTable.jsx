import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import HomeNavbar from '../../components/HomeNavbar'
import SideBar from '../../components/SideBar'

const HospitalTable = () => {
  // const [hospitalName,setHospitalName] = useState()
  const status = 'pending'
  const navigate = useNavigate()
    const [hospitalData,sethospitalData]= useState()
    useEffect(()=>{
        const fetchHospital = async()=>{
            const res = await fetch('/api/user/profile/HospitalList',{
                method:'GET',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },
                
            })
            if(!res.ok){
                console.log(res);
                throw new Error ('filed to fetching hospital data ')
            }
            const data = await res.json()
            sethospitalData(data)
            console.log(hospitalData);
            
        }
        fetchHospital()
    },[])

    const submitStatus = async(hospitalName)=>{
      const res = await fetch('/api/user/status',{
        method:'POST',
        credentials:'include',
        headers:{
          "Content-Type":'application/json',
        },
        body:JSON.stringify({hospitalName:hospitalName,status:status})
        
      }
    )
     if(!res.ok){
        console.log(res);
         alert('You already sent request!')
        throw new Error('something went wrong')
       
      }
      const data = res.json()
      console.log(data);
      navigate('/patientProfile/:UserName')
    }
  return (
    <div className="bg-[#F9F9F9] h-screen">
        <HomeNavbar/>
        <SideBar/>
      <div className='w-[80%] m-auto'>
        <table className="w-full text-center border-separate border-spacing-y-4">
        <thead>
          <tr className="text-[24px] font-bold bg-[#66D0C6] h-[50px]">
            <th className="rounded-l-lg">Hospital Name</th>
            <th>Type</th>
            <th>Established Year</th>
            <th></th>
            <th className="rounded-r-lg"></th>
          </tr>
        </thead>
        <tbody>
          {hospitalData?.map((data,index) => (
            <tr
              key={index}
              className="text-[20px] font-semibold text-[#807A7A] bg-white h-[50px]"
            >
              <td className="rounded-l-lg">{data.HospitalName}</td>
              <td>{data.Type}</td>
              <td>{data.EstYear?.split('-')[0]}</td>
              <td>
                <button className="border border-[#66D0C6] text-[#66D0C6] bg-[white] px-2 p-1  rounded-lg hover:bg-[#66D0C6] hover:text-white duration-300">
                  <Link to={`/singleHospital/${data.UserName}`}>View</Link>
                </button>
              </td>
              <td className='rounded-r-lg'>
                <button className="  border border-[#2679AD] text-[#2679AD] bg-[white] p-1  rounded-lg hover:bg-[#2679AD] hover:text-white duration-300" 
                onClick={()=>{submitStatus(data.UserName)
                }}>
                  Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default HospitalTable
