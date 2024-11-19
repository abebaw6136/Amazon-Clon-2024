import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './Product.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { type } from '../../Utility/action.type';


function ProductCard({ product, flex, renderDesc, renderADD }) {
    const { image, title, id, rating, price, description } = product; // Consistent casing
    const [state, dispatch] = useContext(DataContext);

    function addToCart() {
        const existingItem = state.basket.find(item => item.id === id);
        if (existingItem) {
            // Optionally, you can update the quantity here
        } else {
            dispatch({
                type: type.ADD_TO_BASKET,
                item: {
                    image, title, id, rating, price, description
                },
            });
        }
    }

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
                {

               renderADD && <button className={classes.button} onClick={addToCart}>
                    Add to Cart
                </button>
                }
            </div>
        </div>
    );
}

export default ProductCard;