import React, { useEffect } from 'react'
import Hero from './Hero'
import Stats from './Stats'
import OurService from './OurService'
import ServiceOne from './ServiceOne'
import ServiceTwo from './ServiceTwo'
import ServiceThree from './ServiceThree'
import WeAre from './WeAre'
import PayPlans from './PayPlans'
import CaseStory from './ReviewSection'

const Landing = () => {



  return (
    <div className='scroll-smooth flex flex-col'>
    <Hero/>
    <OurService/>
    <ServiceOne/>
    <ServiceTwo/>
    <ServiceThree/>
    <WeAre/>
    <Stats/>

    <CaseStory/>

    <PayPlans/>

    </div>
  )
}

export default Landing;