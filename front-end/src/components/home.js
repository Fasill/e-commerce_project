import style from './assets/styles/allproducts_side_view.module.css';

import { Navbar } from "./navbar.js"
import svg from './assets/images/underline.svg'
import {Footer} from './footer.js'
import { Contact } from './contact';
import arrow from './assets/images/arrow.svg'
import girls from './assets/images/girls.svg'
import BackgroundSVG from './assets/images/HomeB.svg'
import {AllProducts} from './productComponents/allProducts_slide_side.js'
import './assets/styles/Home.css'
import { useState,useEffect } from 'react'
import { Parallax,ParallaxLayer } from '@react-spring/parallax';

export const Home = ()=>{
  
  return(

  <div className={style.headers}>
      <div className={style.allhome}>
         
         <div className="background-container">
        <img src={BackgroundSVG} alt='background_img' className='background_img' />
      </div>     
    <main>
  
      
      <div class="left-col">

        <h1>Shop Smarter, Not Harder!</h1>
        <p class="subhead">
            Success isn’t always about greatness. It’s about consistency. Consistent
            hard work gains success. Greatness will come.
        </p>
        <div class="cta-btns">
          <a href="/products" class="primary-cta"> <span>Explore Now</span>  <img src={arrow} alt='arrow' /></a>
        </div>
        
      </div>
      <div class="rigt-col">
        
        <img src={girls} alt='girls' />
      </div>
  
  </main>
    <div className = {style.sideTraverse}>
      <div className={style.bigUnderline}>{" "}</div>
      <div className={style.side_title}>
          <h1 className={style.products_tttle}>Featured Products</h1> 
          <img className={style.products_tttle_underline}  src={svg}/>
      </div>
      <div 
        className={style.fog}
      >
        <div className = {style.left}>{" "}</div>
      </div>
      <AllProducts className = {style.item}/>

      {/* </div> */}
  </div>
    <div className={style.const_img}>
      <img src="https://images.pexels.com/photos/102129/pexels-photo-102129.jpeg"/>
      
    </div>
    <div className={style.const_img_Title}>

        <p>LIMITED OFFER</p>
        <h1 className={style.subhead}>
          
        <h1>30% </h1>
            off only this <br/>friday and get <br/> special gift
        </h1>
        <div className={style.cta_btns}>
          <a href="/products" class="primary-cta"> <span>Explore Now</span>  <img src={arrow} alt='arrow' /></a>
        </div>
        
      </div>
      <div className = {`${style.sideTraverse} ${style.sideTraverse2}`}>
      <div className={style.bigUnderline}>{" "}</div>
      <div className={style.side_title}>
          <h1 className={style.products_tttle}>Latest Products
</h1> 
          <img className={style.products_tttle_underline}  src={svg}/>
      </div>
      <div 
        className={style.fog}
      >
        <div className = {style.left}>{" "}</div>
      </div>
      <AllProducts className = {style.item}/>

      {/* </div> */}
  
      <Footer/>

      {/* <div className={style.footer}></div> */}
  </div>
    </div>
  </div>
  
  )
}