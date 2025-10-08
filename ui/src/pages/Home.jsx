import React from 'react'
import Landing from './Landing'
import About from './About'
import Doctors from './Doctors'
import Features from './Features'
import Footer from './Footer'

const Home = () => {
  return (
  <div className="font-inter">
    <Landing/>
    <div id='about'><About/></div>
    <div id='doctor'><Doctors/></div>
    <div id='Feature'><Features/></div>
    <Footer/>
  </div>
  )
}

export default Home