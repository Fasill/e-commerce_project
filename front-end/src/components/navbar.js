import './assets/styles/Navbar.css';
import logo from './assets/images/logo.svg'
import magnifier from './assets/images/magnifier.svg'
import cart from './assets/images/cart.svg'
import registerLogo from './assets/images/register.svg'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export const Navbar = ()=>{
  const goto = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false);
  const [contactClicked,setcontactClicked] = useState(false)
  const [inputValue,setInputValue] = useState("")

  const handleInputChange  = (event)=>{
    setInputValue(event.target.value)


  }
  const navigate = ()=>{
    goto("/search")
  }
  const handleSubmit= ()=>{

    localStorage.setItem('value',inputValue)
    setInputValue('')
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
  <header>
    <a className="headerLogo" href="/"><img src={logo} alt="E-SHOP logo"/></a>
    <nav>
      <ul>
      <li >
      <form onSubmit={handleSubmit} className="search-bar">
      <div className="input-with-image">
        <input
          type="text"
          placeholder="Search products"
          className="search-input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={navigate} className="search-bu">
          <img src={magnifier} alt="Magnifier Icon" />
        </button>
      </div>
    </form>
      </li>
        <li><a href="/" >Home</a></li>          
        <li><a href="/products">PRODUCTS</a></li>          
        <li><a href="/">ABOUT</a></li>          
        <li><a  href="/contact">CONTACT</a></li>          
        <li><a href="/cart"><img className='cart' src={cart} alt="CART "/></a></li>    
        {loggedIn?(
          <li><a href="/profile"><img className='regist'  src={registerLogo} alt="register"/></a></li>
        ):<li><a href="/signin"><img className='regist'  src={registerLogo} alt="register"/></a></li>}      
      </ul>
    </nav>
  </header>
  )
}