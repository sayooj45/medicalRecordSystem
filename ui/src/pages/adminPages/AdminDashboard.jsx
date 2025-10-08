import React, { useState } from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import SideBar from '../../components/SideBar'
import AdminCard from '../../components/AdminCard'
import Table from '../../components/Table'
import logo from '../../assets/images/logo.png'
import { DataProvider } from '../../context/DataProvider'

const AdminDashboard = () => {
  const [showSidebar,setShowSidebar] = useState(true)
  return (
    <div className="bg-[#F9F9F9]">
     <HomeNavbar role={'admin'} userName={'Admin'}/>
      <div className="h-[100px] flex items-center  mt-[-90px] p-2" >
        <img
          src={logo}
          alt="logo"
          className="h-[120px] w-[120px]"
        />
        <button onClick={()=>setShowSidebar(!showSidebar)} className='cursor-pointer '>
          <i className="fa-solid fa-bars  " ></i> 
        </button>
      </div>

      <div className="flex">
        <SideBar showSidebar={showSidebar} setShowSidebar = {setShowSidebar} page={'Home'} role='admin'/>
        <div className="w-[80%] m-auto">
          <DataProvider>
          <AdminCard/>
          
          
          <div id='hospital'><Table tableCondition={'Hospital'}/></div>
          <Table id='patient' tableCondition={"Patient"} />
          </DataProvider>
        </div>
      </div>
    </div>

  )
}

export default AdminDashboard