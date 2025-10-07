import React from 'react'
import footer from '../assets/images/footer.jpg'
import logo from '../assets/images/logo.png'
const Footer = () => {
  return (
    <div className="h-auto relative" id="contact">
      <div
        className=" bg-cover bg-center h-auto w-full absolute top-0 p-2"
        style={{backgroundImage:`url(${footer})`}}
      >
        <div
          className="md:w-[70%] w-auto bg-[#04B3A3] md:h-[20%] m-auto mt-[100px] p-2"
        >
          <div className="md:flex justify-evenly items-center m-auto text-center">
            <img
              src={logo}
              alt="img"
              className="h-[150px] w-[150px] mx-auto md:mx-0"
            />
            <div
              className="flex text-white items-center text-[20px] font-semibold justify-center space-x-2"
            >
              <i className="fa-solid fa-envelope-open-text"></i>
              <h1>Email : support@medirecords.com</h1>
            </div>
            <div className="text-white text-[36px] max-md:hidden">|</div>
            <div
              className="flex text-white items-center justify-center space-x-2 max-md:mt-[50px]"
            >
              <i className="fa-solid fa-phone text-[36px]"></i>
              <div className="text-[20px] font-semibold">
                <h1>Office Telephone : 0000000000</h1>
                <h1>Mobile :9876543210</h1>
              </div>
            </div>
          </div>
        </div>
        <div
          className="md:flex justify-around text-white font-medium text-[24px] mt-[200px]"
        >
          <div>
            <h1>Our support team is here to assist you.</h1>
            <h1>Or visit our Help Page for FAQs and guides.</h1>
          </div>
          <div className="max-md:mt-5 text-[20px]">
            <h1>About Us</h1>
            <h1>Privacy Policy</h1>
            <h1>Terms and Conditions</h1>
          </div>
        </div>
        <div className="text-white w-[70%] m-auto mt-[50px]">
          <hr />
        </div>
        <h1 className="text-center text-white mt-5">
          © 2025 Medical Records System. All rights reserved.
        </h1>
      </div>
    </div>
  )
}

export default Footer