 
 import {
    faHouseUser,
    faEnvelope,
    faUserLock,
    faUser,
    faFolder,
    faListCheck,
    faClipboardQuestion,
    faCircleQuestion,
    faMoneyBill,
    faBook,
    faEyeSlash
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 
 export default [
    { 
      title: "Home",
      src: <FontAwesomeIcon icon={faHouseUser} className="h-8 w-8 text-white" />,
      path: "/main",
    },
    {
      title: "Users",
      src: <FontAwesomeIcon icon={faMoneyBill} className="h-8 w-8 text-white" />,
      path: "pay",
    },
    {
      title: "New Pay",
      src: <FontAwesomeIcon icon={faUser} className="h-8 w-8 text-white" />,
      path: "allUsers",
    },
    {
      title: "blocked user",
      src: <FontAwesomeIcon icon={faUserLock} className="h-8 w-8 text-white" />,
      path: "blockedUsers",
    },
    {
      title: "Contact US",
      src: <FontAwesomeIcon icon={faEnvelope} className="h-8 w-8 text-white" />,
      path: "contactUs",
    },
    {
      title: "Classes",
      src: <FontAwesomeIcon icon={faBook} className="h-8 w-8 text-white" />,
      path: "Classes",
    },
    {
      title: "Hidden Classes",
      src: <FontAwesomeIcon icon={faEyeSlash} className="h-8 w-8 text-white" />,
      path: "HiddenClasses",
    },
    {
      title: "FAQs",
      src: <FontAwesomeIcon icon={faCircleQuestion}  className="h-8 w-8 text-white" />,
      path: "faq",
    },
  ];