import './assets/styles/signin.css'
import BackgroundSVG from './assets/images/signup_backround.svg'
import { Navbar } from './navbar'
export const RegistrationHome= ()=>{
 

  return(
    <div>
            <div className="background-container">
        <img src={BackgroundSVG} alt='background_img' className='background_img' />
      </div> 
      <Navbar/>

 
    </div>
  )
}