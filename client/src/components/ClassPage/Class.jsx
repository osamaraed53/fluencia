import { IconButton } from "@material-ui/core";
import { Flag, SendOutlined } from "@material-ui/icons";
// import moment from "moment";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import Announcement from "./Announcement";
import classCss from "../../styleSheets/Class.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesForUser } from "../../ReduxSlice/courseUserSlice";
import { fetchCourseById } from "../../ReduxSlice/courseUserSlice";
import { getAllPostsOnCourse } from "../../ReduxSlice/postOnCourseSlice";
import PrivateRoute from "../../PrivateRoute";
import {addPostOnCourse} from '../../ReduxSlice/postOnCourseSlice'
 
function Class() {
  const type = PrivateRoute();
  const dispatch = useDispatch();
  const { course_id } = useParams();
  const [flag , setFlag] =useState("")

  // get data from store
  let classData = useSelector((state) => state.courseUser.selectedCourse);
  const posts = useSelector((state) => state.postOnCourse.allPostsOnCourse);
  const userData = useSelector((state)=>state.auth.user)

 
 
  useEffect(() => {
    dispatch(fetchCourseById(course_id));
    dispatch(getAllPostsOnCourse(course_id));

  }, [flag]);

  const [newPost, setNewPost] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevData) => ({ ...prevData, [name]: value }));
  };

  // add new post
  const createPost = () => {
    dispatch(addPostOnCourse(course_id,newPost))
    setNewPost({description :  ""})
    setFlag(!flag)

};
  return (
    <>
      <div className={classCss.class}>
        {classData && (
          <div className={classCss.class__nameBox} key={classData.course_id}>
            <div className={classCss.class__name}>
              {classData.course_name}
            </div>
            <p className="text-sm p-8">{classData.course_description}</p>
          </div>
        )}
        <div className={classCss.class__announce}>
          <img src={userData.picture} alt="My image" />
          <input
            type="text"
            name="description"
            value={newPost.description}
            onChange={(e) => handleInputChange(e)}
            placeholder="Announce something to your class"
          />
          <IconButton
            onClick={() => {
              createPost();
            }}
          >
            <SendOutlined />
          </IconButton>
        </div>
        {posts?.map((post) => (
          <Announcement
          flag={flag}
          setFlag={setFlag}
          post_course_id ={post.post_course_id}
            content={post.description}
            image={userData.picture}
            name={`${post.first_name} ${post.last_name}`}
          />
        ))}
      </div>
    </>
  );
}
export default Class;
