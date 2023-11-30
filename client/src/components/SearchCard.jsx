import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToUser } from "../ReduxSlice/courseUserSlice";
import { useParams } from "react-router-dom";

const SearchCard = ({ type }) => {
  // get course_id from params
  const { id } = useParams();

  // get data of teachers or student from store
  const users = useSelector((state) => state.search.users);
  const teachers = useSelector((state) => state.search.teachers);
  let members = (users && type == "student" && users) || teachers;
  console.log("members", members);
  // console.log(users)
  // console.log(teachers)

  // handel add new student or teachers to class
  const dispatch = useDispatch();

  const handeToAddStudentOrAdminToClass = (member) => {
    if (type == "student") {
      const user_id = member.user_id;
      console.log(user_id)
      const course_id = id;
      dispatch(addCourseToUser(user_id, course_id));
    }
  };

  return (
    <>
      <ul className="divide-y overflow-y-scroll  justify-center">
        {members.map((member, id) => (
          <li
            key={id}
            className="py-5 flex items-start justify-between bg-white"
          >
            <div className="flex gap-3 px-6 ">
              <img
                src={member.img}
                className="flex-none w-12 h-12 rounded-full"
              />
              <div>
                <span className="block text-sm text-gray-700 font-semibold">
                  {member.name}
                </span>
                <span className="block text-sm text-gray-600">
                  {member.email}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                handeToAddStudentOrAdminToClass(member);
              }}
              href="javascript:void(0)"
              className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-fluencia-yellow-first hover:bg-fluencia-yellow-second"
            >
              add
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchCard;
