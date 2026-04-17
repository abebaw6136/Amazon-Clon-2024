import React, { useState, useEffect, useContext } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from '../../Components/Product/ProductCard';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import Loader from '../../Components/Loader/Loader';
import { db } from '../../Utility/firebase';
import classes from './Orders.module.css';

function Orders() {
  const [{ user }, ] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = db.collection(`users/${user.uid}/orders`).orderBy('created', 'desc').onSnapshot(
      snapshot => {
        const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
        setLoading(false);
      },
      err => {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  if (loading) return <LayOut><Loader /></LayOut>;
  if (error) return <LayOut><div>{error}</div></LayOut>;

  return (
    <LayOut>
      <div style={{ padding: '30px' }}>
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>No orders yet. <a href="/">Continue shopping</a></p>
        ) : (
          orders.map(order => (
            <div key={order.id} className={classes.order}>
              <div className={classes.order_header}>
                <span>Order ID: {order.id.slice(0,8)}...</span>
                <span>Placed: {new Date(order.created * 1000).toLocaleDateString()}</span>
              </div>
              <div className={classes.order_items}>
                {order.basket.map(item => (
                  <ProductCard key={`${order.id}-${item.id}`} product={item} renderDesc={false} renderADD={false} />
                ))}
              </div>
              <div className={classes.order_footer}>
                <CurrencyFormat amount={order.amount / 100} />
                <button onClick={() => alert('Return request submitted!')} className={classes.return_btn}>
                  Return items
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </LayOut>
  );
}

export default Orders;

