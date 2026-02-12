import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../Api/axios';
import { productUrl } from '../../Api/endPoints';
import LayOut from '../../Components/LayOut/LayOut';
import ProductCard from '../../Components/Product/ProductCard';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch product.");
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <LayOut>
        <p>Loading...</p>
      </LayOut>
    );
  }

  if (error) {
    return (
      <LayOut>
        <p>{error}</p>
      </LayOut>
    );
  }

  return (
    <LayOut>
      <ProductCard product={product} renderAdd={true} flex={false} />
    </LayOut>
  );
}

export default ProductDetail;
