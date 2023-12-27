import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Editpost from './Editpost';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Edit = (props) => {
  const [ispostId, setpostId] = useState([]);
  const {postId} = useParams()
  const post = useSelector((state) => state.task.tasks);

  useEffect(() => {
    getObjectById(post,postId)
    setpostId(post)
    
  }, []);

  const getObjectById = (array, id) => {
    return array.find(item => item.task_id == id);
  };
        
  
return (
<>
  {ispostId.length > 0 ? <>    
    <Editpost postList={ispostId}  editPostID={postId} />      
  </> : null }
</>
)
}
export default Edit