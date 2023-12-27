/////////////<< Testimonials WITH SWIPER >>///////////////////

import React from 'react';
import { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
// import SwiperCore, { Autoplay } from 'swiper/core';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { useDispatch, useSelector } from "react-redux";
import {fetchActiveCourses} from '../../ReduxSlice/courseSlice'
import image1 from '../../assets/case/case1.jpg'
import image2 from '../../assets/case/case2.jpg'
import image3 from '../../assets/case/case3.jpg'
import image4 from '../../assets/case/case4.jpg'
import image5 from '../../assets/case/case5.jpg'
import image6 from '../../assets/case/case6.jpg'

// Import Swiper modules
// SwiperCore.use([Autoplay]);

const  CaseStory = () => {





  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchActiveCourses());
  },[])


  const swiperParams = {
    autoplay: {
      delay: 1000, // Set the autoplay delay in milliseconds
    },
    breakpoints: {
      550: {
        slidesPerView: 2,
      },
      825: {
        slidesPerView: 3,
      },
      1120: {
        slidesPerView: 4,
      },
      1600: {
        slidesPerView: 10,
      },
    },
    slidesOffsetBefore: 10,
    slidesOffsetAfter: 10,
    spaceBetween: 0,
    freeMode: true,
    navigation: false,
    loop: true,
    effect: "fade",
  };



  const data = [
    {
      title : "case1" ,
      image :image1 
    },
    {
      title : "case2" ,
      image :image2
    },
    {
      title : "case3" ,
      image :image3 
    },
    {
      title : "case4" ,
      image :image4
    },
    {
      title : "case5" ,
      image :image5  
    },
    {
      title : "case6" ,
      image :image6 
    },
  ]
  
  return (
    <>
    <div className='text-[2rem] mt-12 mb-20'>
          
        <h1 className="text-5xl">
              <span className="text-fluencia-purple tracking-wide">Case</span>
              <span  className="text-fluencia-light-purple">Story</span>
            </h1> 
    </div>
        <div className='max-w-screen-2xl mx-24 overflow-hidden relative pb-24'>

      <Swiper {...swiperParams}>
        {data.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className='flex flex-row justify-items-center '>
            <div className='flex flex-row gap-6 my-10 bg-white shadow-lg shadow-fluencia-purple/50  w-60 h-48 p-4 rounded-lg hover:scale-105'>
                {/* <img src="" alt="userpic" className='bg-[#000] row-span-2 w-10 h-10 rounded-full'/> */}
                <div className='flex flex-col'>
                    <span className='text-[#000] font-light text-[0.9rem]'>{item.title}</span>
                    <span className='text-[#00000095] font-light text-[0.75rem]  w-48 h-30 ' >
                    <img  src={item.image} className='w-48 h-30 '/>
                      </span> 
                    
                </div>     
            </div>
         </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
    </>

  );
};

export default CaseStory;