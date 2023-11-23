import React, { useEffect } from 'react'
import image from '../assets/flo.jpg'
import { Link } from 'react-router-dom'

export default function NotFound() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">

              404 - Not Found
              </h1>
              <p className="my-2 text-gray-800">
              Sorry, the page you are looking for does not exist.
              </p>
              <Link to={'/'}>
                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-opacity-50">
                  Home page
                </button>
              </Link>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div className='w-80'>
        <img src={image} />
      </div>
    </div>

  )
}
