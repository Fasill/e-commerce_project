import arrow from './assets/images/arrow.svg'
import girls from './assets/images/girls.svg'
import BackgroundSVG from './assets/images/HomeB.svg'

import './assets/styles/Home.css'
export const Home = ()=>{
  return(
    <div>
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
          <a href="/" class="primary-cta"> <span>Explore Now</span>  <img src={arrow} alt='arrow' /></a>
        </div>
        
      </div>
      <div class="rigt-col">
        
        <img src={girls} alt='girls' />
      </div>
  
  </main>
  </div>
  )
}