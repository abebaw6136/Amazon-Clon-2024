import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [{ user, basket }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0) || 0;
  const total = basket?.reduce((amount, item) => item.price * item.amount + amount, 0) || 0;

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const response = await axiosInstance.post(`/payment/create?total=${total * 100}`);
      const clientSecret = response.data?.clientSecret;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        // Handle error from Stripe
        setCardError(error.message);
        setProcessing(false);
        return; // Exit the function if there's an error
      }

      // Save the paymentIntent to the database
      await db
      .collection("users")
      .doc(user.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

      // Navigate to the orders page
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });

    } catch (error) {
      console.error("Payment error:", error);
      setCardError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.Payment__header}>
        Checkout ({totalItem}) items
      </div>
      <section className={classes.Payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Ethiopia, Addis Ababa</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
        </div>
        <div>
          {basket?.map((item) => (
            <ProductCard key={item.id} product={item} flex={true} />
          ))}
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.Payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {cardError && <small style={{ color: "red" }}>{cardError}</small>}
                <CardElement onChange={handleChange} />
                <div className={classes.Payment__price}>
                  <span style={{ display: "flex", gap: "10px" }}>
                    <p>Total Order: </p>
                    <CurrencyFormat amount={total} />
                  </span>
                  <button type="submit" disabled={processing || !stripe || !elements}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;