import React from 'react'
import Payment from "./Payment";
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "../Route/ProtectedRoute";
import { loadStripe } from "@stripe/stripe-js";
const Stripe = (key) => {
  return (
    <>
      <Elements stripe={loadStripe(key)}>
        <Payment/>  
        </Elements>
    </>
  )
}

export default Stripe
