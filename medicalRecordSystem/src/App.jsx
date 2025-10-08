

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import PatientSignup from './pages/patientPages/PatientSignup'
import HospitalSignup from './pages/hospitalPages/HospitalSignup'
import Login from './pages/Login'
import AdminDashboard from './pages/adminPages/AdminDashboard'
import PatientProfile from './pages/patientPages/PatientProfile'
import Messages from './pages/adminPages/Messages'
import PatientForm from './pages/patientPages/PatientForm'
import HospitalDetails from './pages/hospitalPages/HospitalDetails'
import HospitalForm from './pages/hospitalPages/HospitalForm'
import HosspitalPatients from './pages/hospitalPages/HosspitalPatients'
import HospitalTable from './pages/patientPages/HospitalTable'
import SingleHospital from './pages/patientPages/SingleHospital'
import SinglePatient from './pages/hospitalPages/SinglePatient'
import Protected from './routes/Protected'
import ErrorPage from './pages/ErrorPage'

function App() {

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home to='/home' replace/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/patientSignup',
    element:<PatientSignup/>
  },
  {
    path:'/hospitalSignup',
    element:<HospitalSignup/>
  },
  {
    element: <Protected role='admin'/>,
    children:[
      {
    path:'/adminDashboard',
    element:<AdminDashboard/>
  },
   
    ]
  },
  {
    path:'*',
    element:<ErrorPage/>
  },

  {
    element:<Protected role = 'patient'/>,
    children:[
     
  {
    path:'/patientForm',
    element:<PatientForm/>
  },
  {
    path:'/singleHospital/:hospitalName',
    element:<SingleHospital/>
  },
   {
    path:'/hospitalTable',
    element:<HospitalTable/>
  },
    ]
  },
  {
    element:<Protected role = 'hospital'/>,
    children:[
     
  {
    path:'/hospitalForm',
    element:<HospitalForm/>
  },
  {
    path:'/hospitalPatients',
    element:<HosspitalPatients/>
  },
  {
    path:'/hospitalTable',
    element:<HospitalTable/>
  },
  {
    path:'singlePatient/:patientName',
    element:<SinglePatient/>
  }
    ]

  },
   
  {
    element:<Protected/>,
    children:[
      {
    path:'/message',
    element:<Messages/>
  },
  {
    path:'/patientProfile/:UserName',
    element:<PatientProfile/>
  },
  {
    path:'/hospitalDashboard/:UserName',
    element:<HospitalDetails/>
  },
   {
    path:'/patientProfile/:UserName',
    element:<PatientProfile/>
  },
   {
    path:'/hospitalDashboard/:UserName',
    element:<HospitalDetails/>
  },
    ]
  }
  
  
  
  
  
  
  
  
  

])

  return (
    <>

     <RouterProvider router={router}/>
    </>
  )
}

export default App
