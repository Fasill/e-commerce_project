import style from './assets/styles/cart.module.css';
import { Navbar } from './navbar.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import deleteWhiteSvg from './assets/images/deletWhite.svg';
import deleteBlackSvg from './assets/images/deletRed.svg';

export const Cart = () => {
  const [allCart, setAllCart] = useState([]);
  const [counter,setCounter]  = useState(0)
  const token = localStorage.getItem("token")
  console.log('the token is ',token)
  // const to
  useEffect(() => {
    axios.post('http://localhost:8080/products/cart',{token:token})
      .then(res => {
        console.log(res.data);
        setAllCart(res.data.cart);
      });
  }, []);

  const imagePath = process.env.PUBLIC_URL;

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
            {allCart.map((product) => (
              <div className={style.product_card}>
                <img className={style.product_image} src={`${imagePath}/images/${product.image.filename}`} alt="/" />
                <p  className={style.product_name} key={product.id}>{product.name}</p>
               <div className={style.the_rest}>
                <div className={style.input_container}>
                  <button onClick={()=>{setCounter(counter+1)}} className={style.btn}>+</button>
                  <input type="text" className={style.input_field} value={counter} />
                  <button onClick={()=>{setCounter(counter+1)}} className={style.input_field}>-</button>
                </div>
                <p className={style.product_price}>{product.price}</p>
                <a href='/'>
                  <img className={style.delet2} src={deleteBlackSvg} alt='delete icon' />
                </a>
                {/* <hr className={style.separator} /> */}
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
