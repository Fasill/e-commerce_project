import style from './assets/styles/cart.module.css';
import { Navbar } from './navbar.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import deleteWhiteSvg from './assets/images/deletWhite.svg';
import deleteBlackSvg from './assets/images/deletRed.svg';

export const Cart = () => {
  const [allCart, setAllCart] = useState([]);
  const [counters, setCounters] = useState([]); // Array to store counters for each product
  const token = localStorage.getItem("token");
  console.log('the token is ',token);

  useEffect(() => {
    axios.post('http://localhost:8080/products/cart', { token: token })
      .then(res => {
        console.log(res.data);
        setAllCart(res.data.cart);
        // Initialize counters array with initial values of 1
        const initialCounters = Array(res.data.cart.length).fill(1);
        setCounters(initialCounters);
      });
  }, []);

  const imagePath = process.env.PUBLIC_URL;

  const handleIncrement = (index) => {
    setCounters(prevCounters => {
      const updatedCounters = [...prevCounters];
      updatedCounters[index] += 1;
      return updatedCounters;
    });
  };

  const handleDecrement = (index) => {
    setCounters(prevCounters => {
      const updatedCounters = [...prevCounters];
      if (updatedCounters[index] > 1) {
        updatedCounters[index] -= 1;
      }
      return updatedCounters;
    });
  };

  return (
    <div>
      <Navbar className='navbar' />
      <main>
        <div className={style.left}>
          <div className={style.subNav}>
            <p className={style.product}>PRODUCT</p>
            <p className={style.product}>QTY</p>
            <p className={style.product}>PRICE</p>
            <img className={style.delet1} src={deleteWhiteSvg} alt='delete icon' />
          </div>
          <div className={style.products}>
            {allCart.map((product, index) => (
              <div className={style.product_card}>
                <img className={style.product_image} src={`${imagePath}/images/${product.image.filename}`} alt="/" />
                <p className={style.product_name} key={product.id}>{product.name}</p>
                <div className={style.the_rest}>
                  <div className={style.input_container}>
                    <button onClick={() => handleIncrement(index)} className={style.btn}>+</button>
                    <input type="text" className={style.input_field} value={counters[index]} />
                    <button onClick={() => handleDecrement(index)} className={style.input_field}>-</button>
                  </div>
                  <p className={style.product_price}>{(product.price)*(counters[index])}</p>
                  <a href='/'>
                    <img className={style.delet2} src={deleteBlackSvg} alt='delete icon' />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={style.right}></div>
      </main>
    </div>
  );
};
