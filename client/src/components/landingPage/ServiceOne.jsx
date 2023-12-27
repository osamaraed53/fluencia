import React from "react";
import fluenciaProgramImg from "../../assets/fluencyProgram.png";

const ServiceOne = () => {
  
  
  
  return (
    <>
      <section id="FluencyProgram" className="bg-white dark:bg-gray-800 scroll-smooth ">
        <div className="mt-48  sm:mt-48  md:mt-20 lg:mt-0 container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[20rem] lg:py-16 lg:flex-row lg:items-center  lg:px-16 pr-3  ">
          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img
              className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
              src={fluenciaProgramImg}
              alt="glasses photo"
            />
          </div>

          <div className="w-full lg:w-1/2 md:pl-8">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-bold tracking-wide text-fluencia-dark-purple dark:text-white lg:text-4xl pl-0">
                Fluency Program
              </h1>
              <div className="mt-8 space-y-5 md-8">
                <p className="flex items-center  text- dark:text-gray-200">
                  Longer - Fluencia's 10-session program is your path to English
                  fluency. Led by our expert coaches, we provide an effective
                  and convenient way to boost your language skills and achieve
                  your fluency goals.
                </p>
                <a
                href="#pay"  
                  
                  class="bg-fluencia-purple  scroll-smooth text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-fluencia-dark-purple outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  register now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceOne;
