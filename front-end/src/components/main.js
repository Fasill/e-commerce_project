import { Navbar } from "./navbar.js"
import { Home } from "./home.js"
import "./assets/styles/main.css"

export const Main = () => {
  return (
    <div className="main">

      <Navbar className="navbar" />
      <Home />
    </div>
  )
}
