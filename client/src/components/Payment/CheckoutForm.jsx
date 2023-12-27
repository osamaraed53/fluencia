import React from "react";
import axios from "axios";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { useCookies } from "react-cookie";
import CardSection from "./CardSection";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


const CheckoutForm = (props) => {
  // const [cookies] = useCookies(["accessToken"]);
  const token = Cookies.get("accessToken");
  const navigate = useNavigate()
  const {plan_id} = useParams()
  let endPointForPayment ;
  if(plan_id==1){
    endPointForPayment= "create-customer"
  }else if(plan_id==2){
    endPointForPayment = "createCustomer2Months";
  }
  else if(plan_id==3){
    endPointForPayment = "createCustomer3Months"
  }else{
    Swal.fire({
      icon: "error",
      title: "there are something wrong ",
      showConfirmButton: false,
      timer: 1000,
    });
    navigate("/contact")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      // console.log(result.token);
      const tok = token

      try {
        // axios.defaults.headers.common["Authorization"] = tok;
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          `http://localhost:3000/${endPointForPayment}`,
          {
            token: result.token.id,
          },{headers}
        );
        const sessionId = response.data.id;
        console.log("osama raed alnobani")
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        console.log("Response from backend:", response.data);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <div>
      {/* <div className="product-info">
        <h3 className="product-title">Apple MacBook Pro</h3>
        <h4 className="product-price">$999</h4>
      </div> */}
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!props.stripe} className="btn-pay">
          Buy Now
        </button>
      </form>
    </div>
  );
};

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCheckoutForm;
