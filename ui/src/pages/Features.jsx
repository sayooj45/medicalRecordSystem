import React from 'react'
import FeaturesCard from '../components/FeaturesCard'

const Features = () => {
  return (
        <div className="md:h-screen mt-[100px]" id="features">
      <h1 className="text-[40px] font-bold text-center">
        Why Choose Our Medical Records System?
      </h1>
        <FeaturesCard/>
    </div>
  )
}

export default Features