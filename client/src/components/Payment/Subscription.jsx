import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../../styleSheets/style.css";
// import "./styles.css";
// import CheckoutForm from "./CheckoutForm";

function Subscription() {
  const { plan_id } = useParams();
  const plans = [
    { plan_id: 1, plan_price: "170", duration: "Month" },
    { plan_id: 2, plan_price: "280", duration: "2 Month" },
    { plan_id: 3, plan_price: "430", duration: "3 Month" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, []);


  const stripePromise = loadStripe(
    "pk_test_51OGNphDlQnoZqAI2nOdkHTOovR4MroSkRlpg1HWwPDqEf4LSmmRg5eObeoUevkYr7xpO9KAdaNE4XtJwEHszsxHr00LSotfkX6"
  );







  return (
    <>
      <div class="relative text-gray-900 pt-12 pr-0 pb-14 pl-0 w-full bg-indigo-950 flex items-center justify-center ">
        <div class="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl">
          <div class="flex flex-col items-center sm:px-5 md:flex-row">
            <div class="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 ">
              <div
                class="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
          md:space-y-5"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center  border-indigo-950 absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-solid bg-white p-4 sm:p-6 md:p-8 max-w-md w-11/12 md:w-[40rem] rounded-3xl mb-80">
        <div className="w-full">
          <div className="flex flex-col  pb-4">
            <div className="flex flex-row justify-between items-center border-b border-solid  bg-[#F7F1EE]">
              <div className="font-bold">Premium Membership</div>
              <div className="font-bold">{plans[(plan_id-1)].plan_price}</div>
            </div>

            <div className="flex flex-col justify-between  items-center pt-4 w-full">
              <div className="flex flex-row justify-between w-full items-center pt-4">
                <span className="font-bold">
                  {plans[(plan_id-1)].duration}
                </span>
                <span className="font-bold">Today</span>
              </div>
              <div className="flex flex-row justify-between w-full items-center pt-4">
                <span className="font-bold">Start billing date</span>
                <span className="font-bold">1/1/2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product">
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>

      {/* <div className="flex justify-center items-center  ">
        <div className="payment_container flex flex-col items-start p-8 space-y-8 bg-white border-2 border-black shadow-2xl rounded-md w-11/12 xs:w-[40rem]">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 cursor-pointer"
              id="exit"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
            
            </svg>
            <h1 className="ml-2 text-2xl font-bold">Payment details</h1>
          </div>
          <div className="flex flex-col space-y-4 w-full">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="input1 p-4 border-2 border-black rounded-md"
            />
            <label htmlFor="card" className="font-semibold">
              Card number
            </label>
            <input
              type="text"
              minLength="16"
              maxLength="16"
              id="card"
              name="card"
              placeholder="0000 0000 0000 0000"
              className=" input1 p-4 border-2 border-black rounded-md"
            />
            <div className="flex justify-between w-full">
              <div className="w-1/2 flex flex-col space-y-2">
                <label htmlFor="expiry" className="font-semibold">
                  Expiration date
                </label>
                <input
                  className="p-4 mr-2 border-2 border-black rounded-md"
                  name="expiry"
                  id="expiry"
                  type="text"
                  required
                  placeholder="00/00"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-2">
                <label htmlFor="cvc" className="font-semibold">
                  CVC
                </label>
                <input
                  type="text"
                  minLength="3"
                  maxLength="4"
                  id="cvc"
                  name="cvc"
                  placeholder="XXX"
                  className="  p-4 border-2 border-black rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <svg
              className="w-6 h-6"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              
            </svg>
            <Link to="/tech">
              <button className="block w-full rounded bg-indigo-950 px-12 py-3 text-sm font-medium text-white shadow hover:bg-indigo-900 focus:outline-none focus:ring active:bg-indigo-900 sm:w-auto">
                Submit
              </button>
            </Link>
          </div>
        </div>
      </div> */}
      {/* <Footer /> */}
    </>
  );
}

export default Subscription;
