import { IconButton } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
// import moment from "moment";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Announcement from "./Announcement";
import classCss from "../../styleSheets/Class.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesForUser } from "../../ReduxSlice/courseUserSlice";
import { fetchCourseById } from "../../ReduxSlice/courseUserSlice";
import { getAllPostsOnCourse } from "../../ReduxSlice/postOnCourseSlice";
import CheckTypeOfUser from "../../PrivateRoute";
import { addPostOnCourse } from "../../ReduxSlice/postOnCourseSlice";

function Class() {
  const type = CheckTypeOfUser("type");
  const dispatch = useDispatch();
  const { course_id } = useParams();
  const [flag, setFlag] = useState("");

  // get data from store
  let classData = useSelector((state) => state.courseUser.selectedCourse);
  const posts = useSelector((state) => state.postOnCourse.allPostsOnCourse);
  const userDataForUser = useSelector((state) => state.auth.user);
  const userDataForAdmin = useSelector((state) => state.authForAdmin.user);
  const userData = type == "both" ? userDataForAdmin : userDataForUser;

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

  // const editPost = () =>{
  //   dispatch(addPostOnCourse(course_id, newPost));
  //   setNewPost({ description: "" });
  //   setFlag(!flag);
  // }

  const createPost = () => {
    dispatch(addPostOnCourse(course_id, newPost));
    setNewPost({ description: "" });
    setFlag(!flag);
  };
  return (
    <>
      <div className={`${classCss.class} mb-5`}>
        {classData && (
          <div className={classCss.class__nameBox} key={classData.course_id}>
            <div className={classCss.class__name}>{classData.course_name}</div>
            <p className="text-sm p-8">{classData.course_description}</p>
          </div>
        )}

        {type != "student" && (
          <div className={classCss.class__announce}>
            <img
              src={
                userData !== null
                  ? (userData.picture != null) ? userData.picture  :"https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                  : "https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
              }
              alt="My image"
            />
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
        )}

        {posts?.map((post,idx) => (
          <Announcement key={idx}
            flag={flag}
            setFlag={setFlag}
            post_course_id={post.post_course_id}
            content={post.description}
            image={
              post !== null
              ? (post.picture != null) ? post.picture  :"https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
              : "https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
            }
            setNewPost={setNewPost}
            name={`${post.first_name} ${post.last_name}`}
          />
        ))}
      </div>
    </>
  );
}
export default Class;
