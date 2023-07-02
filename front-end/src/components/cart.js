import style from './assets/styles/cart.module.css'
import {Navbar} from './navbar.js'
import deleteWhiteSvg from './assets/images/deletWhite.svg'
export const Cart=()=>{

  return(
    <div>
    <Navbar className='navbar' />
      <main>
        <div className = {style.left}>
          <div className={style.subNav}>
            <p className={style.product}>PRODUCT</p>
            <p className={style.product}>QTY</p>
            <p className={style.product}>PRICE</p>
            <img className={style.delet1} src={deleteWhiteSvg} alt = 'delete icon'/>
            </div>    
        </div>
        <div className = {style.right}>
        </div>
      </main>
    </div>
  )
}