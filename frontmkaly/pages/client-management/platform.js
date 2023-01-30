import React,{useContext, useState, useEffect} from 'react';
import {
    Grid,
    Stack,
    TextField,
    Box,
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    Container,
    Button,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../src/components/clientManagement/CheckoutForm";
import {UserContext} from '../../src/context/UserContext';
import {useRouter} from 'next/router';
import {getUser} from '../../src/functions/requests';

const stripePromise = loadStripe('pk_test_51MVe1FGpB3JzZ9Msw92mAPAJIrr7uHxjWDm4XdRx0By1PvMG5hXaMC6M3Lcu0aww6CeiZcpCZtI8OMYx6wWQLvmK00HFVOGN70');

export default function platform() {
  const [userData, setUserData] = useState(null);

  /*
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      //headers: { "Content-Type": "application/json" },
      //body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setUserData(data.clientSecret));
  }, []);
  */
  const appearance = {
    theme: 'stripe',
  };
  const option = {
    appearance,
  };

  return (
    <div className="platform">
        <Elements options={option} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
    </div>
  );
}
