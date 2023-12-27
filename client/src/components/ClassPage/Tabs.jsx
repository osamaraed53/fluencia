import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
  useMatch
} from "react-router-dom";
import { useLocation } from 'react-router-dom';


const Tabs = ({ tabs = [], active, setActive }) => {
  const location = useLocation();

  const currentPath = location.pathname;
  // console.log(currentPath)
  (currentPath.includes('people') )? setActive(3) :(( currentPath.includes('tasks') ) ? setActive(2) : (( currentPath.includes('add') ) ? setActive(4) : setActive(1)) )
  // let {url} = useMatch();
    return (
    <div className="bg-white p-4 rounded-lg border border-gray-200  shadow">
      <nav className="flex flex-col sm:flex-row">
        {tabs.map((tab,idx) => (
          <div key={idx}>
            <Link to={`${tab.path}`}>
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`
              
              text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 focus:outline-none
            `}
            >
              {tab.title}
            </button>
            </Link>
            <div className={`${active == tab.id ?'h-[2px] bg-fluencia-dark-purple' :'' } `}> </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
