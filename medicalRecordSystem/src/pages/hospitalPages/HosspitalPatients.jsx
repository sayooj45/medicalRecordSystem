import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SideBar from '../../components/SideBar'
import HomeNavbar from '../../components/HomeNavbar'

const HosspitalPatients = () => {
  const [patientData,setPatientData] = useState([])
  const [patientSearch,setPatientSearch] = useState('')

  useEffect(()=>{
    const fetchData = async()=>{
      try {
      const res = await fetch('/api/hospital/viewPatients',{
      method:'GET',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      }
    })
    if(!res.ok){
      console.log(res);
      
      throw new Error ('cant fetch patients data')
    }
    const data = await res.json()
    console.log('patients',data);
    
    setPatientData(data)
    } catch (error) {
      console.log(error);
      
    }
    }
    fetchData()
  },[])

  const filterPatientDetails = patientData?.filter((patient)=>
              patient?.FullName?.toLowerCase().includes(patientSearch.toLowerCase())
          )
  

  return (
    <div className='bg-[#F9F9F9] h-screen '>
      <HomeNavbar/>
      <SideBar/>
    <div className="w-[80%] m-auto p-5">
            <div className="md:flex justify-between max:md-p-5">
              <h1 className="text-[20px] font-bold">Patients List</h1>
              <input
                type="text"
                className="bg-white md:h-[50px] max-md:w-full p-4 rounded-2xl outline-none"
                placeholder="Search..."
                onChange={(e)=>setPatientSearch(e.target.value)}
              />
            </div>
            <div className="flex justify-between mt-[20px]">
              {/* <div className="flex p-2">
                <h1 className="text-[20px] font-bold text-[#807A7A]">Filter</h1>
                <img
                  src={filter}
                  alt="filter"
                  className="h-[30px] p-2 hover:cursor-pointer"
                />
              </div> */}
              <h1 className="text-[20px] font-bold text-[#807A7A] p-2">
                Total 
              </h1>
            </div>
            <div className="mx:h-[700px] overflow-auto">
              <table
                className="w-full text-center border-separate border-spacing-y-4">
      <thead>
        <tr className="text-[24px] font-bold bg-[#66D0C6] h-[50px]">
          <th className="rounded-l-lg">Patient Name</th>
          <th>Gender</th>
          <th>Age</th>
          {/* <th >ID</th> */}
          <th className="rounded-r-lg"></th>
          
        </tr>
      </thead>
      <tbody>
          {
            patientSearch? filterPatientDetails.map((data,index)=>(
              <tr
            
            className="text-[20px] font-semibold text-[#807A7A] bg-white h-[50px]"
            key={index}
          >
            <td className="rounded-l-lg">{data.UserName}</td>
            <td>{data.Gender}</td>
            <td>{data.Age}</td>
            {/* <td>{data.PatientID}</td> */}
            <td>

              <button className="border border-[#66D0C6] text-[#66D0C6] bg-[white] p-1 w-[75px] rounded-lg hover:bg-[#66D0C6] hover:text-white duration-300">
                <Link >View</Link>
              </button>
            </td>
          </tr>
            )): patientData.map((data,index)=>(
              <tr
            
            className="text-[20px] font-semibold text-[#807A7A] bg-white h-[50px]"
            key={index}
          >
            <td className="rounded-l-lg">{data.UserName}</td>
            <td>{data.Gender}</td>
            <td>{data.Age}</td>
            {/* <td>{data.PatientID}</td> */}
            <td>

              <button className="border border-[#66D0C6] text-[#66D0C6] bg-[white] p-1 w-[75px] rounded-lg hover:bg-[#66D0C6] hover:text-white duration-300">
                <Link to={`/singlePatient/${data.UserName}`}>View</Link>
              </button>
            </td>
          </tr>
            ))
          }

      </tbody>             
</table>
</div>
 </div>
 </div>

  )
}

export default HosspitalPatients