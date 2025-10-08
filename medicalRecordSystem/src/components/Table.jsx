import React, { Children, useContext, useState } from 'react'
import filter from '../assets/images/filter.png'
import { DataContext } from '../context/DataProvider'
import { Link, useNavigate } from 'react-router-dom'


const Table = ({tableCondition}) => {
    const navigate = useNavigate()
    const [patientSearch,setPatientSearch] = useState('')
    const [hospitalSearch,setHospitalSearch] = useState('')
    const { hospitalDetails,
        patientDetails,
        hospitalCount,
        patientCount } = useContext(DataContext);

        const filterHospitalDetails = hospitalDetails.filter((hospial)=>
            hospial?.HospitalName?.toLowerCase().includes(hospitalSearch.toLowerCase())
        )

        const filterPatientDetails = patientDetails.filter((patient)=>
            patient?.FullName?.toLowerCase().includes(patientSearch.toLowerCase())
        )

        const patientDelete = async(UserName)=>{
          console.log(UserName);
          
          try {
            const res = await fetch('/api/admin/patient',{
            method:'DELETE',
            credentials:'include',
             headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({UserName})

          })
          
          
        if (!res.ok) {
          alert('Something went wrong ')
          throw new Error('cant delete data');
        }
          const data = await res.json()
          console.log('successfully patient deleted ',data);
          // navigate('/adminDashboard')
          window.location.reload();
          
          } catch (error) {
            console.log(error);
            
          }

        }


        const HospitalDelete = async(HospitalId)=>{
          console.log(HospitalId);
          
          try {
            const res = await fetch('/api/admin/hospital',{
            method:'DELETE',
            credentials:'include',
             headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify({HospitalId})

          })
          
          
        if (!res.ok) {
          alert('Something went wrong ')
          throw new Error('cant delete data');
        }
          const data = await res.json()
          console.log('successfully hospital deleted ',data);
          // navigate('/adminDashboard')
          window.location.reload();
          
          } catch (error) {
            console.log(error);
            
          }

        }
        

  return (
    <>
    <div className="w-full md:ml-[80px] p-5">
            <div className="md:flex justify-between max:md-p-5">
              <h1 className="text-[20px] font-bold">{tableCondition} List</h1>
              <input
                type="text"
                className="bg-white md:h-[50px] max-md:w-full p-4 rounded-2xl outline-none"
                placeholder="Search..."
                onChange={(e)=>{tableCondition === 'Hospital'?setHospitalSearch(e.target.value):setPatientSearch(e.target.value)}}
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
                Total {tableCondition} : {tableCondition === 'Hospital'?hospitalCount :patientCount}
              </h1>
            </div>
            <div className="mx:h-[700px] overflow-auto">
              <table
                className="w-full text-center border-separate border-spacing-y-4"
              >
                {
  tableCondition === 'Hospital' ? (
    <>
      <thead>
        <tr className="text-[24px] font-bold bg-[#66D0C6] h-[50px]">
          <th className="rounded-l-lg">{tableCondition} Name</th>
          <th>Type</th>
          <th>Established Year</th>
          <th></th>
          <th className="rounded-r-lg"></th>
        </tr>
      </thead>
      <tbody>
        {filterHospitalDetails.map((data) => (
          <tr
            key={data.id}
            className="text-[20px] font-semibold text-[#807A7A] bg-white h-[50px]"
          >
            <td className="rounded-l-lg">{data.HospitalName}</td>
            <td>{data.Type}</td>
            <td>{data.EstYear.split("-")[0]}</td>
            <td>
              <button className="border border-[#66D0C6] text-[#66D0C6] bg-[white] p-1 w-[75px] rounded-lg hover:bg-[#66D0C6] hover:text-white duration-300">
                <Link to={`/hospitalDashboard/${data.UserName}`}>View</Link>
              </button>
            </td>
            <td>
              <button className="border border-red-500 text-red-500 bg-[white] p-1 w-[75px] rounded-lg hover:bg-red-500 hover:text-white duration-300"
              onClick={()=>{HospitalDelete(data.HospitalId)}}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  ) : (
    <>
      <thead>
        <tr className="text-[24px] font-bold bg-[#66D0C6] h-[50px]">
          <th className="rounded-l-lg">{tableCondition} Name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>ID</th>
          <th></th>
          <th className="rounded-r-lg"></th>
        </tr>
      </thead>
      <tbody>
        {filterPatientDetails.map((data) => (
          <tr
            key={data.id}
            className="text-[20px] font-semibold text-[#807A7A] bg-white h-[50px]"
          >
            <td className="rounded-l-lg">{data.FullName}</td>
            <td>{data.Gender}</td>
            <td>{data.Age}</td>
            <td>{data.PatientId}</td>
            <td>

              <button className="border border-[#66D0C6] text-[#66D0C6] bg-[white] p-1 w-[75px] rounded-lg hover:bg-[#66D0C6] hover:text-white duration-300">
                <Link to={`/patientProfile/${data.UserName}`}>View</Link>
              </button>
            </td>
            <td>
              <button className="border border-red-500 text-red-500 bg-[white] p-1 w-[75px] rounded-lg hover:bg-red-500 hover:text-white duration-300"
              onClick={()=>{patientDelete(data.UserName)}}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </>
  )
}

                
                
</table>
</div>
 </div>
 
 </>
          
  )
}

export default Table
