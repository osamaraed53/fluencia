import {
    faHouseUser,
    faEnvelope,
    faUserLock,
    faUser,
    faFolder,
    faListCheck,
    faClipboardQuestion,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckTypeOfUser from '../PrivateRoute'


export default [
    
    {
      title: "Home",
      src: <FontAwesomeIcon icon={faHouseUser} className="h-8 w-8 text-white" />,
      path: "/main",
    },
    // {
    //   title: "Inbox",
    //   src: <FontAwesomeIcon icon={faListCheck} className="h-8 w-8 text-white" />,
    //   path: " ",
    // },
    {
      title: "Dashboard",
      src: <FontAwesomeIcon icon={faClipboardQuestion} className="h-8 w-8 text-white" />,
      path: "/Dashboard",
     property :  'hidden' 
    },
  ];
