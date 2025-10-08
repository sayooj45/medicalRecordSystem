import React, { createContext, useEffect, useState } from 'react'

  export  const DataContext =createContext()

 export const DataProvider = ({children}) => {
    const [hospitalDetails,setHospitalDetails] = useState([])
        const [patientDetails,setPatientDetails] = useState([])
        const [error,setError] = useState(null)
        const [hospitalCount,setHospitalCount] = useState(0)
        const [patientCount,setPatientCount] = useState(0)

        
    
    
    
        useEffect(()=>{
            const fetchHospitals =async()=>{
                try {
                    const res = await fetch('/api/admin/hospital',{
                        method:"GET",
                        credentials:'include'
                    })
                if (!res.ok){
                    throw new Error("Failed to fetch hospitals details!")
                }
                const data =await res.json()
                console.log(data);
                setHospitalDetails(data)
                setHospitalCount(data.length)
                
                } catch (error) {
                    console.log(error);
                    setError(error.message||"Error fetching details")
                }
    
            }
    
            const fetchPatients =async()=>{
                try {
                    const res = await fetch('/api/admin/patient',{
                        method:"GET",
                        credentials:'include'
                    })
                if (!res.ok){
                    throw new Error("Failed to fetch patients details!")
                }
                const data =await res.json()
                console.log(data);
                setPatientDetails(data)
                setPatientCount(data.length)
                
                } catch (error) {
                    console.log(error);
                    setError(error.message||"Error fetching details")
                }
    
            }
        
            fetchHospitals()
            fetchPatients()
        },[])
    
  return (
    <DataContext.Provider
      value={{
        hospitalDetails,
        patientDetails,
        hospitalCount,
        patientCount,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

