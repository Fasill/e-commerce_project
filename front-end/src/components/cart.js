import style from './assets/styles/cart.module.css';

import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from './navbar.js';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import deleteWhiteSvg from './assets/images/deletWhite.svg';
import deleteBlackSvg from './assets/images/deletRed.svg';
import creditCardSvg from './assets/images/credit-card.svg';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const navigate = useNavigate()

  const [allCart, setAllCart] = useState([]);
  const [counters, setCounters] = useState([]);
  const [bank, setBank] = useState("");
  const [accNo, setAccNo] = useState("");
  const [phoneNumber,setPhoneNumber] = useState("")
  const {paymentURL,setPaymentURL} = useState("")
  const {quantity,setQuantity} = useState(0)

  const handleOpenPaymentGateway = (paymentURL) => {
    window.open(paymentURL, '_blank');
  };

  const schema = yup.object().shape({

    phoneNumber: yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  })
  
  const{register, handleSubmit, formState:{errors}} = useForm({
    resolver:yupResolver(schema)
  });

  
  
  
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('token');
  



  const buy = ()=>{
    const info = {
      amount:total.toString(),
      token:token,
    }
    
    console.log("sending")
    console.log(phoneNumber)

    axios
    .post(`https://book-test-itcl.onrender.com/products/pay`,  {amount:total,
                                                 token:token,
                                                 phoneNumber:phoneNumber
                                                })
    .then((response) => {
      console.log(response);
      console.log("successfully sent");

      // Open the payment gateway URL in a new tab
      handleOpenPaymentGateway(response.data.PaymentURL);

      navigate("/"); // Optionally, navigate to a different page after opening the payment gateway

      fetchCart();
    })
    .catch((error) => {
      console.error(error);
    });
  }
  const onDelete = (product) => {
    const productId = product._id;

    axios
      .delete(`https://book-test-itcl.onrender.com/products/cart/remove/${productId}/${token}`)
      .then((response) => {
        console.log(response);
        fetchCart();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchCart = () => {
    axios
      .post('http://localhost:8080/products/cart', { token: token })
      .then((res) => {
        console.log("getting carts")
        console.log(res.data.cart)
        // setQuantity(res.data.quantity)
        setAllCart(res.data.cart);
        setBank(res.data.bankInfo.enumBanks)
        setAccNo(res.data.bankInfo.accountNumber)

        console.log(res.data.bankInfo)
        const initialCounters = Array(res.data.cart.length).fill(1);
        // console.log("srs",initialCounters)
        setCounters(initialCounters);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    let calculatedTotal = 0;
    allCart.forEach((product, index) => {
      calculatedTotal += product.price * counters[index];
    });
    setTotal(calculatedTotal);
  }, [allCart, counters]);

  const imagePath = process.env.PUBLIC_URL;
// =========================================================
const handleIncrement = (index) => {
  setCounters((prevCounters) => {
    const updatedCounters = [...prevCounters];

    if (updatedCounters[index] < allCart[index].quantity) { // Check if counter is less than the available quantity
      updatedCounters[index] += 1;
    }
    
    return updatedCounters;
  });
};


  const handleDecrement = (index) => {
    setCounters((prevCounters) => {
      const updatedCounters = [...prevCounters];
      if (updatedCounters[index] > 1) {
        updatedCounters[index] -= 1;
      }
      return updatedCounters;
    });
  };

  return (
    <div>
      <Navbar className="navbar" />
      <main className={style.main}>
        <div className={style.left}>
          <div className={style.subNav}>
            <p className={style.product}>PRODUCT</p>
            <p className={style.product}>QTY</p>
            <p className={style.product}>PRICE</p>
            <img className={style.delet1} src={deleteWhiteSvg} alt="delete icon" />
          </div>
          <div className={style.products}>
            {allCart.map((product, index) => (
              <div className={style.product_card} key={product.id}>
                <img className={style.product_image} src={`${imagePath}/images/${product.image.filename}`} alt="/" />
                <p className={style.product_name}>{product.name}</p>
                <div className={style.the_rest}>
                  <div className={style.input_container}>
                    <button onClick={() => handleIncrement(index)} className={style.btnPlus}>+</button>
                    <input type="text" className={style.input_field} value={counters[index]} />
                    <button onClick={() => handleDecrement(index)} className={style.btnMinus}>-</button>
                  </div>
                  <p className={style.product_price}>{(product.price) * (counters[index])}Brr</p>
                  <img className={style.delet2} onClick={() => onDelete(product)} src={deleteBlackSvg} alt="delete icon" />
                </div>
              </div>
            ))}
            <div className={style.discount_total}>
              <div className={style.discount}>
                <p className={style.disTxt}>Discount</p>
                <p className={style.disPrstn}>0%</p>
                <p className={style.disBirr}>0</p>
              </div>
              <div className={style.total}>
                <p className={style.totalTxt}>Total</p>
                <p className={style.totalint}>{total}Brr</p>
              </div>
            </div>
          </div>
        </div>
               

        <div className={style.right}>
              <div className={style.ttitle}>
                  <img className={style.credit_image} src={creditCardSvg} alt="/" />
                  <p className={style.ttitle_txt}>CHECK OUT</p>
                </div>

                <div className={style.bankInfo}>
                <div className={style.bank}>
                    <p className={style.bankKey}>Bank:</p>
                    <p className={style.bankValue}>{bank}</p>
                    </div>
                  <div className={style.accNo}>
                    <p className={style.acckey}>Account:</p>
                    <p className={style.accValue}>{accNo}</p>
                    </div>
                    
                      <div classnName = {style.phoneNumber}>
                        <p className = {style.phone}>Phone Number</p>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">+251</span>
                      </div>
                    <input 
                        className="form-control" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                        type="number" 
                        placeholder='940798785'
                        {...register("password")}
                        value={phoneNumber}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                        />
                    <input onClick = {buy} className="submit-btn" type="submit" value="Buy"/>
                        {/* <p className='error-msg2'>{errors.password?.message}</p> */}
                    </div>
                    </div>
                </div>
        </div>
      </main>
    </div>
  );
};
