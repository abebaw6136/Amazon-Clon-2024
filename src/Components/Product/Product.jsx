import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // ← Fixed: useParams instead of destructuring
import { db } from '../../Utility/firebase';
import { doc, getDoc } from 'firebase/firestore';
import LayOut from '../../Components/LayOut/LayOut';
import classes from './Product.module.css';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';

function Product() {
  const { id } = useParams();  // ← Fixed: Get id from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <LayOut>
        <div className={classes.loading}>Loading...</div>
      </LayOut>
    );
  }

  if (error) {
    return (
      <LayOut>
        <div className={classes.error}>Error: {error}</div>
      </LayOut>
    );
  }

  if (!product) {
    return (
      <LayOut>
        <div className={classes.not_found}>Product not found</div>
      </LayOut>
    );
  }

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
  };

  return (
    <LayOut>
      <div className={classes.product_container}>
        <div className={classes.product_image}>
          <img 
            src={product.image} 
            alt={product.title}
            onError={handleImageError}
          />
        </div>
        
        <div className={classes.product_details}>
          <h1 className={classes.product_title}>{product.title}</h1>
          
          {product.rating && (
            <div className={classes.product_rating}>
              {[...Array(product.rating)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          )}
          
          <div className={classes.product_price}>
            <CurrencyFormat amount={product.price} />
          </div>
          
          <p className={classes.product_description}>
            {product.description || 'No description available'}
          </p>
          
          <button className={classes.add_to_cart_btn}>
            Add to Cart
          </button>
        </div>
      </div>
    </LayOut>
  );
}

export default Product;