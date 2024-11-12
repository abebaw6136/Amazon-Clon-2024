import React, { useContext } from 'react'; // Import useContext
import classes from './Cart.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider'; 
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { Link } from 'react-router-dom'; 

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext); 

  // Calculate the total amount
  const total = basket.reduce((amount, item) => item.price + amount, 0);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello {user?.name || 'Guest'}</h2> {/* Optional greeting for user */}
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No items in your cart</p>
          ) : (
            basket.map((item, i) => (
              <ProductCard
                key={i}
                product={item}
                renderDesc={true}
                renderADD={false}
                flex={true}
              />
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className= {classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items)</p> {/* Fixed parentheses */}
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type='checkbox' />
              <small>This order contains a gift</small>
            </span>
            <Link to='/payment'>Continue to checkout</Link> {/* Corrected to Link */}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;