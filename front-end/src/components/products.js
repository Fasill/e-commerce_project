import './assets/styles/products.css';
import { Navbar } from './navbar';
import 'bootstrap/dist/css/bootstrap.css';
import svg from './assets/images/underline.svg'
import { Sidebar } from './sidebar';
import {AllProducts} from './productComponents/allProducts.js'
import {SearchedProducts} from './productComponents/searchProduct.js'

import { useState,useEffect } from 'react';

export const Products = () => {

  // const token = localStorage.getItem('token')

  const [value,setValue] = useState("All Products")

  useEffect(() => {
    setValue(localStorage.getItem("value"))

  }, []);

  

  return (
    <div className='all_page'>
      <div className='background'></div>
      <Navbar className='navbar' />
      <main className='productsMain'>
        <div className="sidebar">
          <Sidebar/>
          </div>
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
    </div>
  );
};
