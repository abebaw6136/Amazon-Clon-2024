import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import LayOut from './Components/LayOut/LayOut';
import Product from './Components/Product/Product';

// Simple 404 NotFound component
function NotFound() {
  return (
    <LayOut>
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/" style={{ color: '#007185', textDecoration: 'none' }}>Go to Home</a>
      </div>
    </LayOut>
  );
}

function Routing() {
  const [stripe, setStripe] = useState(null);
  const [stripeError, setStripeError] = useState(null);

  useEffect(() => {
    const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
    if (!stripeKey) {
      setStripeError("Stripe publishable key not found. Please check your environment variables.");
      return;
    }
    loadStripe(stripeKey).then(setStripe).catch((error) => {
      console.error("Failed to load Stripe.js", error);
      setStripeError("Failed to load payment system. Please check your internet connection or contact support.");
    });
  }, []);

  return (
    <Routes>
      {/* Public Routes - placed first */}
      <Route path='/' element={<Landing />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/search' element={<Results />} />
      <Route path='/category/:categoryName' element={<Product />} />
      
      {/* Product Detail - specific route before dynamic routes */}
      <Route path='/products/:productId' element={<ProductDetail />} />
      
      {/* Protected Routes */}
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
      
      {/* Redirect /payment to /payments for backward compatibility */}
      <Route path='/payment' element={<Navigate to="/payments" replace />} />
      
      {/* Catch-all route for 404 - must be last */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default Routing;
