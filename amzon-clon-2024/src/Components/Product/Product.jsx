
{/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function Product() {
    const [products, setProducts] = useState();
    
    useEffect(() => {
        
           
                 axios.get ("https://fakestoreapi.com/products");
                 then((res) =>{
                    setProducts(res.data)

                 }) 
                 .catch(err) {
                    console.loge(err)
                   
                }
               
            },   
          
     []);

    
    return (
        <section>
            {products.map(singleProduct => (
                <ProductCard product={singleProduct} key={singleProduct.id} />
            ))}
        </section>
    );
}

export default Product; */}



//import React, { useEffect, useState } from 'react';
import React, {useEffect,useState} from 'react';
//import axios from 'axios';
import axios from 'axios'

//import ProductCard from './ProductCard';
import ProductCard from './ProductCard'

function Product() {
    const [products, setProducts] = useState([]); // Initialize as an empty array

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((res) => {
                setProducts(res.data); // Ensure there's a semicolon here
            })
            .catch((err) => {
                console.log(err); // Fixed typo here
            });
    }, []);

    return (
        <section>
            {products.map(singleProduct => (
                <ProductCard product={singleProduct} key={singleProduct.id} />
            ))}
        </section>
    );
}

export default Product;





