import React, { useContext } from 'react';
import classes from './Payment.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

function Payment() {
  const [{ user, basket }] = useContext(DataContext);
  console.log(user);

  // Calculate total items in the basket
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0) || 0; 
  
    const stripe = useStripe();
    const elements = useElements();
  

  return (
    <LayOut>
      <div className={classes.Payment_header}>
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
        
        {/* Product Review Section */}
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
        <div className={classes.Payment_card_container}>
          <div>
          <form action="">
          <CardElement/>
          </form>
        </div>
        </div>

           </div>
      </section>
    </LayOut>
  );
}

export default Payment;