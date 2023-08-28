import './assets/styles/Navbar.css';
import logo from './assets/images/logo.svg'
import magnifier from './assets/images/magnifier.svg'
import cart from './assets/images/cart.svg'
import registerLogo from './assets/images/register.svg'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import listicon from './assets/images/list.svg'
import { DropDown } from './dropDown';
export const Navbar = ()=>{
  const goto = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false);
  const [dropClicked,setDropClicked] = useState(false)
  const [inputValue,setInputValue] = useState("")
  const [active,setActive] = useState("")
  const handleInputChange  = (event)=>{
    setInputValue(event.target.value)



  }
  const navClicked = (val)=>{
    localStorage.setItem("active",val)
  }
  const navigate = ()=>{
    goto("/search")
  }
  const handleSubmit= ()=>{

    localStorage.setItem('value',inputValue)
    setInputValue('')
  }
  const drop = ()=>{
    setDropClicked(!dropClicked)
  }
  useEffect(()=>{

    const t = localStorage.getItem("active")

    setActive(t)

  },[])
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
     <div
      className="all"
     >
  <header>
    <a className="headerLogo" href="/"><img src={logo} alt="E-SHOP logo"/></a>
    <nav className="defaultNav">
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
        <li><a 
        className={active === "home" ? "home1" : "n"}
        onClick={()=>navClicked("home")}
        href="/" >Home</a></li>          
        <li><a 
        className={active === "products" ? "products1" : "n"}

        onClick={()=>navClicked("products")}

        href="/products">PRODUCTS</a></li>          
        <li><a 
        onClick={()=>navClicked("about")}
        className={active === "about" ? "about1" : "n"}

        
        href="/">ABOUT</a></li>          
        <li><a  
        onClick={()=>navClicked("contact")}
        className={active === "contact" ? "contact1" : "n"}

        href="/contact">CONTACT</a></li>          
        <li><a 
        onClick={()=>navClicked("cart")}
        className={active === "cart" ? "cart1" : "n"}


        href="/cart"><img className='cart' src={cart} alt="CART "/></a></li>    
        {/* {loggedIn?( */}
          <li><a
        onClick={()=>navClicked("profile")}
        className={active === "profile" ? "profile1" : "n"}


          href={loggedIn?`/profile`:`/signin`}><img className='regist'  src={registerLogo} alt="register"/></a></li>
        {/* // ):<li><a  */}
        {/* // href="/signin"><img className='regist'  src={registerLogo} alt="register"/></a></li>}       */}
      </ul>
    </nav>
    {/* <div
      className="dropNav"
    > */}
      <a onClick = {drop}  className="dropdownlist"><img  src = {listicon} /></a>
      {/* <DropDown dropClicked = {dropClicked} /> */}

  

    {/* </div> */}

  </header>

  </div>
  )
}