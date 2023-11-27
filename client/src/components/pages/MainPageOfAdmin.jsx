import React, { useRef } from "react";
import img from '../../assets/fluencia.jpg'
import { Link} from "react-router-dom";
import { useState } from "react";
import { Add } from "@material-ui/icons";
import { createPortal } from 'react-dom';
import AddNewCourse from '../CreateClass'
 
const MainPageOfAdmin = () => {
  const [isOpenAddNewClass,setOpenAddNewClass] =useState(false)

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust as needed
  const [orders, setOrders] = useState( [
    {
        title: "Figma",
        desc: "Ut enim ad minim veniam",
        icon: <svg className="w-10 h-10" viewBox="0 0 43 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_690_1894)">
                <path d="M14.1693 48C18.08 48 21.254 44.4159 21.254 39.9999V31.9999H14.1693C10.2586 31.9999 7.08459 35.5839 7.08459 39.9999C7.08459 44.4159 10.2586 48 14.1693 48Z" fill="#0ACF83" />
                <path d="M7.08459 23.9999C7.08459 19.5839 10.2586 15.9999 14.1693 15.9999H21.254V31.9998H14.1693C10.2586 32 7.08459 28.4159 7.08459 23.9999Z" fill="#A259FF" />
                <path d="M7.08459 8.00006C7.08459 3.58406 10.2586 0 14.1693 0H21.254V15.9999H14.1693C10.2586 15.9999 7.08459 12.4161 7.08459 8.00006Z" fill="#F24E1E" />
                <path d="M21.2535 0H28.3382C32.2489 0 35.4229 3.58406 35.4229 8.00006C35.4229 12.4161 32.2489 15.9999 28.3382 15.9999H21.2535V0Z" fill="#FF7262" />
                <path d="M35.4229 23.9999C35.4229 28.4159 32.2489 32 28.3382 32C24.4275 32 21.2535 28.4159 21.2535 23.9999C21.2535 19.5839 24.4275 15.9999 28.3382 15.9999C32.2489 15.9999 35.4229 19.5839 35.4229 23.9999Z" fill="#1ABCFE" />
            </g>
            <defs>
                <clipPath id="clip0_690_1894">
                    <rect width="42.5075" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>

    }, {
        title: "Github",
        desc: "Ut enim ad minim veniam",
        icon: {img}

    }, {
        title: "Discord",
        desc: "Ut enim ad minim veniam",
        icon: <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_694_1840)">
                <path d="M40.634 8.31115C37.5747 6.90738 34.294 5.87315 30.8638 5.28081C30.8013 5.26937 30.7389 5.29794 30.7067 5.35508C30.2848 6.10551 29.8175 7.08451 29.4902 7.854C25.8008 7.30166 22.1304 7.30166 18.5166 7.854C18.1893 7.06741 17.705 6.10551 17.2811 5.35508C17.249 5.29985 17.1866 5.27128 17.1241 5.28081C13.6958 5.87126 10.4151 6.90549 7.35387 8.31115C7.32737 8.32257 7.30465 8.34164 7.28958 8.36638C1.06678 17.6631 -0.6379 26.7313 0.19836 35.6871C0.202144 35.7309 0.22674 35.7728 0.260796 35.7995C4.36642 38.8145 8.34341 40.645 12.2466 41.8582C12.309 41.8773 12.3752 41.8544 12.415 41.803C13.3383 40.5421 14.1613 39.2127 14.867 37.8146C14.9086 37.7327 14.8688 37.6356 14.7837 37.6032C13.4783 37.108 12.2352 36.5042 11.0395 35.8185C10.9449 35.7633 10.9373 35.628 11.0243 35.5632C11.2759 35.3747 11.5276 35.1785 11.7679 34.9804C11.8114 34.9443 11.872 34.9366 11.9231 34.9595C19.7786 38.546 28.2831 38.546 36.0459 34.9595C36.097 34.9347 36.1576 34.9424 36.203 34.9785C36.4433 35.1766 36.6949 35.3747 36.9484 35.5632C37.0354 35.628 37.0298 35.7633 36.9352 35.8185C35.7394 36.5175 34.4964 37.108 33.189 37.6013C33.1039 37.6337 33.0661 37.7327 33.1077 37.8146C33.8285 39.2107 34.6515 40.5402 35.5578 41.8011C35.5957 41.8544 35.6637 41.8773 35.7262 41.8582C39.6483 40.645 43.6252 38.8145 47.7309 35.7995C47.7668 35.7728 47.7895 35.7328 47.7933 35.689C48.7942 25.3351 46.117 16.3413 40.6964 8.36827C40.6832 8.34164 40.6605 8.32257 40.634 8.31115ZM16.04 30.234C13.675 30.234 11.7263 28.0627 11.7263 25.3961C11.7263 22.7295 13.6372 20.5582 16.04 20.5582C18.4617 20.5582 20.3916 22.7486 20.3538 25.3961C20.3538 28.0627 18.4428 30.234 16.04 30.234ZM31.9895 30.234C29.6245 30.234 27.6758 28.0627 27.6758 25.3961C27.6758 22.7295 29.5867 20.5582 31.9895 20.5582C34.4113 20.5582 36.3411 22.7486 36.3033 25.3961C36.3033 28.0627 34.4113 30.234 31.9895 30.234Z" fill="#5865F2" />
            </g>
            <defs>
                <clipPath id="clip0_694_1840">
                    <rect width="48" height="48" fill="white" />
                </clipPath>
            </defs>
        </svg>

    },  {
      title: "Figma",
      desc: "Ut enim ad minim veniam",
      icon: <svg className="w-10 h-10" viewBox="0 0 43 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_690_1894)">
              <path d="M14.1693 48C18.08 48 21.254 44.4159 21.254 39.9999V31.9999H14.1693C10.2586 31.9999 7.08459 35.5839 7.08459 39.9999C7.08459 44.4159 10.2586 48 14.1693 48Z" fill="#0ACF83" />
              <path d="M7.08459 23.9999C7.08459 19.5839 10.2586 15.9999 14.1693 15.9999H21.254V31.9998H14.1693C10.2586 32 7.08459 28.4159 7.08459 23.9999Z" fill="#A259FF" />
              <path d="M7.08459 8.00006C7.08459 3.58406 10.2586 0 14.1693 0H21.254V15.9999H14.1693C10.2586 15.9999 7.08459 12.4161 7.08459 8.00006Z" fill="#F24E1E" />
              <path d="M21.2535 0H28.3382C32.2489 0 35.4229 3.58406 35.4229 8.00006C35.4229 12.4161 32.2489 15.9999 28.3382 15.9999H21.2535V0Z" fill="#FF7262" />
              <path d="M35.4229 23.9999C35.4229 28.4159 32.2489 32 28.3382 32C24.4275 32 21.2535 28.4159 21.2535 23.9999C21.2535 19.5839 24.4275 15.9999 28.3382 15.9999C32.2489 15.9999 35.4229 19.5839 35.4229 23.9999Z" fill="#1ABCFE" />
          </g>
          <defs>
              <clipPath id="clip0_690_1894">
                  <rect width="42.5075" height="48" fill="white" />
              </clipPath>
          </defs>
      </svg>

  }
]);


