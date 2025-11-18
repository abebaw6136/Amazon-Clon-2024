
import React from 'react';
import classes from './Catagory.module.css'; // Ensure the import path is correct
import { Link } from 'react-router-dom';

function CatagoryCard({ data }) {
    return (
        <div className={classes.catagory}>
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

export default CatagoryCard;
