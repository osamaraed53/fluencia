// Contact.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { submitContactUs } from "../../ReduxSlice/contactUsSlice"; // Update with the correct path

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the action to submit contact form data
    dispatch(submitContactUs(formData));
    // Reset the form after submission (optional)
    setFormData({
      name : "",
      email : "",
      message : ""
    });
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Full Name
            </label>
            <input
                        required

              type="text"
              name="name"
              id="name"
              value={formData.name}
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Email Address
            </label>
            <input
            required
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="example@domain.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
          {/* i need add it in bakend before */}
          {/* <div className="mb-5">
          <label
            htmlFor="subject"
            className="mb-3 block text-base font-medium text-[#07074D]"
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Enter your subject"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div> */}
          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Message
            </label>
            <textarea
                        required

              rows={4}
              name="message"
              id="message"
              value={formData.message}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Type your message"
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              defaultValue={""}
            />
          </div>
          <div>
            <button className="hover:shadow-form rounded-md bg-fluencia-yellow-first bg-fluencia-yellow-second py-3 px-8 text-base font-semibold text-white outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
