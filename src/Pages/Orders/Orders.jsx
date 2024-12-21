import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Orders.module.css';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { db } from '../../Utility/firebase';
import ProductCard from '../../Components/Product/ProductCard';

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [Orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const unsubscribe = db.collection("users")
        .doc(user.uid)
        .collection("Orders")
        .orderBy("created", "desc")
        .onSnapshot(
          (snapshot) => {
            setOrders(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
              }))
            );
            setLoading(false);
          },
          (error) => {
           
            setError(error.message);
            setLoading(false);
          }
        );

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setOrders([]);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading your orders...</div>;
  }

  return (
    <LayOut>
      <section className={classes.container}> 
        <div className="Orders__container"> 
          <h2>Your Orders</h2>
          {Orders?.length == 0 && (
          <div style={{padding:"20px"}}>You don't have orders yet.
           </div>
           )}

          <div>
            {Orders?.map((eachOrder,i) => {
              return (
              <div key={i}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                 {eachOrder?.data?.basket?.map((Order)=>(
                  <ProductCard
                  flex={true}
                   product={Order}
                    key={Order.id}
                    />
              

                 ))}
                
              </div>
              
            );
                  })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;