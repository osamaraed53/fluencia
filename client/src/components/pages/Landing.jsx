import React, { useEffect } from 'react'
import Hero from '../landingPage/Hero'
import Stats from '../landingPage/Stats'
import OurService from '../landingPage/OurService'
import ServiceOne from '../landingPage/ServiceOne'
import ServiceTwo from '../landingPage/ServiceTwo'
import ServiceThree from '../landingPage/ServiceThree'
import WeAre from '../landingPage/WeAre'
import PayPlans from '../landingPage/PayPlans'
import CaseStory from '../landingPage/ReviewSection'

const Landing = () => {



  return (
    <>
    <Hero/>
    <OurService/>
    <ServiceOne/>
    <ServiceTwo/>
    <ServiceThree/>
    <WeAre/>
    <Stats/>

    <CaseStory/>

    <PayPlans/>

    </>
  )
}

export default Landing;