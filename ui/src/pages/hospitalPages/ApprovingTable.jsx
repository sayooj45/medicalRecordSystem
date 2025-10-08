import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ApprovingTable = () => {
    const [statusData,setStatusData] = useState([])
    const status = 'Approve'
    const reject = 'Reject'
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchStatus=async()=>{
            const res = await fetch('/api/hospital/viewStatus',{
                method:'GET',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                },

            })
            if(!res.ok){
                console.log(res);
                throw new Error('something went wrong')
                
            }
            const data = await res.json()
            console.log('status',data);
            setStatusData(data)
            
            
        }
        fetchStatus()
    },[])

    const acceptStatus = async(userName)=>{
        const res = await fetch('/api/hospital/status',{
            method:'PUT',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({userName:userName,status:status})
        })
        if(!res.ok){
            console.log(res);
            throw new Error('something went wrong')
            
        }
        const data = await res.json()
        console.log(data);
        navigate('/hospitalPatients')
        
    }
    const rejectStatus = async(userName)=>{
        const res = await fetch('/api/hospital/reject/status',{
            method:'PUT',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({userName:userName,status:reject})
        })
        if(!res.ok){
            console.log(res);
            throw new Error('something went wrong')
            
        }
        const data = await res.json()
        console.log(data);
        navigate('/hospitalPatients')
        
    }
  return (
<>
    {
        statusData.length >0?(
            <div className="overflow-x-auto rounded-2xl shadow-md mt-6">
      <table className="min-w-full border-collapse text-center text-sm font-medium">
        <thead className="bg-[#2679AD] text-white uppercase text-[15px] tracking-wide">
          <tr>
            <th className="p-3 rounded-tl-2xl">No</th>
            <th className="p-3">Username</th>
            <th className="p-3 rounded-tr-2xl">Request</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50 text-gray-700">
          {statusData?.map((data, index) => (
            <tr
              key={index}
              className="hover:bg-blue-50 transition duration-200 border-b last:border-none"
            >
              <td className="p-3 font-semibold">{index+1}</td>
              <td className="p-3">{data.UserName}</td>
              <td className="p-3 flex justify-center gap-3">
                <button className="border border-green-500 bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-white hover:text-green-600 transition duration-300"
                onClick={()=>{acceptStatus(data.UserName)}}>
                  Accept
                </button>
                <button className="border border-red-500 bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-white hover:text-red-600 transition duration-300"
                onClick={()=>{rejectStatus(data.UserName)}}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        ):<></>
    }
</>
  )
}

export default ApprovingTable
