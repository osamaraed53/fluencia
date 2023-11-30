import React, { useEffect } from 'react'
import Hero from '../landingPage/Hero'
import Stats from '../landingPage/Stats'
import OurService from '../landingPage/OurService'
import ServiceOne from '../landingPage/ServiceOne'
import ServiceTwo from '../landingPage/ServiceTwo'
import ServiceThree from '../landingPage/ServiceThree'
import WeAre from '../landingPage/WeAre'
import PayPlans from '../PayPlans'

const Landing = () => {



  return (
    <>
    <Hero/>
    <OurService/>
    <Stats/>
    <ServiceOne/>
    <ServiceTwo/>
    <ServiceThree/>
    <WeAre/>
    <PayPlans/>
    </>
  )
}

export default Landing;