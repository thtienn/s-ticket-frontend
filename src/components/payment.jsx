import React, { useEffect } from "react";
import { capturePay, createPay } from '../controllers/paypalController';

const PayPalButton = ({ total, handlePayment }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.sandbox.paypal.com/sdk/js?client-id=AZedqPcM6jcnO3PwmY_l5lLyjO6NoGGw5Qbu1OJJt9tawWBvqkI2-ZfUfcnuAJlq0AB2vMNk-y5UHPSU";
    script.async = true;
    script.onload = () => {
      window.paypal.Buttons({
        style: {
          shape: "rect",
          layout: "vertical",
          color: "gold",
          label: "paypal",
        },
        createOrder: async (data, actions) => {
          const orderID = await createPay(total);
          console.log("Order created with ID:", orderID);
          return orderID;
        },

        onApprove: async (data, actions) => {
          const orderID = data.orderID;
          console.log("Order approved with ID:", orderID);
          handlePayment("SUCCESSFUL");
        },

        onCancel: (data) => {
          console.log("Payment was cancelled");
          handlePayment("USER_CANCELLED");
        },

        onError: (err) => {
          console.log("Payment error:", err);
          handlePayment("SYSTEM_FAILED");
        },
      }).render("#paypal-button-container");
    };

    document.body.appendChild(script);
  }, []);

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;