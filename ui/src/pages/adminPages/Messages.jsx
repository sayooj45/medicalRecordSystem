import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import { LoginContext } from "../../context/LoginProvider";
import HomeNavbar from "../../components/HomeNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Messages = () => {
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [role, setRole] = useState('');
  const [messages, setMessages] = useState([]);
  const [hospitalMessage,setHospitalMessage] = useState([])
  const {loginDetails} = useContext(LoginContext)
  const [patientMessage,setPatientMessage] = useState([])
// admin message 
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
      console.log(data);
      setMessages(data)
      
    }
    fetchMessage()
  },[])



//admin message
  const messageSubmit = async(e)=>{
    e.preventDefault()
      const formData = new FormData();
  formData.append('userName', userName);
  formData.append('comment', comment);
  // formData.append('role', role);
  if (image) {
    formData.append('messageImage', image); 
  }

    const res = await fetch('/api/admin/message',{
      method:'POST',
      credentials:'include',
      body:formData
    })
      if (!res.ok) {
    console.log(res);
    toast.error('Failed to send message!', {
  position: "top-center",
});
    throw new Error('sending failed');
  }

  const data = await res.json();
  console.log(data);
  toast.success('Message sent successfully!', {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
});
  setUserName('')
  setComment('')
  setImage('')
  setRole('')

  }

  //hospital message
  useEffect(()=>{
    const fetchMessage = async ()=>{
      const res = await fetch('/api/hospital/message',{
        method:'GET',
      })
      if (!res.ok){
        console.log(res);
        
        throw new Error('cant find messages')
      }
      const data = await res.json()
      console.log(data);
      setHospitalMessage(data)
      
    }
    
    fetchMessage()
  },[])

  //patient
  useEffect(()=>{
    const fetchMessage = async ()=>{
      const res = await fetch('/api/user/message',{
        method:'GET',
      })
      if (!res.ok){
        console.log(res);
        
        throw new Error('cant find messages')
      }
      const data = await res.json()
      console.log(data);
      setPatientMessage(data)
      
    }
    
    fetchMessage()
  },[])


  const hospitalSendMessage = async(e)=>{
    e.preventDefault()
    const formData = new FormData();
  formData.append('comment', comment);
  if (image) {
    formData.append('file', image); 
  }
  
    const res = await fetch('/api/hospital/message',{
      method:'POST',
      credentials:'include',
      body:formData
    })
    if (!res.ok) {
    console.log(res);
    toast.error('Failed to send message!', {
  position: "top-center",
});
    throw new Error('sending failed');
    
  }

  const data = await res.json();
  console.log(data);
  toast.success('Message sent successfully!', {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
});
  setComment('')
  setImage('')
  }

  const patientSendMessage = async(e)=>{
    e.preventDefault()
    const formData = new FormData();
  formData.append('comment', comment);
  if (image) {
    formData.append('file', image); 
  }
  
    const res = await fetch('/api/user/message',{
      method:'POST',
      credentials:'include',
      body:formData
    })
    if (!res.ok) {
    console.log(res);
    toast.error('Failed to send message!', {
  position: "top-center",
});
    throw new Error('sending failed');
    
  }

  const data = await res.json();
  console.log(data);
  toast.success('Message sent successfully!', {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
});
  setComment('')
  setImage('')
  }

  return (
    <div className="bg-[#66D0C6] min-h-screen flex flex-col">
      <HomeNavbar/>
      <SideBar/>
      <div className="text-center py-6">
        <h1 className="text-white font-bold text-4xl">Get in Touch</h1>
        <p className="text-white text-lg mt-2">
          Use this page to send and receive messages for easy communication and support.
        </p>
      </div>

      <div className="flex flex-col md:flex-row w-[90%] max-w-5xl m-auto gap-6">

        {
          loginDetails?.role === 'admin'?(
            <div className="bg-white shadow-lg flex-1 rounded-2xl p-8">
          <form className="flex flex-col space-y-6" onSubmit={messageSubmit}>
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">To</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border-b border-gray-300 focus:outline-none focus:border-[#66D0C6] h-10 px-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Comment</label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border-b border-gray-300 focus:outline-none focus:border-[#66D0C6] h-10 px-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Add File</label>
              <input
                type="file"
                
                onChange={(e) => setImage(e.target.files[0])}
                className="text-gray-600"
              />
            </div>

            {/* <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#66D0C6]"
              >
                <option value="hospital">Hospital</option>
                <option value="patient">Patient</option>
              </select>
            </div> */}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#66D0C6] text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-[#56bdb3] transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
          ): loginDetails.role === 'hospital'?(
            <div className="bg-white shadow-lg flex-1 rounded-2xl p-8">
          <form className="flex flex-col space-y-6" onSubmit={hospitalSendMessage}>
            {/* <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border-b border-gray-300 focus:outline-none focus:border-[#66D0C6] h-10 px-2"
                required
              />
            </div> */}

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Comment</label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border-b border-gray-300 focus:outline-none focus:border-[#66D0C6] h-10 px-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Add File</label>
              <input
                type="file"
                
                onChange={(e) => setImage(e.target.files[0])}
                className="text-gray-600"
              />
            </div>

            {/* <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#66D0C6]"
              >
                <option value="hospital">Hospital</option>
                <option value="patient">Patient</option>
              </select>
            </div> */}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#66D0C6] text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-[#56bdb3] transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
          ):loginDetails.role === 'patient'?(
            <div className="bg-white shadow-lg flex-1 rounded-2xl p-8">
          <form className="flex flex-col space-y-6" onSubmit={patientSendMessage}>
            {/* <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Username</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="border-b border-gray-300 focus:outline-none focus:border-[#66D0C6] h-10 px-2"
                required
              />
            </div> */}

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Comment</label>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border-b border-gray-300 focus:outline-none focus:border-[#66D0C6] h-10 px-2"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Add File</label>
              <input
                type="file"
                
                onChange={(e) => setImage(e.target.files[0])}
                className="text-gray-600"
              />
            </div>

            {/* <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-[#66D0C6]"
              >
                <option value="hospital">Hospital</option>
                <option value="patient">Patient</option>
              </select>
            </div> */}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#66D0C6] text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-[#56bdb3] transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
          ):''
        }


        <div className="bg-white shadow-lg flex-1 rounded-2xl p-6 overflow-y-auto max-h-[600px]">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Messages</h2>
          {
  loginDetails ? (
    loginDetails.role === 'admin' ? (
      messages.length === 0 ? (
        <p className="text-gray-500 text-center">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-xl p-4 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-700">{msg.UserName}</span>
              </div>
              <p className="text-gray-600 mt-2">{msg.Comment}</p>
              {msg.File && (
                <img
                  src={msg.File ? `data:image/png;base64,${msg.File}` : ""}
                  alt="attachment"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )
    ) : loginDetails.role === 'hospital' ? (
      hospitalMessage?.length === 0 ? (
        <p className="text-gray-500 text-center">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {hospitalMessage.map((msg, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-xl p-4 flex flex-col"
            >
              <p className="text-gray-600 mt-2">{msg.Comment}</p>
              {msg.File && (
                <img
                  src={msg.File ? `data:image/png;base64,${msg.File}` : ""}
                  alt="attachment"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )
    ) : loginDetails.role === 'patient' ? (
      patientMessage?.length === 0 ? (
        <p className="text-gray-500 text-center">No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {patientMessage.map((msg, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-xl p-4 flex flex-col"
            >
              <p className="text-gray-600 mt-2">{msg.Comment}</p>
              {msg.File && (
                <img
                  src={msg.File ? `data:image/png;base64,${msg.File}` : ""}
                  alt="attachment"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )
    ) : null
  ) : null
}

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Messages;
