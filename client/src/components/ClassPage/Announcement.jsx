import { IconButton } from "@material-ui/core";
// import { Menu, MoreVert } from "@material-ui/icons";
import React,{useState} from "react";
// import styles from "../../styleSheets/Announcement.module.css";
import { useSelector,useDispatch } from "react-redux";
import {deletePostOnCourse} from '../../ReduxSlice/postOnCourseSlice'
import svg from '../../assets/threePoint.png'

import classCss from "../../styleSheets/Class.module.css";

function Announcement({ image, name, content,post_course_id ,setFlag ,flag }) {
  const userData = useSelector((state) => state.auth.user);
  const dispatch =useDispatch()


  const deleteComment =(post_course_id)=>{
    dispatch(deletePostOnCourse(post_course_id))


  }
  const [newPost, setNewPost] = useState("");
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevData) => ({ ...prevData, [name]: value }));
    setFlag(!flag)
  };


  

  return (
    <div className={`classCss.class w-full`}>
      <div className={classCss.class__announce}>
        <div className="flex flex-col">
          <img src={image} alt="My image " className="w-12 h-12 rounded-full" />
          <label>{name}</label>
        </div>
        {/* <input
        type="text"
        name="description"
        value={s}
        onChange={(e) => handleInputChange(e)}
        placeholder="Announce something to your class"
      /> */}
        <label>{content}</label>
        <IconButton>
          <div className="group relative cursor-pointer py-2">
            <div className="flex items-center justify-between  md:px-4">
              <img src={svg} />
            </div>
            <div className="invisible absolute z-50 flex text-center w-full flex-col  rounded-xl bg-gray-400 py-1  text-white shadow-xl group-hover:visible">
              <button
                onClick={() => {deleteComment(post_course_id)}}
                className="text-sm text-center divide-y-2"
              >
                delete
              </button>
              <button
                onClick={(e) => {handleInputChange(e)}}
                className="text-sm text-center divide-y-2"
              >
                edit
              </button>
            </div>
          </div>
        </IconButton>
      </div>
    </div>
  );
}
export default Announcement;
