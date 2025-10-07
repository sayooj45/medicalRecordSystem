import React from 'react'

const HospitalData = ({hospitalData,patientHospitalData,adminHospitalData}) => {
  console.log(hospitalData,'data');
  
  return (
    <div className="w-[650px] bg-white p-5 rounded-2xl mt-[50px]">
            <h1 className="text-[20px] font-bold">Hospital Details</h1>
            <div className="mt-[25px]">
              {[
                { label: "Specialties", value:hospitalData? (hospitalData.Specialties):patientHospitalData?(patientHospitalData.Specialties):adminHospitalData?adminHospitalData.Specialties:'' },
                { label: "Facilities", value:hospitalData? (hospitalData.Facilities):patientHospitalData?(patientHospitalData.Facilities):adminHospitalData?adminHospitalData.Facilities:'' },
                { label: "Website", value:hospitalData? (hospitalData.Website):patientHospitalData?(patientHospitalData.Website):adminHospitalData?adminHospitalData.Website:'' },
                { label: "Email", value:hospitalData? (hospitalData.Email):patientHospitalData?(patientHospitalData.Email):adminHospitalData?adminHospitalData.Email:'' },
                { label: "Phone", value:hospitalData? (hospitalData.PhoneNumber ):patientHospitalData?(patientHospitalData.PhoneNumber):adminHospitalData?adminHospitalData.PhoneNumber:''},
                { label: "Address", value:hospitalData?( hospitalData.Address ):patientHospitalData?(patientHospitalData.Address):adminHospitalData?adminHospitalData.Address:''},
                { label: "Est. Year", value:hospitalData? (hospitalData.EstYear):patientHospitalData?(patientHospitalData.EstYear):adminHospitalData?adminHospitalData.EstYear:'' },
                // { label: "Status", value:HospitalData? hospitalData.Status:'' },
              ].map((item, index) => (
                <div key={index} className="flex my-2">
                  <h1 className="font-semibold w-[150px]">{item.label} :</h1>
                  <h1 className="text-[#807A7A]">{item.value}</h1>
                </div>
              ))}
            </div>
          </div>
  )
}

export default HospitalData