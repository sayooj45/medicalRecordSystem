import React from 'react'

const PatientHospitalData = ({hospitalData}) => {
  return (
    <div className="w-[650px] bg-white p-5 rounded-2xl mt-[50px]">
            <h1 className="text-[20px] font-bold">Hospital Details</h1>
            <div className="mt-[25px]">
              {[
                { label: "Specialties", value:hospitalData? (hospitalData.Specialties):'' },
                { label: "Facilities", value:hospitalData? (hospitalData.Facilities):'' },
                { label: "Website", value:hospitalData? (hospitalData.Website):'' },
                { label: "Email", value:hospitalData? (hospitalData.Email):'' },
                { label: "Phone", value:hospitalData? (hospitalData.PhoneNumber ):''},
                { label: "Address", value:hospitalData?( hospitalData.Address ):''},
                { label: "Est. Year", value:hospitalData? (hospitalData.EstYear):'' },
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

export default PatientHospitalData