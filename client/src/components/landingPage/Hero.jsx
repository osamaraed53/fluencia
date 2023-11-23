import React from "react";
import hero_img from '../../assets/Artboard1.png'
import {Link }from "react-router-dom"; 
const Hero = () => {
  return (
    <div className=" bg-gradient-to-b from-fluencia-dark-purple to-fluencia-purple">
      <section className="pt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8 ">
        <div className=" flex justify-center items-center flex-col space-y-4  sm:text-center lg:text-left md:ml-30 text-center">
          <h1 className="text-white font-bold text-4xl xl:text-8xl text-center">
            The way to<br></br>
            <span className="text-fluencia-yellow-first text-6xl md:text-9xl"> fluency</span>
          </h1>
          <p className="text-fluencia-blue max-w-xl leading-relaxed sm:mx-auto  text-center">Determine your level now for free
          </p>
          <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <div>
              <Link to="/home/2">
              <button class="py-2 px-4 bg-transparent text-fluencia-yellow-first font-semibold border border-fluencia-yellow-first rounded hover:bg-fluencia-yellow-first hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
              Get started
              </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-6 ">
          <img
          alt=""
            src=""
            className="w-full mx-auto sm:w-10/12 lg:w-full "
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
