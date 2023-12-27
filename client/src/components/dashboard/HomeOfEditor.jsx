import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, softDeleteTask } from "../../ReduxSlice/taskSlice .js";

function HomeOfEditor() {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [flag]);




  const tasks = useSelector((state) => state.task.tasks);

  const deleteTask = (task_id) => {
    dispatch(softDeleteTask(task_id));
    setFlag(!flag);
  };

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Adjust as needed

  // for pagination
  const canClickNext = useRef(itemsPerPage);

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

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-3xl text-fluencia-light-purple font-bold mb-4">
        All{" "}
        <span
          className="text-fluencia-dark-purple
        "
        >
          Fluencia
        </span>{" "}
        Tasks
      </h1>

      <Link to="/add">
        <button class="py-2 px-4 bg-transparent text-fluencia-purple font-semibold border border-fluencia-purple rounded hover:bg-fluencia-purple hover:text-white hover:border-transparent transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
          create New Task
        </button>
      </Link>

      {tasks
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((item, index) => (
          <div key={index} className="mb-8">
            <div className="mx-24 mt-12 mb-20 shadow-lg shadow-fluencia-purple/50 rounded-xl">
              <div className="flex flex-col  px-6 py-10  lg:px-16 pr-3 dark:bg-gray-800">
                <div className="flex justify-between ">
                  <h2 className="text-start text-2xl font-bold ">
                    {item.task_name}
                  </h2>
                  <div>
                    <Link to={`/edit/${item.task_id}`}>
                      <button
                        class="bg-fluencia-purple  text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-fluencia-dark-purple outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Edit
                      </button>{" "}
                    </Link>
                    <button
                      class="bg-fluencia-purple  text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg hover:bg-fluencia-dark-purple outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        deleteTask(item.task_id);
                      }}
                    >
                      delete
                    </button>
                  </div>
                </div>
                <div
                  className="w-11/12 break-words text-end"
                  dangerouslySetInnerHTML={{ __html: item.task_description }}
                />
              </div>
            </div>
          </div>
        ))}

      <div className="px-5 py-5 bg-white flex flex-col xs:flex-row items-center xs:justify-between          ">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            className={`text-sm text-white transition duration-150 ${
              currentPage === 1
                ? "bg-gray-300"
                : "hover:bg-fluencia-yellow-second bg-fluencia-yellow-first"
            } font-semibold py-2 px-4 rounded-l`}
          >
            Prev
          </button>
          &nbsp; &nbsp;
          <button
            onClick={handleNextClick}
            disabled={tasks.length - 1 < canClickNext.current}
            className={`text-sm text-white transition duration-150 ${
              tasks.length - 1 < canClickNext.current
                ? "bg-gray-300"
                : "hover:bg-fluencia-yellow-second bg-fluencia-yellow-first"
            } font-semibold py-2 px-4 rounded-r`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeOfEditor;
