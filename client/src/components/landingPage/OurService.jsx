import React from "react";
import fluency_icon from "../../assets/learn-50.png";
import ebook_icon from "../../assets/ebook.png";
import podcast_icon from "../../assets/podcast.png";

const OurService = () => {
  return (
    <div className="relative flex-col h-80">
      <div className="flex-1 h-32 bg-fluencia-purple"></div>
      <div className="flex-1 h-46 bg-white"></div>
      <div className="absolute top-0 h-80 w-full bg-transparent">
        <div
          id="mainBox"
          className="flex flex-col md:flex-row md:flex-wrap sm:flex-wrap md:mt-0 sm:mt-4 justify-center items-center h-88 w-full gap-x-4 md:gap-x-24 md:gap-y-12"
        >
          <div
            id="serviceOne"
            className="flex-shrink-0 h-48 md:h-60 md:w-60 sm:w-96  w-10/12 flex flex-col  items-start bg-white border-2 border-solid border-fluencia-dark-purple-50/50 shadow-xl rounded-xl p-4 mb-4 md:mb-0 hover:scale-125 duration-150"
          >
            {/* Content for Service one */}
            <img src={podcast_icon} className="h-10 w-10 mb-2" alt=""></img>
            <h2 className="text-lg font-bold text-fluencia-purple mb-2">
              Podcast
            </h2>
            <p className="text-start text-fluencia-blue">
              Explore a world of insights and expertise in our podcast series..{" "}
            </p>
          </div>
          
          <div
            id="serviceTwo"
            className="flex-shrink-0 h-48  md:h-60 md:w-60 sm:w-96 w-10/12 flex flex-col  items-start bg-white border-2 border-solid border-fluencia-dark-purple50/50 shadow-2xl rounded-xl p-4 mb-4 md:mb-0 hover:scale-125 duration-150"
          >
            {/* Content for Service Two */}
            <img src={fluency_icon} className="h-10 w-10 mb-2" alt=""></img>
            <h2 className="text-lg font-bold text-fluencia-purple mb-2">
              Fluency program
            </h2>
            <p className="text-start text-fluencia-blue">
               10-session program is your path to English fluency. Led by our
              expert coaches, we provide an effective and convenient way to
              boost{" "}
            </p>
          </div>
          <div
            id="serviceThree"
            className="flex-shrink-0 h-48 w-10/12 md:h-60 md:w-60  sm:w-96 flex flex-col  items-start bg-white border-2 border-solid border-fluencia-dark-purple50/50 shadow-md rounded-xl p-4 mb-4 md:mb-0 hover:scale-125 duration-150"
          >
            {/* Content for Service Two */}
            <img src={ebook_icon} className="h-10 w-10 mb-2" alt=""></img>
            <h2 className="text-lg font-bold text-fluencia-purple mb-2">
              E-book
            </h2>
            <p className="text-start text-fluencia-blue">
               is your practical guide to enhance your English skills step by
              step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurService;
