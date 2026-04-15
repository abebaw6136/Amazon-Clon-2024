import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './ProductCard.module.css';

function ProductCard({ product, renderDesc = false, renderADD = true, flex = false }) {
  const { id, title, image, price, description, rating } = product;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
  };

  return (
    <div className={`${classes.card} ${flex ? classes.flex_row : ''}`}>
      <Link to={`/products/${id}`}>
        <div className={classes.image_container}>
          <img 
            src={image} 
            alt={title}
            onError={handleImageError}
            className={classes.product_image}
          />
        </div>
      </Link>
      
      <div className={classes.details}>
        <Link to={`/products/${id}`}>
          <h3 className={classes.title}>{title}</h3>
        </Link>
        
        {renderDesc && description && (
          <p className={classes.description}>
            {description.substring(0, 100)}...
          </p>
        )}
        
        <div className={classes.price_rating}>
          <CurrencyFormat amount={price} className={classes.price} />
          {rating && (
            <div className={classes.rating}>
              {[...Array(rating)].map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          )}
        </div>
        
        {renderADD && (
          <button className={classes.add_button}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
