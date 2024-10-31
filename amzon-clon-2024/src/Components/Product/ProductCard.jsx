import React from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'
import classes from './Product.module.css'

 function ProductCard({product}) {
  const {image,title, id, rating, price} = product;
  return (
    <div className={'${classes.card_container}'}>
        <a href=''>
            <img src ='' alt=''/>
        </a>
        <div>
        <h3>title</h3>
        <div className={classes.rating}>
            {/*rating */}
            <Rating value={Rating.rate} precison={0.1} />
            {/* count */}
            <small>{Rating.count}</small>
        </div>
        <div>
             {/* price */}
             <CurrencyFormat amount={75.3}/>
        </div>
        <button className={classes.button}>
          add to cart
        </button>
        </div>

    </div>
  )
}
export default ProductCard
