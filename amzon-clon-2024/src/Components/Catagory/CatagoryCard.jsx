import React from 'react';
import classes from './Catagory.module.css'; // Ensure the import path is correct

function CatagoryCard({ data }) {
    return (
        <div className={classes.catagory}>
            <a href="#">
                <span>
                    <h2>{data.title}</h2>
                </span>
                <img className={classes.category_image} src={data.imgLink} alt={data.title} />
                <p>Shop Now</p>
            </a>
        </div>
    );
}

export default CatagoryCard;