import './assets/styles/signin.css'
import BackgroundSVG from './assets/images/signup_backround.svg'

import { Navbar } from './navbar'
export const Signin = ()=>{

  return(
    <div>
            <div className="background-container">
        <img src={BackgroundSVG} alt='background_img' className='background_img' />
      </div> 
      <Navbar/>

      <main>

        <div className='form-card'>
  
          <form>
          <ul className='LS'>
          <li><a href="/signin" >Login</a></li>          
        <li><a href="/signin">signup</a></li>   
        </ul>
            <input className="form-input" type="text" placeholder='Email...'/>
            <input className="form-input" type="password" placeholder='Password...'/>
            <input className="submit-btn" type="submit" value="LOGIN"/>
          </form>
        </div>
      </main>
    </div>
  )
}