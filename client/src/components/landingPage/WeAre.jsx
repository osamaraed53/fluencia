import React from "react";
import test from "../../assets/test.jpg";

const WeAre = () => {
  return (
    <>
      <div className="pt-16 mt-4">
        <h1 className="text-4xl font-bold tracking-wide text-fluencia-dark-purple dark:text-white md:text-10xl pl-0">
          Who We Are
        </h1>
        <div className=" mx-24 mt-12 mb-20 shadow-lg shadow-fluencia-purple/50 rounded-xl ">
          <div className="flex flex-row justify-between px-6 py-10   lg:h-[30rem] lg:py- lg:flex-row lg:items-center   lg:px-16 pr-3 dark:bg-gray-800">
            <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
              <img
                className="object-cover w-10/12 h-full mx-auto rounded-xl lg:max-w-2xl"
                src={test}
                alt="glasses photo"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <div className="md-8">
                <p className="md:text-xl text-xs px-4 text-fluencia-dark-purple dark:text-gray-200">
                  At Fluencia, we are a dedicated team of hardworking coaches
                  with a shared mission: to revolutionize English language
                  education using innovative and highly effective methods. We're
                  passionate about bringing a fresh and impactful approach to
                  learning, helping individuals achieve their language goals
                  with enthusiasm and confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="flex flex-row items-center justify-center p-4">
      <img
              className="object-cover w-1/4 h-1/4 mx-auto rounded-md lg:max-w-2xl"
              src={test}
              alt="glasses photo"
            />   
      <img
              className="object-cover w-1/4 h-1/4 mx-auto rounded-md lg:max-w-2xl"
              src={test}
              alt="glasses photo"
            />   
      <img
              className="object-cover w-1/4 h-1/4 mx-auto rounded-md lg:max-w-2xl"
              src={test}
              alt="glasses photo"
            />   
      </div> */}
    </>
  );
};

export default WeAre;
