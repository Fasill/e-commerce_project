import style from './assets/styles/footer.module.css'
import logo from './assets/images/logo.svg'
import instagram from './assets/images/instagram.svg'
import twitter from './assets/images/twitter.svg'
import youtube from './assets/images/youtube.svg'
import linkedin from './assets/images/linkedin.svg'
import facebook from './assets/images/facebook.svg'



export const Footer = ()=>{
  return (
    <div 
      className={style.wholeFooter}

    >
      <div
        className={style.top}
      > 
        <a href="/"><img src={logo} alt="E-SHOP logo"/></a>
      </div>
      <div
        className={style.middle}
      > 
      <div
        className={style.middleClass} 
      >
        <div
        className={style.middleContern1}
        
        >
          <ul>
            <li><a href = "/">Clothes</a></li>
            <li><a href = "/">Watches</a></li>
            <li><a href = "/">Bags</a></li>
            <li><a href = "/">Glasses</a></li>
            <li><a href = "/">Cosmetics</a></li>
            <li><a href = "/">Perfume</a></li>
          </ul>
        </div>
              <div
        className={style.middleContern2}
        
        >
                    <ul>
            <li><a href = "/">Home</a></li>
            <li><a href = "/">Products</a></li>
            <li><a href = "/">about</a></li>
            <li><a href = "/">Contact</a></li>
            <li><a href = "/">Profile</a></li>
            <li><a href = "/">Cart</a></li>

          </ul>
        </div>
        </div>
              <div
        className={style.middleContern3}
        >
             <ul>
            <li><a><img src = {linkedin}/></a></li>
            <li><a><img src = {twitter}/></a></li>
            <li><a><img src = {facebook}/></a></li>
            <li><a><img src = {instagram}/></a></li>
            <li><a><img src = {youtube}/></a></li>

          </ul>

        </div>
      </div>
      <div
        className={style.bottom}
      > 
         <ul>
            <li><a href = "/">Website Terms</a></li>
            <li>|</li>
            <li><a href = "/">Privecy and Policy</a></li>
            <li>|</li>
            <li><a href = "/">About</a></li>
            <li>|</li>
            <li><a href = "/">FAQ</a></li>
            <li>|</li>
            <li><a href = "/">Perofile</a></li>

          </ul>
          <div>
         <p> &copy; 2023 Your E-Shop Name. All rights reserved.</p>
          </div>
      </div>
      {' '}
    </div>
  )
}