import { IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePostOnCourse } from "../../ReduxSlice/postOnCourseSlice";
import svg from "../../assets/threePoint.png";
import classCss from "../../styleSheets/Class.module.css";
import CheckTypeOfUser from "../../PrivateRoute";

function Announcement({ image, name, content, post_course_id, setFlag, flag ,setNewPost }) {
  // const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const type = CheckTypeOfUser();

  const deleteComment = (post_course_id) => {
    dispatch(deletePostOnCourse(post_course_id));
    setFlag(!flag)
  };


  return (
    <div className={`classCss.class w-full`}>
      <div className={classCss.class__announce}>
        <div className="flex flex-col">
          <img src={image} alt="My image " className="w-12 h-12 rounded-full" />
          <label>{name}</label>
        </div>
        <label>{content}</label>
        <IconButton>
          {type != "student" && (
            <div className="group relative cursor-pointer py-2">
              <div className="flex items-center justify-between  md:px-4">
                <img src={svg} />
              </div>
              <div className="invisible absolute z-50 flex text-center w-full flex-col divide-y-4 rounded-xl bg-gray-400 py-1  text-white shadow-xl group-hover:visible">
                <button
                  onClick={() => {
                    deleteComment(post_course_id);
                  }}
                  className="text-sm text-center divide-y-2 hover:bg-pink-600"
                >
                  delete
                </button>
                <button
                  onClick={(e) => {
                    setNewPost({description : content })
                    deleteComment(post_course_id);
                    
                  }}
                  className="text-sm text-center divide-y-2 hover:bg-pink-600"
                >
                  edit
                </button>
              </div>
            </div>
          )}
        </IconButton>
      </div>
    </div>
  );
}
export default Announcement;