// for pagination 
const canClickNext = useRef(3)

// for pagination 

  const handlePrevClick = () => {
    canClickNext.current-=itemsPerPage;
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
// for pagination 

  const handleNextClick = () => {
    canClickNext.current+=itemsPerPage;
    setCurrentPage(prevPage => prevPage + 1);
  };



  return (


    <>
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="items-start justify-between sm:flex">
            <div>
                <h4 className="text-gray-800 text-xl font-semibold">All Student</h4>
                <p className="mt-2 text-gray-600 text-base sm:text-sm">Text text text text</p>
            </div>
            <button onClick={()=>{setOpenAddNewClass(true)}} className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-fluencia-yellow-first hover:bg-fluencia-yellow-second active:bg-fluencia-yellow-second rounded-lg sm:mt-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                Add Class
            </button>
        </div>
     
     

          <ul className="mt-16 grid  gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/*for pagination  */}
            {orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(item => (
              <li className="border rounded-lg ">
                <div className="flex items-start justify-between p-4">
                  <div className="space-y-2">
                    <img src={img} className="h-10 w-10" alt="img "/>
                    <h4 className="text-gray-800 font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                  <button
                    href="javascript:void(0)"
                    className="text-black hover:text-red-600 text-sm font-medium"
                  >
                    Hide
                  </button>
                </div>
                
                <div className="py-5 px-4 border-t text-right">
                <Link to='home/1'>
                <button className="text-white text-sm border rounded-lg px-3 py-2 duration-150 bg-fluencia-yellow-first hover:bg-fluencia-yellow-second">
                    view
                  </button>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between          ">
            <div className="inline-flex mt-2 xs:mt-0">
              <button  onClick={handlePrevClick}
            disabled={currentPage === 1}
            className={`text-sm text-white transition duration-150 ${
              currentPage === 1 ? 'bg-gray-300' : 'hover:bg-fluencia-yellow-second bg-fluencia-yellow-first'
            } font-semibold py-2 px-4 rounded-l`}>
                Prev
              </button>
              &nbsp; &nbsp;
              <button
            onClick={handleNextClick}
            disabled={orders.length -1 < canClickNext.current}
            className={`text-sm text-white transition duration-150 ${
              orders.length-1 < canClickNext.current ? 'bg-gray-300' : 'hover:bg-fluencia-yellow-second bg-fluencia-yellow-first'
            } font-semibold py-2 px-4 rounded-r`}
          >
                Next
              </button>
            </div>
          </div>
      </section>
      {isOpenAddNewClass && createPortal(<AddNewCourse isOpenAddNewClass={isOpenAddNewClass} setOpenAddNewClass={setOpenAddNewClass}/>,document.body)}

    </>
  );
};

export default MainPageOfAdmin;
