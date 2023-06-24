import './assets/styles/Navbar.css';
import logo from './assets/images/logo.svg'
import cart from './assets/images/cart.svg'
import registerLogo from './assets/images/register.svg'
// import searchIcon from './assets/images/searchIcon.svg'
export const Navbar = ()=>{
  const handleSubmit  = ()=>{

  }
  const searchQuery = ()=>{

  }
  const handleInputChange= ()=>{

  }
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
        <li><a href="/">PRODUCTS</a></li>          
        <li><a href="/">ABOUT</a></li>          
        <li><a href="/">CONTACT</a></li>          
        <li><a href="/"><img className='cart' src={cart} alt="CART "/></a></li>          
        <li><a href="/signin"><img className='regist'  src={registerLogo} alt="register"/></a></li> 




      </ul>
    </nav>
  </header>
  </div>
  )
}