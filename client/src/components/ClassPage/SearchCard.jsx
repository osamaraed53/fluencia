import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourseToUser  ,UpdateTeacher} from "../../ReduxSlice/courseUserSlice";
import { useParams } from "react-router-dom";
import CheckTypeOfUser from "../../PrivateRoute";

const SearchCard = ({ type_of_members, flag, setFlag }) => {
  // get course_id from params
  const type = CheckTypeOfUser()
  const { course_id } = useParams();

  // get data of teachers or student from store
  const users = useSelector((state) => state.search.users);
  const teachers = useSelector((state) => state.search.teachers);
  let members = (users && type_of_members == "student" && users) || teachers;

  // console.log("members", members);
  // console.log(users)
  // console.log(teachers)

  // handel add new student or teachers to class
  const dispatch = useDispatch();
  const handeToAddStudentOrAdminToClass = (member) => {
   console.log(member)
   const update = type_of_members == "student" ?addCourseToUser :UpdateTeacher
   const user_id = type_of_members == "student" ?  member.user_id : member.admin_id
      dispatch(update(course_id, user_id));
      setFlag(!flag);

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
                src={
                  member.picture !== null
                    ? member.picture
                    : "https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                }
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
              {(type_of_members=='teacher') ? 'Update' : 'Add'}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchCard;
