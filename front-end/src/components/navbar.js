import './assets/styles/Navbar.css';
import logo from './assets/images/logo.svg'
import cart from './assets/images/cart.svg'
import registerLogo from './assets/images/register.svg'
import { useState,useEffect } from 'react';
import axios from 'axios'
export const Navbar = ()=>{
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit  = ()=>{

  }
  const searchQuery = ()=>{

  }
  const handleInputChange= ()=>{

  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("rendering");
    if (!token) {
      setLoggedIn(false)
    } else {
      axios.post('http://localhost:8080/verify', {
        headers: {
          token:token
        }
      })
        .then(response => {
          setLoggedIn(true)

          // Token is verified, continue with protected content
          console.log(response.data);
        })
        .catch(error => {
          // Token is invalid or expired, redirect to login
          setLoggedIn(false)
        });
    }
  }, []);



  return(    
  <div>
  <header>
    <a href="/"><img src={logo} alt="E-SHOP logo"/></a>
    <nav>
      <ul>
      <li >
        <form onSubmit={handleSubmit} className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder= "search products" 
            className="search-input"
            
          />
        </form>
      </li>
        <li><a href="/" >Home</a></li>          
        <li><a href="/products">PRODUCTS</a></li>          
        <li><a href="/">ABOUT</a></li>          
        <li><a href="/">CONTACT</a></li>          
        <li><a href="/"><img className='cart' src={cart} alt="CART "/></a></li>    
        {loggedIn?(
          <li><a href="/profile"><img className='regist'  src={registerLogo} alt="register"/></a></li>
        ):<li><a href="/signin"><img className='regist'  src={registerLogo} alt="register"/></a></li>}      
         




      </ul>
    </nav>
  </header>
  </div>
  )
}