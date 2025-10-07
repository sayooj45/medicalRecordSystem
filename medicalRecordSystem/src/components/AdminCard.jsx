import React, { useContext, useEffect, useState } from 'react'
import hospital from '../assets/images/cardHospital.png'
import patient from '../assets/images/patient.png'
import chat from '../assets/images/chatting.png'
import { DataContext } from '../context/DataProvider'
const AdminCard = () => {
  const [countMessage,setCountMessage] = useState(0) 
  useEffect(()=>{
      const fetchMessage = async ()=>{
        const res = await fetch('/api/admin/messages',{
          method:'GET',
        })
        if (!res.ok){
          console.log(res);
          
          throw new Error('cant find messages')
        }
        const data = await res.json()
        console.log(data,'data');
        setCountMessage(data.length)
      }
      fetchMessage()
    },[])

    const {hospitalCount,patientCount} = useContext(DataContext)
  return (
    <div
            className="md:grid md:grid-cols-3 md:gap-4 grid grid-cols-1 gap-4 justify-around w-full md:mx-[100px] p-5"
          >
            <div className="bg-white p-10 flex flex-col items-center rounded-2xl">
              <div className="flex items-center justify-center">
                <img
                  src={hospital}
                  alt="image"
                  className="h-[60px]"
                />
                <h1 className="font-bold text-[32px]">{hospitalCount}</h1>
              </div>
              <h1 className="text-center text-[32px] font-bold">Hospitals</h1>
            </div>
            <div className="bg-white p-10 flex flex-col items-center rounded-2xl">
              <div className="flex items-center justify-center">
                <img
                  src={patient}
                  alt="image"
                  className="h-[60px]"
                />
                <h1 className="font-bold text-[32px]">{patientCount}</h1>
              </div>
              <h1 className="text-center text-[32px] font-bold">Patients</h1>
            </div>
            <div className="bg-white p-10 flex flex-col items-center rounded-2xl">
              <div className="flex items-center justify-center">
                <img
                  src={chat}
                  alt="image"
                  className="h-[60px]"
                />
                <h1 className="font-bold text-[32px]">{countMessage}</h1>
              </div>
              <h1 className="text-center text-[32px] font-bold">Messages</h1>
            </div>
          </div>
  )
}

export default AdminCard