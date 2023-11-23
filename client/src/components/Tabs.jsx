import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
  useMatch
} from "react-router-dom";


const Tabs = ({ tabs = [], active, setActive }) => {
  // let {url} = useMatch();
    return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow">
      <nav className="flex flex-col sm:flex-row">
        {tabs.map((tab) => (
          <div>
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
