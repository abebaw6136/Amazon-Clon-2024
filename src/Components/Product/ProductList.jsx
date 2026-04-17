import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../Api/axios';
import ProductCard from './ProductCard';
import Loader from '../Loader/Loader';
import classes from './Product.module.css'; // Reuse grid styles

function ProductList({ title = 'Featured Products', limit = 12 }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    axiosInstance.get('/products')
      .then((res) => {
        setProducts(res.data.slice(0, limit) || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again.');
        setIsLoading(false);
      });
  }, [limit]);

  return (
    <section>
      <h2 style={{ padding: '20px 30px', margin: 0 }}>{title}</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p style={{ padding: '30px', textAlign: 'center' }}>{error}</p>
      ) : (
        <div className={classes.products_grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              renderDesc={true}
renderADD={true}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
