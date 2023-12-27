import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchTasksforUser} from '../../ReduxSlice/taskSlice .js'
import {fetchTasksforAdmin  } from "../../ReduxSlice/taskSlice .js";
import { Link, useParams } from 'react-router-dom';
import CheckTypeOfUser from '../../PrivateRoute.js';


const Tasks = () => {

const type = CheckTypeOfUser()
const {course_id} = useParams()
//fetch Tasks 
const dispatch = useDispatch()

useEffect(()=>{
    const fetchTask =  type=='student' ? fetchTasksforUser : fetchTasksforAdmin;
    dispatch(fetchTask(course_id))
},[])

const tasks = useSelector((state)=>state.task.tasks)


console.log(tasks)





  return (
    <>    
    <section className="">
    <div className="max-w-screen-lg mx-auto px-4 md:px-8 ">
        {/* <div className="max-w-md">
            <h1 className="text-gray-800 text-2xl font-extrabold sm:text-3xl">Open Positions</h1>
            <p className="text-gray-600 mt-2">We're currently looking talent software engineers, and designers to help us in our missions and to grow up.</p>
        </div> */}
        <ul className="mt-4 divide-y space-y-3">
            {
                tasks.map((task, idx) => (
                    <li key={idx } className="px-4 py-5 duration-150 bg-fluencia-light-purple hover:border-white rounded-xl hover:bg-fluencia-purple">
                        <a href={task} className="space-y-3">
                            <div className="flex items-center gap-x-3">
                                <div>
                                    <h2 className="text-base text-white font-bold mt-1">{task.task_name}</h2>
                                </div>
                            </div>


                            <div className="text-sm text-white flex justify-between gap-6">
                   { type == 'student' &&            <div className='flex flex-row justify-between gap-2'>
                                <span className="flex items-center gap-2">
                                    Start: {task.start_date}
                                </span>
                                <span className="flex items-center gap-2">
                                    End: {task.end_date}
                                </span>
                                
                                </div>}
                                <Link to={`task/${type=='student'?task.users_task_id :task.task_id }`} className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-fluencia-yellow-first hover:bg-fluencia-yellow-first  justify-self-">Details</Link>
                            </div>
                        </a>
                    </li>
                ))
            }
        </ul>
    </div>
</section></>
  )
}

export default Tasks


