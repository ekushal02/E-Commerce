import React, { Fragment, useEffect, useRef, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  // const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const validateCardNumber = (number) => /^\d{16}$/.test(number);
  const validateExpiryDate = (date) => {
    const currentDate = new Date();
    const enteredDate = new Date(`01/${date}`);
    return !isNaN(enteredDate) && enteredDate > currentDate;
  };
  
  const validateCVV = (cvv) => /^\d{3}$/.test(cvv);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateCardNumber(cardNumber)) {
      toast.error("Please enter valid card number.");
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      toast.error("Please enter valid expiry date.");
      return;
    }

    if (!validateCVV(cvv)) {
      toast.error("Please enter valid cvv details");
      return;
    }

    payBtn.current.disabled = true;

    try {
      // Simulate a successful payment response
      const mockPaymentResponse = await simulatePayment();

      if (mockPaymentResponse.success) {
        // Update the order payment info
        order.paymentInfo = {
          id: mockPaymentResponse.paymentId,
          status: "succeeded",
        };

        // Dispatch the createOrder action
        dispatch(createOrder(order));

        // Redirect to the success page
        navigate("/success");
      } else {
        throw new Error("Payment failed");
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error("There was an issue processing the payment.");
    }
  };

  const simulatePayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = true;
        const paymentId = "mock_payment_id";
        resolve({ success, paymentId });
      }, 2000);
    });
  };



  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <input
              type="text"
              placeholder="Card Number"
              className="paymentInput"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div>
            <EventIcon />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="paymentInput"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>
          <div>
            <VpnKeyIcon />
            <input
              type="text"
              placeholder="CVC"
              className="paymentInput"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
