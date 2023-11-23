// import { Carousel, IconButton } from "@material-tailwind/react";
import fluenciaProgramImg from "../../assets/fluencyProgram.png";

export default function CarouselCustomNavigation() {
  return (
    <>
      <section className="bg-white dark:bg-gray-800">
        <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center   lg:px-16 pr-3  ">
          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img
              className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl"
              src={fluenciaProgramImg}
              alt="glasses photo"
            />
          </div>

          <div className="w-full lg:w-1/2 pl-8">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-bold tracking-wide text-fluencia-dark-purple dark:text-white lg:text-4xl pl-0">
                Fluency Program
              </h1>
              <div className="mt-8 space-y-5 pl-8">
                <p className="flex items-center  text- dark:text-gray-200">
                  Longer - Fluencia's 10-session program is your path to English
                  fluency. Led by our expert coaches, we provide an effective
                  and convenient way to boost your language skills and achieve
                  your fluency goals.
                </p>
                <button
                  class="bg-fluencia-purple  text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-fluencia-dark-purple outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  register now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// chack mark

// <p className="flex items-center pl-6 text- dark:text-gray-200">
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   className="w-6 h-6 mx-2 text-fluencia-dark-purple"
//   fill="none"
//   viewBox="0 0 24 24"
//   stroke="currentColor"
// >
//   <path
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     strokeWidth={2}
//     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//   />
// </svg>
// <span className="mx-2">Easy to Use</span>
// </p>
