import './assets/styles/products.css';
import { Navbar } from './navbar';
import 'bootstrap/dist/css/bootstrap.css';
import svg from './assets/images/underline.svg'
import { Sidebar } from './sidebar';
import {AllProducts} from './productComponents/allProducts.js'
import {SearchedProducts} from './productComponents/searchProduct.js'
import {Footer} from './footer.js'
import { motion } from 'framer-motion';


import { useState,useEffect } from 'react';

export const Products = () => {

  // const token = localStorage.getItem('token')

  const [value,setValue] = useState("All Products")
  const [reached,setReached] = useState(false)

  useEffect(() => {
    setValue(localStorage.getItem("value"))

  }, []);
//  =====================
// check if crolling hit the bottom 
useEffect(() => {
  const handleScroll = () => {
    // Calculate the scroll position
    const scrollY = window.scrollY || window.pageYOffset;

    // Calculate the height of the content and the viewport
    const contentHeight = document.body.clientHeight;
    const viewportHeight = window.innerHeight;

    // Calculate the distance from the bottom of the content
    const distanceFromBottom = contentHeight - scrollY - viewportHeight;

    // Check if you've reached the bottom
    if (distanceFromBottom <250) {
      setReached(true);
      console.log("Reached the bottom of the page!");
      // You can trigger actions here
    }
    else{ setReached(false);}
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
// =================

  

  return (
    <div className='all_page'>
      <div className='background'></div>
      <Navbar className='navbar' />
      <main className='productsMain'>
        <motion.div 
        className="sidebar"
        // initial = { {x :20}}
        animate={{
          x: reached?-200:0,
          transition: { duration: 1 }, // Move down in 1 second
        }}
        >
          <Sidebar/>
          </motion.div>
        <div className='all_products'>
          {/* <h1>{value}</h1> */}
        { value?<h1 className='products_tttle'>{value}</h1>  : <h1 className='products_tttle'>All Products</h1>}
        { value?<img className='search_tttle_underline' src={svg}/> : <img className='products_tttle_underline' src={svg}/>}
       
       {/* {{value} ? <img className='products_tttle_underline' src={svg}/>} */}
          {value? <SearchedProducts/>:<AllProducts/> }
          
        </div>
      </main>
      <div>
        {/* Additional content */}
      </div>
      <div clasName='footers'> <Footer/></div>
     

    </div>
  );
};
