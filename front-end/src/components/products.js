import './assets/styles/products.css';
import axios from 'axios';
import { Navbar } from './navbar';
import { useEffect, useState } from 'react';
// import '../../../back-end/product_images/'
export const Products = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(res => {
        console.log(res.data);
        setAllProducts(res.data.allinfo);
      });
  }, []);

  return (
    <div>
      <div className='background'></div>
      <Navbar className='navbar' />
      <main>
        <div className='products'>
          {allProducts.map((product) => (

            <div className='product-card'>
              <div className='img'>
              {/* <img  className="product-image" src="https://cdn.anscommerce.com/catalog/brandstore/johnson/17_7_20/Sale.jpg" /> */}

              {/* <img  className="product-image" src={`/home/fasil/Desktop/my_cource/socialMid/e-commerce/publice/images/${product.image.filename}`} /> */}
              </div>
              <h1 className ="product-title" key={product.id}>{product.name}</h1>
              <p className ="product-price">{product.price} </p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
      <div>
        {/* Additional content */}
      </div>
    </div>
  );
};
