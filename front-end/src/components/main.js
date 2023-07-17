import { Navbar } from "./navbar.js"
import { Home } from "./home.js"
import style from "./assets/styles/main.module.css"

export const Main = () => {
  return (
    <div className={style.main}>

      <div className={style.navbar}>
        <Navbar  />
      </div>
      <Home className = {style.home} />
    </div>
  )
}
