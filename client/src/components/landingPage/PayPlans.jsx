import React from "react";
import { Link } from "react-router-dom";

const PayPlans = () => {
  return (
    <>
      <div id="pay" className="text-center font-semibold scroll-smooth">
        <h1 className="text-5xl">
          <span className="text-fluencia-purple tracking-wide">fluencia</span>
          <span className="text-fluencia-light-purple">Plans</span>
        </h1>
        <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
          Choose a plan that works best for you and
          <br />
        </p>
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen lg:py-16 lg:px-6">
          {/* <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Designed for business teams like yours
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Here at Flowbite we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth.
            </p>
          </div> */}
          <div className="space-y-8  lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 mb-24">
            {/* Pricing Card */}
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100  dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white  duration-300 shadow-xl shadow-fluencia-purple/50">
              <h3 className="mb-4 text-2xl font-semibold ">Month</h3>
              {/* <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Best option for personal use &amp; for your next project.
              </p> */}
              <div className="flex justify-center items-baseline my-8 ">
                <span className="mr-2 text-5xl font-extrabold ">$170</span>
                {/* <span className="text-gray-500 dark:text-gray-400">/month</span> */}
              </div>
              {/* List */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>E-book For Free</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>No setup, or hidden fees</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Team size:{" "}
                    <span className="font-semibold">20 student</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Premium support:{" "}
                    <span className="font-semibold">6 months</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Free updates:{" "}
                    <span className="font-semibold">6 months</span>
                  </span>
                </li>
              </ul>
              <Link
                  class="bg-fluencia-yellow-first hover:bg-fluencia-yellow-second  text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-fluencia-dark-purple outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  to="/Subscription/1"
                >
                  Get Started
                </Link>
            </div>
            {/* Pricing Card */}
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100  dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white  duration-300 shadow-xl shadow-fluencia-purple/50">
              <h3 className="mb-4 text-2xl font-semibold">Two Months</h3>
              {/* <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Relevant for multiple users, extended &amp; premium support.
              </p> */}
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$280</span>
                {/* <span className="text-gray-500 dark:text-gray-400">/month</span> */}
              </div>
              {/* List */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>E-book For Free</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>No setup, or hidden fees</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Team size:{" "}
                    <span className="font-semibold">10 student</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Premium support:{" "}
                    <span className="font-semibold">24 months</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Free updates:{" "}
                    <span className="font-semibold">24 months</span>
                  </span>
                </li>
              </ul>
              <Link
                  class="bg-fluencia-yellow-first hover:bg-fluencia-yellow-second  text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-fluencia-dark-purple outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  to="/Subscription/2"
                >
                  Get Started
                </Link>
            </div>
            {/* Pricing Card */}
            <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100  dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white  duration-300 shadow-xl shadow-fluencia-purple/50">
              <h3 className="mb-4 text-2xl font-semibold">Three Month</h3>
              {/* <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                Best for large scale uses and extended redistribution rights.
              </p> */}
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$435</span>
                {/* <span className="text-gray-500 dark:text-gray-400">/month</span> */}
              </div>
              {/* List */}
              <ul role="list" className="mb-8 space-y-4 text-left">
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>E-book For Free</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>No setup, or hidden fees</span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Team size:{" "}
                    <span className="font-semibold">2 student</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Premium support:{" "}
                    <span className="font-semibold">36 months</span>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  {/* Icon */}
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    Free updates:{" "}
                    <span className="font-semibold">36 months</span>
                  </span>
                </li>
              </ul>
              <Link
                    to="/Subscription/3"
                  class="bg-fluencia-yellow-first hover:bg-fluencia-yellow-second  text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-fluencia-dark-purple outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Get Started
                </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PayPlans;
