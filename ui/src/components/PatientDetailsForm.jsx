import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PatientDetailsForm = () => {
  const [glucose,setGlucose] = useState()
  const [temperature,setTemperature] = useState()
  const [bloodGroup,setBloodGroup] = useState()
  const [allergies,setAllergies] = useState()
  const [disease,setDisease] = useState()
  const [height,setHeight] = useState()
  const [weight,setWeight] = useState()
  const [heartRate,setHeartRate] = useState()

  const navigate = useNavigate()

    const handleSubmit =async (e) => {
    e.preventDefault();

    const res = await fetch('/api/user/profile',{
      method:'POST',
      credentials:'include',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({bloodGroup:bloodGroup,allergies:allergies,dieseases:disease,height:height,
        weight:weight,hartRate:heartRate,temperature:temperature,glucose:glucose})
    })
    if(!res.ok){
      console.log(res);
      alert('cant submited')
      throw new Error('cant submit')
      
    }
    const data = await res.json()
    console.log(data);
  navigate('/patientProfile/:PatientId')
    
    
  };

  return (
    <div className="w-full mb-[50px] flex flex-col justify-center items-center">
      <form className="w-[900px] bg-white p-10" onSubmit={handleSubmit}>
        {/* <div className="text-[20px] font-medium mt-[50px] flex gap-4">
          <input type="radio" name="gender" id="male" value="Male" />
          <label htmlFor="male">Male</label>

          <input type="radio" name="gender" id="female" value="Female" />
          <label htmlFor="female">Female</label>
        </div> */}

        <div className="flex justify-around">
          <div>
            <div className="mt-[25px]">
              <label htmlFor="firstName" className="text-[#807A7A] text-[20px] font-medium">Heart Rate</label>
              <br />
              <input type="text" name="firstName" id="firstName" className="bg-[#D9D9D9] rounded-lg h-[33px] px-2" 
              onChange={(e)=>{setHeartRate(e.target.value)}}/>
            </div>

            <div className="mt-[25px]">
              <label htmlFor="bloodGroup" className="text-[#807A7A] text-[20px] font-medium">Blood Group</label>
              <br />
              <select name="bloodGroup" id="bloodGroup" className="bg-[#D9D9D9] rounded-lg h-[33px] w-full px-2"
              onChange={(e)=>{setBloodGroup(e.target.value)}}>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="O+">B+</option>
                <option value="O-">B-</option>
                <option value="A+">AB+</option>
                <option value="A-">AB-</option>
              </select>
            </div>

            <div className="mt-[25px]">
              <label htmlFor="age" className="text-[#807A7A] text-[20px] font-medium">Glucose</label><br />
              <input type="text" name="age" id="age" className="bg-[#D9D9D9] rounded-lg h-[33px] px-2" 
              onChange={(e)=>{setGlucose(e.target.value)}}/>
            </div>

            <div className="mt-[25px]">
              <label htmlFor="height" className="text-[#807A7A] text-[20px] font-medium">Height</label><br />
              <input type="text" name="height" id="height" className="bg-[#D9D9D9] rounded-lg h-[33px] px-2" 
              onChange={(e)=>{setHeight(e.target.value)}}/>
            </div>


          </div>

          <div>
            <div className="mt-[25px]">
              <label htmlFor="lastName" className="text-[#807A7A] text-[20px] font-medium">Temperature</label><br />
              <input type="text" name="lastName" id="lastName" className="bg-[#D9D9D9] rounded-lg h-[33px] px-2" 
              onChange={(e)=>{setTemperature(e.target.value)}}/>
            </div>

            <div className="mt-[25px]">
              <label htmlFor="allergies" className="text-[#807A7A] text-[20px] font-medium">Allergies</label><br />
              <input type="text" name="allergies" id="allergies" className="bg-[#D9D9D9] rounded-lg h-[33px] px-2" 
              onChange={(e)=>{setAllergies(e.target.value)}}/>
            </div>

            <div className="mt-[25px]">
              <label htmlFor="diseases" className="text-[#807A7A] text-[20px] font-medium">Diseases</label><br />
              <input type="text" name="diseases" id="diseases" className="bg-[#D9D9D9] rounded-lg h-[33px] px-2" 
              onChange={(e)=>{setDisease(e.target.value)}}/>
            </div>

            <div className="mt-[25px]">
              <label htmlFor="weight" className="text-[#807A7A] text-[20px] font-medium">Weight</label><br />
              <input type="text" name="weight" id="weight" className="bg-[#D9D9D9] rounded-lg h-[33px] px-2" 
              onChange={(e)=>{setWeight(e.target.value)}}/>
            </div>


          </div>
        </div>

        

        <button type="submit" className="w-full border border-[#66D0C6] text-[#66D0C6] font-bold h-[75px] text-[24px] rounded-lg mt-[50px]">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientDetailsForm;
