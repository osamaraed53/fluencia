import React from "react";
import test from "../../assets/Jerusalem.jpg";

const WeAre = () => {
  return (
    <>
      <div className="pt-16">
        <h1 className="text-4xl font-bold tracking-wide text-fluencia-dark-purple dark:text-white md:text-10xl pl-0">
          Who We Are
        </h1>
        <div className="flex flex-row justify-between px-6 py-10   lg:h-[30rem] lg:py- lg:flex-row lg:items-center   lg:px-16 pr-3  bg-white dark:bg-gray-800">
          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img
              className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
              src={test}
              alt="glasses photo"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="md-8">
              <p className="md:text-xl text-xs px-4 text-fluencia-dark-purple dark:text-gray-200">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo con Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatu Excepteur sint
                occaecat cupidatat non t amet, consectetur, adipisci velit, sed
                 amet, consectetur, adipisci velit, sed
              </p>
            </div>
          </div>
        </div>
      </div>

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
      </div>
    </>
  );
};

export default WeAre;