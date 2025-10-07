import React from 'react'

const FeaturesCard = () => {
  return (
          <div
        className="grid md:grid-cols-3 grid-cols-1 gap-15 place-items-center mt-[100px] max-md:p-4"
      >
        <div
          className="bg-[#2679AD] text-center md:w-[400px] md:h-[250px] w-full p-5 rounded-2xl flex flex-col justify-center shadow-xl"
        >
          <i className="fa-solid fa-file-lines text-[40px] p-2"></i>
          <h1 className="text-[24px] font-bold">Paperless Record Keeping</h1>
          <p className="text-[20px] font-medium text-white">
            Store your health data digitally with zero paperwork.
          </p>
        </div>

        <div
          className="bg-[#2679AD] text-center md:w-[400px] md:h-[250px] w-full p-5 rounded-2xl flex flex-col justify-center shadow-xl"
        >
          <i className="fa-solid fa-lock text-[40px] p-2"></i>
          <h1 className="text-[24px] font-bold">Data Privacy & Security</h1>
          <p className="text-[20px] font-medium text-white">
            Your records are protected under healthcare regulations.
          </p>
        </div>

        <div
          className="bg-[#2679AD] text-center md:w-[400px] md:h-[250px] w-full p-5 rounded-2xl flex flex-col justify-center shadow-xl"
        >
          <i className="fa-solid fa-user-doctor text-[40px] p-2"></i>
          <h1 className="text-[24px] font-bold">Doctor-Patient Connectivity</h1>
          <p className="text-[20px] font-medium text-white">
            Doctors and patients can access and update records in real time.
          </p>
        </div>

        <div
          className="bg-[#2679AD] text-center md:w-[400px] md:h-[250px] w-full p-5 rounded-2xl flex flex-col justify-center shadow-xl"
        >
          <i className="fa-solid fa-clock-rotate-left text-[40px] p-2"></i>
          <h1 className="text-[24px] font-bold">
            All Medical History in One Place
          </h1>
          <p className="text-[20px] font-medium text-white">
            Prescriptions, lab results, and reports organized for easy access.
          </p>
        </div>

        <div
          className="bg-[#2679AD] text-center md:w-[400px] md:h-[250px] w-full p-5 rounded-2xl flex flex-col justify-center shadow-xl"
        >
          <i className="fa-solid fa-suitcase-medical text-[40px] p-2"></i>
          <h1 className="text-[24px] font-bold">Health Analytics</h1>
          <p className="text-[20px] font-medium text-white">
            Track your health trends and insights over time.
          </p>
        </div>

        <div
          className="bg-[#2679AD] text-center md:w-[400px] md:h-[250px] w-full p-5 rounded-2xl flex flex-col justify-center shadow-xl"
        >
          <i className="fa-solid fa-laptop-medical text-[40px] p-2"></i>
          <h1 className="text-[24px] font-bold">Access from Anywhere, Anytime</h1>
          <p className="text-[20px] font-medium text-white">
            Securely view your health records on any device, wherever you are.
          </p>
        </div>
      </div>
  )
}

export default FeaturesCard