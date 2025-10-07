import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cardiogram from '../assets/images/cardiogram.png'
import body from '../assets/images/body.png'
import glucose from '../assets/images/glucose.png'
import xray from '../assets/images/x-ray.png'
import pdf from '../assets/images/pdf.png'
import add from '../assets/images/medical.png'
const HospitalPatientProfileData = ({patientData}) => {
    const [isHide,setIsHide] = useState(false)
    const [pres,setPres] =useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);

//   const {loginDetails} = useContext(LoginContext) 
  const [title,setTitle] = useState()
  const [date,setDate] = useState()
  const [testImage,setTestImage] = useState()
  const [duration,setDuration] = useState()

  const navigate = useNavigate()

  const testReportSubmit = async (userName) => {
  // e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("testImage", testImage);
    formData.append('userName',userName)

    const res = await fetch("/api/hospital/report", {
      method: "POST",
      credentials: "include",
      body: formData, 
    });

    if (!res.ok) {
      console.log(res);
      throw new Error("test report submitting failed");
    }

    const data = await res.json();
    console.log("Success:", data);
    navigate(`singlePatient/${patientData.UserName}`)
    setIsHide(false)
  } catch (error) {
    console.log("Error:", error);
  }
};

const prescriptionSubmit = async (userName) => {
//   e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("duration", duration);
    formData.append("title", title);
    formData.append("date", date);
    formData.append("testImage", testImage);
    formData.append('userName',userName)

    const res = await fetch("/api/hospital/prescription", {
      method: "POST",
      credentials: "include",
      body: formData, 
    });

    if (!res.ok) {
      console.log(res);
      throw new Error("prescription submitting failed");
    }

    const data = await res.json();
    console.log("Success:", data);
    navigate(`singlePatient/${patientData.UserName}`)
  } catch (error) {
    console.log("Error:", error);
  }
};
  return (
    <div className="w-full">
              <div className="flex justify-around w-[1100px]  ">
                <div
                  className="bg-white w-[300px] h-[200px] flex flex-col justify-center items-center rounded-2xl relative"
                >
                 
                  <img
                    src={cardiogram}
                    alt="image"
                    className="h-[40px] w-[40px]"
                  />
                  <h1 className="font-bold text-[24px]">Heart Rate</h1>
                  <h1 className="font-bold text-[24px]">
                    {patientData?.HartRate}<span className="text-[16px]">bps</span>
                  </h1>
                </div>
                <div
                  className="bg-white w-[300px] h-[200px] flex flex-col justify-center items-center rounded-2xl relative"
                >
                  
                  <img
                    src={body}
                    alt="image"
                    className="h-[40px] w-[40px]"
                  />
                  <h1 className="font-bold text-[24px]">Body Temperature</h1>
                  <h1 className="font-bold text-[24px]">{patientData?.Temperature}°c</h1>
                </div>
                <div
                  className="bg-white w-[300px] h-[200px] flex flex-col justify-center items-center rounded-2xl relative"
                >
                  
                  <img
                    src={glucose}
                    alt="image"
                    className="h-[40px] w-[40px]"
                  />
                  <h1 className="font-bold text-[24px]">Glucose</h1>
                  <h1 className="font-bold text-[24px]">{patientData?.Glucose}mg/dl</h1>
                </div>
              </div>
    
{/* ====== TEST REPORT SECTION ====== */}
<div className="bg-white p-5 rounded-2xl mt-[50px] mx-[60px] w-[1100px] ">
  <div className="flex justify-between items-baseline">
    <h1 className="text-[24px] font-bold mb-5">Test Report</h1>
    <button onClick={() => setIsHide(!isHide)}>
      <img src={add} alt="add" className="h-[20px]" />
    </button>
  </div>

  {/* SLIDER CONTAINER */}
  <div className="relative w-full flex justify-center items-center overflow-hidden">
    {/* Left Button */}
    <button
      onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))}
      disabled={currentIndex === 0}
      className="p-2 text-[#66D0C6] text-[24px] font-bold disabled:opacity-30 absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow"
    >
      ❮
    </button>

    {/* Slider Track */}
    <div className="overflow-hidden w-[90%]">
      <div
        className="flex gap-5 transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 320}px)`,
        }}
      >
        {patientData?.TestReports?.map((data, index) => (
          <div
            key={index}
            className="flex min-w-[300px] flex-shrink-0 bg-[#F9F9F9] p-4 rounded-xl shadow justify-center items-center"
          >
            <img src={`data:image/png;base64,${data.File}`} alt="report" className="h-[50px] w-[50px]" />
            <div className="ml-3">
              <h1 className="text-[20px] font-bold">{data.Title}</h1>
              <h2 className="text-[#807A7A] text-[16px]">{new Date(data.Date).toISOString().split('T')[0]}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Right Button */}
    <button
      onClick={() =>
        setCurrentIndex((prev) =>
          prev + 1 < (patientData?.TestReports?.length || 0) - 2
            ? prev + 1
            : prev
        )
      }
      disabled={currentIndex + 3 >= (patientData?.TestReports?.length || 0)}
      className="p-2 text-[#66D0C6] text-[24px] font-bold disabled:opacity-30 absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow"
    >
      ❯
    </button>
  </div>
</div>


    
              {isHide && (
  <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-2xl bg-black/30">
    <div className="p-10 bg-white rounded-lg shadow-lg w-[600px] max-w-[90%]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[#807A7A] text-[20px] font-medium">Test Report</h1>
        <button
          onClick={() => setIsHide(false)}
          className="text-gray-500 hover:text-gray-700 text-[20px] font-bold"
        >
          ✕
        </button>
      </div>

      <form onSubmit={(e) => {  testReportSubmit(patientData?.UserName); }}>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="testTitle"
            placeholder="Title"
            className="bg-[#D9D9D9] rounded-lg h-[40px] p-2"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="date"
            name="testDate"
            className="bg-[#D9D9D9] rounded-lg h-[40px] p-2"
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            type="file"
            name="testImage"
            className="bg-[#66D0C6] rounded-lg h-[40px] text-white p-1"
            onChange={(e) => setTestImage(e.target.files[0])}
            required
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-[#66D0C6] rounded-lg h-[45px] w-[120px] text-white font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}


{pres && (
  <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-2xl bg-black/30">
    <div className="p-10 bg-white rounded-lg shadow-lg w-[600px] max-w-[90%]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[#807A7A] text-[20px] font-medium">Add Prescription</h1>
        <button
          onClick={() => setPres(false)}
          className="text-gray-500 hover:text-gray-700 text-[20px] font-bold"
        >
          ✕
        </button>
      </div>

      <form onSubmit={(e) => {  prescriptionSubmit(patientData?.UserName); }}>
        <div className="flex flex-col gap-4">
          
            <input
            type="text"
            name="Title"
            placeholder="Title"
            className="bg-[#D9D9D9] rounded-lg h-[40px] p-2"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            name="prescriptionDate"
            className="bg-[#D9D9D9] rounded-lg h-[40px] p-2"
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <input
            type="file"
            name="Prescription"
            className="bg-[#66D0C6] rounded-lg h-[40px] text-white p-1"
            onChange={(e) => setTestImage(e.target.files[0])}
            required
          />
          <input
            type="text"
            name="Duration"
            placeholder="Duration"
            className="bg-[#D9D9D9] rounded-lg h-[40px] p-2"
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-[#66D0C6] rounded-lg h-[45px] w-[120px] text-white font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    
              <div className="bg-white p-5 rounded-2xl mt-[50px] mx-[60px] w-[1100px] overflow-hidden ">
                <h1 className="text-[24px] font-bold mb-5">Prescriptions</h1>
                
                  <button
                  className="text-[#66D0C6] border border-[#66D0C6] w-full h-[75px] rounded-lg font-bold text-[24px] hover:bg-[#66D0C6] hover:text-white duration-500"
                  onClick={()=>{setPres(!pres)}}
                >
                  + Add a Prescription
                </button>
                  
                <div className="h-[200px] overflow-auto">
                  <table
                    className="w-full text-center border-separate border-spacing-y-4"
                  >
                    <thead>
                        <tr>
                      <th className="text-[#807A7A] font-bold text-[20px]">
                        Prescription
                      </th>
                      <th className="text-[#807A7A] font-bold text-[20px]">Date</th>
                      <th className="text-[#807A7A] font-bold text-[20px]">Duration</th>
                    </tr>
                    </thead>
                    {
                        patientData?.Prescription?.map((data)=>(
                              <tbody>
                        <tr>
                      <td>
                        <div className="flex text-center justify-center">
                          <img
                            src={`data:image/png;base64,${data.File}`}
                            alt="img"
                            className="h-[20px] w-[20px]"
                          />
                          <span>{data.Title}</span>
                        </div>
                      </td>
                      <td className="text-[#807A7A]">{new Date(data.Date).toISOString().split('T')[0]}</td>
                      <td className="text-[#807A7A]">{data.Duration}</td>
                    </tr>
                    </tbody>
                        
                        ))
                          
                    }
                  
                  </table>
                </div>
              </div>
            </div>
  )
}

export default HospitalPatientProfileData