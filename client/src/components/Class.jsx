import { IconButton } from "@material-ui/core";
import { Flag, SendOutlined } from "@material-ui/icons";
// import moment from "moment";
import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import classCss from "../styleSheets/Class.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesForUser } from "../ReduxSlice/courseUserSlice";
import { fetchCourseById } from "../ReduxSlice/courseUserSlice";
import { getAllPostsOnCourse } from "../ReduxSlice/postOnCourseSlice";

function Class() {
  //to get data from redux store
  const [data, setData] = useState("");

  // get data from store
  let classData = useSelector((state) => state.courseUser.userCourses);
  // console.log(classData)

  const dispatch = useDispatch();
  const [announcementContent, setAnnouncementContent] = useState("");
  // console.log(classData)
  const [flag, setFlag] = useState(false);
  const { id } = useParams();
  // get posts from store 
  const posts = useSelector((state)=>state.postOnCourse.allPostsOnCourse)
  console.log(posts)
  useEffect(() => {
    if (!id) {
      dispatch(fetchCoursesForUser());
    } else {
      dispatch(fetchCourseById(id));
      dispatch(getAllPostsOnCourse(id));
      setFlag(true);
    }
    setData(classData);

    if (data.course_name == "" || flag == true)
      setTimeout(() => {
        setFlag(false);
      }, 1000);
  }, [dispatch]);

  const createPost = async () => {
  };

  return (
    <>
      <div className={classCss.class}>
        {data && (
          <div className={classCss.class__nameBox} key={data.course_id}>
            <div className={classCss.class__name}>{data.course_name}</div>
            <p className="text-sm p-8">{data.course_description}</p>
          </div>
        )}
        <div className={classCss.class__announce}>
          <img src="" alt="My image" />
          <input
            type="text"
            value={announcementContent}
            onChange={(e) => setAnnouncementContent(e.target.value)}
            placeholder="Announce something to your class"
          />
          <IconButton onClick={createPost}>
            <SendOutlined />
          </IconButton>
        </div>
        {posts?.map((post) => (
          <Announcement
            authorId={post.first_name
            }
            content={post.description}
            date={post.date}
            image={post.image}
            name={post.last_name
            }
          />
        ))}
      </div>
    </>
  );
}
export default Class;
