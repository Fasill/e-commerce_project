import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('your-api-endpoint-url');
        setProducts(response.data.allinfo);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem
          key={product._id}
          name={product.name}
          price={product.price}
          image={product.image.filename}
        />
      ))}
    </div>
  );
};

