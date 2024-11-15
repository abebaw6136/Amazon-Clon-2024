
import React from 'react';
import classes from './Category.module.css';
import { Link } from 'react-router-dom';

function CategoryCard({ data }) {
    

    return (
        <div className={classes.category}>
            {/* Corrected Link: Use backticks for string interpolation */}
            <Link to={`/category/${data.name}`}>

                <span>
                    <h2>{data.title}</h2>
                </span>
                <img 
                    className={classes.category_image} 
                    src={data.imgLink} 
                    alt={data.title} 
                />
                <p>Shop Now</p>
            </Link>
        </div>
    );
}

export default CategoryCard;