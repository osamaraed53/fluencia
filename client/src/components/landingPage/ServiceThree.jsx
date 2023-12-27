import React from "react";
import ebook from "../../assets/ebook2.png";

const ServiceThree = () => {
  return (
    <>
      <section id="EBook" className="bg-white dark:bg-gray-800">
        <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[20rem] lg:py-16 lg:flex-row lg:items-center   lg:px-16 pr-3  ">
          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img
              className="object-cover w-1/2 h-3/4 mx-auto rounded-md lg:max-w-2xl"
              src={ebook}
              alt="glasses photo"
            />
          </div>

          <div className="w-full lg:w-1/2 md:pl-8">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-bold tracking-wide text-fluencia-dark-purple dark:text-white lg:text-4xl pl-0">
                E-book
              </h1>
              <div className="mt-8 space-y-5 md-8">
                <p className="flex items-center  text- dark:text-gray-200">
                  Our eBook is a practical step-by-step guide to elevate your
                  English proficiency. It's organized into four stages: Reading,
                  Listening, Speaking, and Writing. Each stage offers
                  progressively challenging exercises, ensuring you build your
                  language skills gradually for an effective and enjoyable
                  learning experience.
                </p>
                <button
                  class="bg-fluencia-purple  text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-fluencia-dark-purple outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceThree;
