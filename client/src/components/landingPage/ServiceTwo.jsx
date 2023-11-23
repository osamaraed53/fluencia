import React from "react";
import podcast from "../../assets/podcast2.png";

const ServiceTwo = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-800">
        <div className="container flex flex-col px-6 py-2 mx-auto space-y-6 lg:h-[20rem] lg:py-2 lg:flex-row lg:items-center   lg:px-16 pr-3  ">
          <div className="w-full lg:w-1/2 md:pl-8">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-bold tracking-wide text-fluencia-dark-purple dark:text-white lg:text-4xl pl-0">
              {" "}Our podcast
              </h1>
              <div className="mt-8 space-y-5 md:pl-8">
                <p className="flex items-center  text- dark:text-gray-200">
                  Explore a world of insights and expertise in our podcast
                  series. Our episodes cover diverse lifestyle topics, offering
                  unique perspectives from our team of professional coaches.
                  Engage with enriching conversations that inspire, inform, and
                  elevate your everyday experiences.
                </p>
                <button
                  class="bg-transparent text-fluencia-dark-purple  border border-fluencia-dark-purple  hover:text-white hover:border-transparent font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-fluencia-dark-purple outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Listen Now 
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img
              className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
              src={podcast}
              alt="glasses photo"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceTwo;
