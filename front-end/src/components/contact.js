import { Navbar } from "./navbar"
import style from './assets/styles/contact.module.css'
import { Footer } from "./footer"
export const Contact  =()=> {
  return (
    <div
      className={style.wraper}
      >
   <div className={style.navbar}>
        <Navbar  />
      </div>
      <div
      className={style.hero}>
      <div
      className={style.titles}
      >
        <h1> Contact us</h1>
        <p>Have any question? we'd love to hear from you</p>
      </div>
      <div
      className={style.cards}>
        <div 
        className={style.card1}>
            <div
            className={style.sumiTitle}
            >
              <h1>Press</h1>
              <p>Press Hub: Stay updated with our brand's journey and latest news. Discover stories that shape our identity and innovations.</p>
            </div>
            <div
            className={`${style.bttn1} ${style.btncontainer}`}>
              <a href="/">Visit Press Page</a>

            </div>
        </div>
        <div 
        className={style.card2}>
            <div
            className={style.sumiTitle}
            >
              <h1>Help & Support</h1>
              <p>Get Help & Support: Find answers and assistance here for a seamless experience.</p>
            
            </div>
            <div
            className={`${style.bttn2} ${style.btncontainer}`}>
              <a href="/">Visit Support Page</a>
              <p>SUBMIT A REQUEST</p>


            </div>
        </div>  
        <div 
        className={style.card3}>
            <div
            className={style.sumiTitle}
            >
              <h1>Sales</h1>
              <p>rresistible Sales: Shop exclusive deals and save big on your favorites.</p>
            
            </div>
            <div
            className={`${style.bttn3} ${style.btncontainer}`}>
              <a href="/">Visit Sales Page</a>
            </div>
          
        </div>
        
      </div>
    
      </div>

      <Footer/>
    </div>
  )
}