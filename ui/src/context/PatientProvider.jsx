import { useEffect } from "react"

export const PatientProvider =()=>{
    useEffect(()=>{
        const fetchPatientDetails =  async()=>{
            const res = await fetch('api/hospital/viewPatients')
        }
    },[])
}