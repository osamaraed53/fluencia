import React, { useEffect, useState } from "react";
// import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updatePicture } from "../ReduxSlice/AuthenticationSlice";
import Cookies from "js-cookie";
import save from "../assets/save.svg";

const ProfilePrivate = () => {
  const token = Cookies.get("accessToken");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [userData, setUserData] = useState([]);
  //to allow modification on field

  const [apilityOfFirstName, setApilityOfFirstName] = useState(true);
  const [apilityOfLastName, setApilityOfLastName] = useState(true);
  const [apilityOfPhone, setApilityOfPhone] = useState(true);
  const [apilityOfEmail, setApilityOfEmail] = useState(true);
  const dispatch = useDispatch();
  const userDataFromStore = useSelector((state) => state.auth.user);
  const errorInUpdate = useSelector((state) => state.auth.error);
  // console.log(userDataFromStore)

  useEffect(() => {
    setUserData(userDataFromStore);
  }, [userDataFromStore]);

  const handleUpdateImage = async (e) => {
    // Implement a file input in your form to let the user choose a new image
    const fileInput = e.target.files[0];
    // If a new image is selected, send it to action
    if (fileInput) {
      const formData = new FormData();
      formData.append("image", fileInput);
      dispatch(updatePicture(formData));
      window.location.reload();
    } else {
      console.log("No new image selected.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const updateData = (e) => {
    if (userData) {
      try {
        axios.put("http://localhost:3000/updateUser", userData, {
          headers,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="h-[420px] mt-12 flex justify-center ">
        <div className="flex bg-gray-100 shadow-lg shadow-fluencia-purple/50 justify-center border border-solid p-6 md:p-8 w-3/4 rounded-3xl mb-40  h-[700px]">
          <div className="w-full h-full">
            <div className="flex flex-col md:flex-row gap-12 pb-4 justify-center items-center">
              <div className="shrink-0 flex flex-col justify-center items-center">
                <img
                  id="preview_img"
                  src={
                    userData !== null
                      ? userData.picture
                      : "https://i.pinimg.com/564x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                  }
                  alt="Profile image"
                  className="h-48 w-48 rounded-full object-cover"
                />
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    id="profileImageInput"
                    accept="image/*"
                    onChange={(e) => handleUpdateImage(e)}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  />
                </label>
                {errorInUpdate && errorInUpdate}
              </div>
              <div className="text-start w-1/2">
                <h1 className="text-2xl md:text-4xl">
                  {userData && userData.first_name + " " + userData.last_name}
                </h1>
                {/* <p className="text-gray-700">
                {flights && flights.length} Flights{" "}
                {bookings && bookings.length} Bookings
              </p> */}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full md:mt-5">
              <div className="w-full md:w-2/3 flex flex-col justify-center items-center gap-2">
                <label className="px-3 self-start">Name</label>
                <div className="flex w-full gap-5">
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First Name"
                      value={userData !== null ? userData.first_name : ""}
                      onChange={(e) => handleChange(e)}
                      disabled={apilityOfFirstName}
                      className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        !apilityOfFirstName && updateData(e);
                        setApilityOfFirstName(!apilityOfFirstName);
                      }}
                      className="absolute inset-y-0 end-0 flex items-center pe-3"
                    >
                      {apilityOfFirstName ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className={`w-6 h-6`}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      ) : (
                        <img src={save} className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last Name"
                      value={userData !== null ? userData.last_name : ""}
                      onChange={(e) => handleChange(e)}
                      disabled={apilityOfLastName}
                      className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        !apilityOfLastName && updateData(e);
                        setApilityOfLastName(!apilityOfLastName);
                      }}
                      className="absolute inset-y-0 end-0 flex items-center pe-3"
                    >
                      {apilityOfLastName ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className={`w-6 h-6`}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      ) : (
                        <img src={save} className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                </div>
                <label className="px-3 self-start">Phone</label>
                <div className="relative w-full">
                  <input
                    type="text"
                    name="phone"
                    placeholder="07##########"
                    value={userData !== null ? "userData.Phone" : "user.Phone"}
                    onChange={(e) => handleChange(e)}
                    disabled={apilityOfPhone}
                    className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      !apilityOfPhone && updateData(e);
                      setApilityOfPhone(!apilityOfPhone);
                    }}
                    className="absolute inset-y-0 end-0 flex items-center pe-3"
                  >
                    {apilityOfPhone ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className={`w-6 h-6`}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    ) : (
                      <img src={save} className="w-6 h-6" />
                    )}
                  </button>
                </div>
                <label className="px-3 self-start">Email Address</label>
                <div className="relative w-full">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={userData !== null ? userData.email : ""}
                    onChange={(e) => handleChange(e)}
                    disabled={apilityOfEmail}
                    className="block text-sm py-3 px-4 rounded-lg w-full border border-[#0c4a6e69] outline-none"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      !apilityOfEmail && updateData(e);
                      setApilityOfEmail(!apilityOfEmail);
                    }}
                    className="absolute inset-y-0 end-0 flex items-center pe-3"
                  >
                    {apilityOfEmail ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className={`w-6 h-6`}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    ) : (
                      <img src={save} className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="flex justify-end m-4">
                <button
                  className="w-1/4 mr-3 p-2 bg-gray-50 text-black rounded-xl mt-2 "
                  type="clear"
                  // onClick={hendleSignUp}
                >
                  Cancel
                </button>
                <button
                  className="w-auto py-2 px-3 bg-[#FE7A00] text-white rounded-xl mt-2 "
                  // onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePrivate;
