import './assets/styles/products.css';
import axios from 'axios';
import { Navbar } from './navbar';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

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
  const imagePath = process.env.PUBLIC_URL ;

  return (
    <div>
      <div className='background'></div>
      <Navbar className='navbar' />
      <main>
        <div className='products'>
          {allProducts.map((product) => (
             
            // ---------------------
              // <div className="card">
              //   <img src={`${imagePath}/images/${product.image.filename}`} className="card-img-top" alt="Fissure in Sandstone"/>
              //   <div className="card-body">
              //     <div>
              //     <h5 className="card-title">{product.name}</h5>
              //     <p className="card-text">{product.price}</p>
              //     </div>
              //     <a href="#!" className="btn btn-primary custom-btn"><img className="cart-icon" src={`${imagePath}/add-to-cart.svg`}/></a>
              //   </div>
              // </div>
// ====================================================================================
            <div className='product-card'>
              {/* <img  className="product-image" src="https://cdn.anscommerce.com/catalog/brandstore/johnson/17_7_20/Sale.jpg" /> */}

              <img  className="product-image" src={`${imagePath}/images/${product.image.filename}`} alt = "/" />
              <div className='btns-pric'>
              <div>
              <h1 className ="product-title" key={product.id}>{product.name}</h1>
              <p className ="product-price">{product.price} </p>
              </div>
              <button className="mybtn btn btn-primary"><img className="cart-icon" src={`${imagePath}/add-to-cart.svg`}/></button>
            </div>
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
