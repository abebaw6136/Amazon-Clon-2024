import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Auth from './Pages/Auth/Auth';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Orders/Orders';
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

//import NotFound from './Pages/NotFound/NotFound'; // Import your NotFound component

function Routing() {
  const [stripe, setStripe] = useState(null);
  const [stripeError, setStripeError] = useState(null);

  useEffect(() => {
    loadStripe("pk_test_51QNyTpCl7luOPxoahC6CDF2dWeSyxGdj6zNgHQmANJo5x5KOhfXrgJRRwHPoz4CyKq1l1S0IeYaKcRmqQI5HaSNF00UHHHWvBZ").then(setStripe).catch((error) => {
      console.error("Failed to load Stripe.js", error);
      setStripeError("Failed to load payment system. Please check your internet connection or contact support.");
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />
        <Route
        path='/payments'
         element={
          <ProtectedRoute
           msg={"you must log in to pay"}
          redirect={"/payments"}
          >
            {stripe ? (
              <Elements stripe={stripe}>
                <Payment />
              </Elements>
            ) : stripeError ? (
              <div style={{ padding: "20px", textAlign: "center" }}>
                <h2>Payment System Error</h2>
                <p>{stripeError}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
              </div>
            ) : (
              <div style={{ padding: "20px", textAlign: "center" }}>Loading payment system...</div>
            )}
          </ProtectedRoute>

         }
         />
         <Route
        path='/orders'
         element={
          <ProtectedRoute
           msg={"you must log in to access your orders"}
          redirect={"/orders"}
          >
        <Orders />

          </ProtectedRoute>

         }
         />


        <Route path='/category/:categoryName' element={<Results />} />
        <Route path='/search' element={<Results />} />
        <Route path='/products/:productId' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />

      </Routes>
    </Router>
  );
}

export default Routing;
