
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import ProductCard from './ProductCard'; 
import classes from './Product.module.css'; 

function Product() {
    const [products, setProducts] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((res) => {
                setProducts(res.data); // Set products data
                setLoading(false); // Set loading to false
            })
            .catch((err) => {
                console.log(err);
                setError("Failed to fetch products."); // Set error message
                setLoading(false); // Set loading to false
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Loading indicator
    }

    if (error) {
        return <p>{error}</p>; // Error message
    }

    return (
        <section className={classes.products_container}>
            {
            products.map(singleProduct => (
                 <ProductCard renderADD={true}product={singleProduct} key={singleProduct.id} />
            ))}

        </section>
    );
}

export default Product;