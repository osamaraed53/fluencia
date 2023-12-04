import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchCard from "./SearchCard.jsx";
import {searchUsers,searchTeachers} from '../../ReduxSlice/searchSlice.js'
import { useDispatch } from "react-redux";
import PrivateRoute from '../../PrivateRoute.js'

const Search = ({setOpenSearch , type_of_members ,dataOfSearch ,flag, setFlag}) => {
const [searchInput,setSearchInput ] = useState([])
//   const  dataOfSearch =useSelector((state)=>state.user.users) 
  const dispatch = useDispatch()
  PrivateRoute()

  useEffect(()=>{
  if(searchInput == ""){
    handleSearch("");
  }
  },[searchInput])


  const handleSearch = (input) => {
    setSearchInput(input);
    if(type_of_members=="teacher"){
      dispatch(searchTeachers(input))

    }
    else if(type_of_members=="student"){
    dispatch(searchUsers(input))

  }else{
    alert("there ara a smothing wrong")
  }
  }



  const handleSubmit = (input) => {
    input.preventDefault();  
};

const handelCloseOpenSearch=()=>{
  setOpenSearch(false)
  setFlag(!flag)
}

  return (
    <>
      <div
        id="SearchComponent"
        className=" bg-transparent flex flex-col w-7/12  h-96 content-center "
      >
        <h1 className="flex justify-center text-6xl text-white">
          
        </h1>
        <form className="mx-5 mt-4" onSubmit={(e) => handleSubmit(e)}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only "
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm  text-gray-900 border border-gray-300 rounded-xl bg-white focus:bg-white"
              placeholder="Search"
              required=""
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              onClick={() => {
                setOpenSearch(true);
              }}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <button
        className="absolute top-2 right-2 text-4xl text-white"
        onClick={()=>{handelCloseOpenSearch()}}
        > X</button> 
        <SearchCard members={dataOfSearch} type_of_members={type_of_members}   flag={flag} setFlag={setFlag} />
      </div>
    </>
  );
};

export default Search;
