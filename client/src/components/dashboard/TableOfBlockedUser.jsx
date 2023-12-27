import { useDispatch, useSelector } from "react-redux";
import { fetchDeletedUsers, restoreUser } from "../../ReduxSlice/usersSlice";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

const TableForBlockedUsers = () => {
  const ActivateUser = (user_id) => {
    dispatch(restoreUser(user_id));
    setFlag(!flag);
  };

  const dispatch = useDispatch();
  const tableItems = useSelector((state) => state.user.deletedUsers);
  const [flag, setFlag] = useState(true);
  console.log(tableItems);

  useEffect(() => {
    dispatch(fetchDeletedUsers());
  }, [flag]);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust as needed
  // for pagination
  const canClickNext = useRef(10);
  // for pagination
  const handlePrevClick = () => {
    canClickNext.current -= itemsPerPage;
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  // for pagination
  const handleNextClick = () => {
    canClickNext.current += itemsPerPage;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className=" sm:-px-8 sm:px-8 py-4 overflow-x-auto mt-5 px-10">
        <div className="font-bold text-xl md:mb-10">
          <h1 className="text-5xl">
            <span className="text-fluencia-purple tracking-wide">fluencia</span>
            <span className="text-fluencia-light-purple">BlockedUsers</span>
          </h1>
        </div>

        {/* <button onClick={()=>{setOpenAddAdminPopup(true)}} class="py-2 px-4 mb-3 bg-transparent text-fluencia-purple font-semibold border border-fluencia-purple rounded hover:bg-fluencia-purple hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
          Add new Faqs
        </button> */}

        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-fluencia-dark-purple text-left text-xs font-semibold text-white uppercase tracking-wider">
                  First name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-fluencia-dark-purple text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Last name
                </th>

                <th className="px-5 py-3 border-b-2 border-gray-200 bg-fluencia-dark-purple text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-fluencia-dark-purple text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-fluencia-dark-purple text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Is Pay
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-fluencia-dark-purple text-left text-xs font-semibold text-white uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tableItems
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((userData, idx) => (
                  <tr key={idx}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <Link
                        // to={`/OrderDetails/${userData.user_username}`}
                        >
                          <div className="ml-3">
                            <p className="text-gray-900 text-start   whitespace-wrap ">
                              {userData?.first_name}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 text-start whitespace-wrap">
                        {" "}
                        {userData?.last_name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 text-start whitespace-wrap">
                        {" "}
                        {userData?.email}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 text-start whitespace-wrap">
                        {" "}
                        {`+962${userData?.phone}`}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 text-start whitespace-wrap">
                        {" "}
                        {`${userData.is_pay}`}
                      </p>
                    </td>

                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex space-x-2">
                        <button onClick={() => ActivateUser(userData?.user_id)}>
                        <FontAwesomeIcon icon={faUserPlus} />
                        </button>

                        {/* <button
                              onClick={() => blockUser(userData?.user_id)}
                            >
                              <svg
                                class="text-orange-600 w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between          ">
          <div className="inline-flex mt-2 xs:mt-0">
            <button
              onClick={handlePrevClick}
              disabled={currentPage === 1}
              className={`text-sm text-white transition duration-150 ${
                currentPage === 1
                  ? "bg-gray-300"
                  : "hover:bg-fluencia-yellow-first bg-fluencia-yellow-second"
              } font-semibold py-2 px-4 rounded-l`}
            >
              Prev
            </button>
            &nbsp; &nbsp;
            <button
              onClick={handleNextClick}
              disabled={tableItems.length - 1 < canClickNext.current}
              className={`text-sm text-white transition duration-150 ${
                tableItems.length - 1 < canClickNext.current
                  ? "bg-gray-300"
                  : "hover:bg-fluencia-yellow-first bg-fluencia-yellow-second"
              } font-semibold py-2 px-4 rounded-r`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableForBlockedUsers;
