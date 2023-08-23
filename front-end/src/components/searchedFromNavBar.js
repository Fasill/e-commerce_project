import './assets/styles/products.css';
import { Navbar } from './navbar';
import 'bootstrap/dist/css/bootstrap.css';
import svg from './assets/images/underline.svg'
import { Sidebar } from './sidebar';
import style from './assets/styles/search.module.css'
import { useState,useEffect } from 'react';
import {SearchedProducts }from './productComponents/searchProduct.js'
import { motion } from 'framer-motion';

import {Footer} from './footer.js'


export const Search = () => {
  const [reached,setReached] = useState(false)

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

  return (
    <div className={style.wrapper}>
      
      <Navbar className='navbar' />
      <main className={style.productsMain}>
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
        <div className={style.all_products}>
          <SearchedProducts/>
          
        </div>
      </main>
      <div clasName='footers'> <Footer/></div>

      <div>
      </div>
    </div>
  );
};
