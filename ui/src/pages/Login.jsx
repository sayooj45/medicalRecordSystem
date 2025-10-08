


import React, { useContext, useEffect, useState } from "react";
import loginImg from "../assets/images/login-image.jpg";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import LoginButton from "../components/LoginButton";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginProvider";

const Login = () => {
  const { authentiction, loginDetails, loading } = useContext(LoginContext);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authentiction(userName, password); 
      toast.success("Welcome back!");
        
        

      if (data.role === "hospital") {
        console.log(data);
        navigate('/hospitalForm');
      } else if (data.role === "admin") {
        navigate("/adminDashboard");
      } else if (data.role === "patient") {
        console.log(data);
        navigate(`/patientForm`);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials: Please try again!");
    }
  };


  useEffect(() => {
    if (loginDetails) {
      if (loginDetails.role === "hospital") {
        navigate('/hospitalForm');
      } else if (loginDetails.role === "admin") {
        navigate("/adminDashboard");
      } else if (loginDetails.role === "patient") {
        navigate(`/patientForm`);
      }
    }
  }, [loginDetails, navigate]);


  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

 
  if (loginDetails) {
    return null;
  }

  return (
    <div className="font-inter h-screen bg-gradient-to-r from-[#66D0C6] to-[#2679AD]">
      <img src={logo} alt="logo" className="size-40" />
      <div className="md:flex md:h-[70%] m-auto w-[70%] shadow-xl">
        <div className="max-md:h-[200px]">
          <img src={loginImg} alt="image" className="h-full w-full" />
        </div>
        <div className="bg-white md:w-[50%] p-5 flex flex-col justify-center">
          <div className="text-end p-5">
            <LoginButton name={"Sign Up"} />
          </div>
          <form className="px-4" onSubmit={handleSubmit}>
            <h1 className="text-center font-bold text-[32px] font-[inria-serif]">
              Access Your Health Dashboard
            </h1>
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <input
                type="text"
                className=" text-[24px] border-b border-[#807A7A] mt-[50px] w-full focus:outline-hidden"
                placeholder="Enter Your Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="password"
                className=" text-[24px] border-b border-[#807A7A] mt-[50px] w-full focus:outline-hidden"
                placeholder="Enter Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              <LoginButton name={"Login"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
