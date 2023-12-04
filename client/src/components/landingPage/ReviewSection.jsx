/////////////<< Testimonials WITH SWIPER >>///////////////////

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
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

// Import Swiper modules
// SwiperCore.use([Autoplay]);

const  CaseStory = () => {


  const dataFromFirstAPI = useSelector((state)=>state.course.courses)
  // console.log("data", dataFromFirstAPI)
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
        {dataFromFirstAPI.map((item, user_id) => (
          <SwiperSlide key={item.course_id}>
            <div className='flex flex-row justify-items-center '>
            <div className='flex flex-row gap-6 my-10 bg-white shadow-lg shadow-fluencia-purple/50  p-4 rounded-lg hover:scale-105'>
                <img src="" alt="userpic" className='bg-[#000] row-span-2 w-10 h-10 rounded-full'/>
                <div className='flex flex-col'>
                    <span className='text-[#000] font-light text-[0.9rem]'>{item.course_name}</span>
                    <span className='text-[#00000095] font-light text-[0.75rem]  max-h-4 h-8 hover:h-12 max-w-8 w-48 overflow-hidden hover:overflow-visible ' >{item.course_description}</span> 
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