import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockProducts } from './mockProducts';
import ProductCard from './ProductCard';
import classes from './Product.module.css';

function Product() {
    const { categoryName } = useParams();
    const [products, setProducts ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        if (categoryName) {
            const filtered = mockProducts.filter(item => 
                item.category && item.category.toLowerCase() === categoryName.toLowerCase()
            );
            setProducts(filtered);
        } else {
            setProducts(mockProducts);
        }
        
        setLoading(false);
    }, [categoryName]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    
    if (!products.length) {
      return (
        <section>
          <h1 style={{ padding: "20px" }}>
            {categoryName ? `Results for: ${categoryName}` : "All Products"}
          </h1>
          <p style={{ padding: "20px" }}>No products found for this category.</p>
        </section>
      );
    }

    return (
      <section>
        <h1 style={{ padding: "20px" }}>
          {categoryName ? `Results for: ${categoryName}` : "All Products"}
        </h1>
        <div className={classes.grid_container}>
          {products.map(singleProduct => (
            <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true} />
          ))}
        </div>
      </section>
    );
}

export default Product;
