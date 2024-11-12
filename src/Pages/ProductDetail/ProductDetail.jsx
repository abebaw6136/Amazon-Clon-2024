
import React, { useEffect, useState } from 'react';
import classes from './ProductDetail.module.css';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';

function ProductDetail() {
    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                
                const response = await axios.get(`${productUrl}/products/${productId}`);
               
                if (response.data && response.data.id) {
                    setProduct(response.data);
                } else {
                    setError("Product data is not valid.");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to fetch product details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    return (
        <LayOut>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <p>{error}</p>
            ) : product ? (
                <ProductCard
                    product={product}
                    flex={true}
                    renderDesc={true}
                    renderADD={true}
                />
            ) : (
                <p>Product not found.</p>
            )}
        </LayOut>
    );
}

export default ProductDetail;