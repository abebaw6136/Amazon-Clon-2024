
import React, { useEffect, useState } from 'react';
import classes from './Results.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader'; // Ensure this path is correct



function Results() {
  const { CategoryName } = useParams();
  const location = useLocation();
  const [results, setResults] = useState([]); // State for storing results
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('Results');

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q');

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    if (searchQuery) {
      // Search by query
      setTitle(`Search Results for "${searchQuery}"`);
      axios.get(`${productUrl}/products`)
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
    } else if (CategoryName) {
      // Category filter
      setTitle(`Category: ${CategoryName}`);
      axios.get(`${productUrl}/products/category/${encodeURIComponent(CategoryName)}`)
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
    } else {
      // No query or category, show all products
      setTitle('All Products');
      axios.get(`${productUrl}/products`)
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
  }, [CategoryName, searchQuery]);


  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>{title}</h1>
        <hr />
        {isLoading ? (
          <Loader /> // Correct loader component syntax
        ) : error ? (
          <p>{error}</p> // Display error message if there is an error
        ) : (
          <div className={classes.products_container}>
            {Array.isArray(results) && results.length > 0 ? ( // Check if results exist
              results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderDesc={false}
                  renderADD={true}
                />
              ))
            ) : (
              <p>No products found in this category.</p> // Message for no results
            )}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
