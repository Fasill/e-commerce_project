import style from '../assets/styles/allproducts_side_view.module.css';
import '../assets/styles/products.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export const AllProducts = () => {

  const [allProducts, setAllProducts] = useState([]);
  const token = localStorage.getItem('token')

  const addToCart = (product) => {
    console.log("clicked")
    const cartItem = {
      productId: product._id,
      quantity: 1,
      token:token
      
    };
    console.log(cartItem)

    axios.post('https://book-test-itcl.onrender.com/products/cart/add', cartItem)
      .then(res => {
        console.log(res.data)
        // Handle the response if needed
      })
      .catch(error => {
        console.log(error)
        // Handle any errors that occurred during the request
      });
  }



  useEffect(() => {
    axios.get('https://book-test-itcl.onrender.com/products')
      .then(res => {
        console.log(res.data.allinfo);
        setAllProducts(res.data.allinfo);
      });
  }, []);
  const imagePath = process.env.PUBLIC_URL ;

  return (

        <div className={style.products}>
          {allProducts.map((product) => (

            <div className={style.product_card}>
              {/* <img  className="product-image" src="https://cdn.anscommerce.com/catalog/brandstore/johnson/17_7_20/Sale.jpg" /> */}

              <img  className="product-image" src={`${imagePath}/images/${product.image.filename}`} alt = "/" />
              <div className='btns-pric'>
              <div>
              <h1 className ="product-title" key={product.id}>{product.name}</h1>
              <p className ="product-price">{product.price} </p>
              </div>
              <button onClick={() => addToCart(product) } className="mybtn btn btn-primary">
                  <img className="cart-icon" src={`${imagePath}/add-to-cart.svg`} alt="Add to Cart" />
                </button>
            </div>
            </div>
          ))}
        </div>
        
  );
};
