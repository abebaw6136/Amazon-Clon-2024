import React from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';

function ProductCard({ product,flex,renderDesc }) {
    const { image, title,id, rating, price,description  } = product;
    

    return (
        <div className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`}>
            <Link to={`/products/${product.id}`}>
                <img src={image} alt={title} className={classes.img_container} />
            </Link>
            <div className={classes.card_info}>
                <h3 className={classes.product_title}>{title}</h3>
                {renderDesc && <div style={{ maxWidth: '500px' }}>{description}</div>}
                <div className={classes.rating}>
                    {/* Rating */}
                    <Rating value={rating.rate} precision={0.1} readOnly />
                    {/* Count */}
                    <small>{rating.count}</small>
                </div>
                <div>
                    {/* Price */}
                    <CurrencyFormat amount={price} />
                </div>
                <button className={classes.button}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;