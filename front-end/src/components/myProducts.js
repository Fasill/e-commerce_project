import './assets/styles/products.css';
import { Navbar } from './navbar';
import 'bootstrap/dist/css/bootstrap.css';
import svg from './assets/images/underline.svg'
import { Sidebar } from './sidebar';
import {MyProductTravese} from './productComponents/myProducts.js'

// import { useState,useEffect } from 'react';

export const MyProducts = () => {

  // const token = localStorage.getItem('token')




  

  return (
    // <h1>h</h1>
    <div className='all_page'>
      
      <div className='background'></div>
      <Navbar className='navbar' />
      <main className='productsMain'>
        <div className="sidebar">

          <Sidebar/>
          </div>
        <div className='all_products'>
          {/* <h1>{value}</h1> */}
        <h1 className='products_tttle'>My Products</h1>
        <img className='products_tttle_underline' src={svg}/>
       
       {/* {{value} ? <img className='products_tttle_underline' src={svg}/>} */}
          {<MyProductTravese/> }
          
        </div>
      </main>
      <div>
        {/* Additional content */}
      </div>
    </div>
  );
};
