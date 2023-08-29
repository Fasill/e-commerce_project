import './assets/styles/Navbar.css';
import logo from './assets/images/logo.svg'
import magnifier from './assets/images/magnifier.svg'
import cart from './assets/images/cart.svg'
import registerLogo from './assets/images/register.svg'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import listicon from './assets/images/list.svg'


export const DropDown  = ({dropClicked})=>{



  const goto = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false);
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
      axios.post('https://book-test-itcl.onrender.com/verify', {
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


const isDrop =dropClicked ?"dropNav2":"dontdrop"

return(
  <div className="all2">
<nav className={isDrop}>
      <ul>
      <li >
      <form onSubmit={handleSubmit} className="search-bar2">
      <div className="input-with-image">
        <input
          type="text"
          placeholder="Search products"
          className="search-input2"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={navigate} className="search-bu2">
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
    </div>
)}