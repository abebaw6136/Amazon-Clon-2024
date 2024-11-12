
import React, { useEffect, useState } from 'react';
import classes from './Results.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader'; // Ensure this path is correct



function Results() {
  const { CatagoryName } = useParams();
  const [results, setResults] = useState([]); // State for storing results
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  
 

  useEffect(() => {
    setIsLoading(true); // Start loading
    axios.get(`${productUrl}/products/category/${CatagoryName}`)
    .then((res) => {
      
      setResults(res.data); // Set results to state
      setIsLoading(false); // Stop loading
    }) 
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch products."); // Set error message
        setIsLoading(false); // Stop loading
      });
  }, [CatagoryName]); // Adding catagoryName as a dependency

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category: {CatagoryName}</p>
        <hr />
        {isLoading ? (
          <Loader /> // Correct loader component syntax
        ) : error ? (
          <p>{error}</p> // Display error message if there is an error
        ) : (
          <div className={classes.products_container}>
            {results.length > 0 ? ( // Check if results exist
              results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  renderDesc={false}
                  renderAdd={true}
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