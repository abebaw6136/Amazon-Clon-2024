import React, { useEffect, useState } from 'react';
import classes from './Results.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../Api/axios';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader'; 

function Results() {
  const { categoryName } = useParams();
  const location = useLocation();
  const [results, setResults] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('Results');

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (searchQuery) {
      setTitle(`Search Results for "${searchQuery}"`);
      axiosInstance.get('/products')
        .then((res) => {
          const allProducts = res.data || [];
          const filteredProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setResults(filteredProducts);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch products.");
          setResults([]);
          setIsLoading(false);
        });
    } else if (categoryName) {
      setTitle(`Category: ${categoryName}`);
      axiosInstance.get(`/products/category/${encodeURIComponent(categoryName)}`)
        .then((res) => {
          setResults(res.data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          axiosInstance.get('/products')
            .then((res) => {
              const allProducts = res.data || [];
              const filteredProducts = allProducts.filter(product =>
                product.category.toLowerCase() === categoryName.toLowerCase()
              );
              setResults(filteredProducts);
              setIsLoading(false);
            })
            .catch((fallbackErr) => {
              console.error(fallbackErr);
              setError("Failed to fetch products.");
              setResults([]);
              setIsLoading(false);
            });
        });
    } else {
      setTitle('All Products');
      axiosInstance.get('/products')
        .then((res) => {
          setResults(res.data || []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch products.");
          setResults([]);
          setIsLoading(false);
        });
    }
  }, [categoryName, searchQuery]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>{title}</h1>
        <p style={{ padding: "30px" }}>Category: {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader /> 
        ) : error ? (
          <p>{error}</p> 
        ) : (
          <div className={classes.products_grid}>
            {Array.isArray(results) && results.length > 0 ? (
              results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderDesc={false}
                  renderAdd={true}
                />
              ))
            ) : (
              <p>No products found in this category.</p> 
            )}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
