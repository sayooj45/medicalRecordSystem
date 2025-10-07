import React from 'react'

import {Link} from 'react-scroll'
const Navbar = () => {
  return (
    <>
        <ul className="text-white md:flex pl-5">
            <li
                className="mr-10 hover:underline decoration-2 underline-offset-4 hover:translate-y-[-5px] hover:transform duration-300 hover:text-[#2679AD]"
            >
                <Link to='about' smooth={true} className="font-bold cursor-pointer">About Us</Link>
            </li>
            <li
                className="mr-10 hover:underline decoration-2 underline-offset-4 hover:translate-y-[-5px] hover:transform duration-300 hover:text-[#2679AD]"
            >
                <Link to='features' smooth={true} className="font-bold cursor-pointer">Features</Link>
            </li>
            <li
                className="mr-10 hover:underline decoration-2 underline-offset-4 hover:translate-y-[-5px] hover:transform duration-300 hover:text-[#2679AD]"
            >
                <Link to='contact' smooth={true}  className="font-bold cursor-pointer">Contact</Link>
            </li>
        </ul>
    </>
  )
}

export default Navbar