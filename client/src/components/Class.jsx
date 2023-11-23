import { IconButton } from "@material-ui/core";
import { SendOutlined } from "@material-ui/icons";
// import moment from "moment";
import { useState ,useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import classCss from "../styleSheets/Class.module.css";
function Class() {
  const [classData, setClassData] = useState({});
  const [announcementContent, setAnnouncementContent] = useState("");
  const [posts, setPosts] = useState([]);
  
//   const { id } = useParams();
//   useEffect(() => {
//     // reverse the array
//     let reversedArray = classData?.posts?.reverse();
//     setPosts(reversedArray);
//   }, [classData]);
  const createPost = async () => {
    // try {
    //   const myClassRef = await db.collection("classes").doc(id).get();
    //   const myClassData = await myClassRef.data();
    //   console.log(myClassData);
    //   let tempPosts = myClassData.posts;
    //   tempPosts.push({
    //     authorId: user.uid,
    //     content: announcementContent,
    //     date: moment().format("MMM Do YY"),
    //     image: user.photoURL,
    //     name: user.displayName,
    //   });


    //   myClassRef.ref.update({
    //     posts: tempPosts,
    //   });
    // } catch (error) {
    //   console.error(error);
    //   alert(`There was an error posting the announcement, please try again!`);
    // }
  };

//   useEffect(() => {

//   }, []);
//   useEffect(() => {
//     if (loading) return;
//     if (!user) history.replace("/");
//   }, [loading, user]);
return (
    <div className={classCss.class}>
      <div className={classCss.class__nameBox}>
        <div className={classCss.class__name}>{classData.name || "osama" }</div>
      </div>
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
          authorId={post.authorId}
          content={post.content}
          date={post.date}
          image={post.image}
          name={post.name}
        />
      ))}
    </div>
  );
}
export default Class;