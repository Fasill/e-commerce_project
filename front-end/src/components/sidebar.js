import svg from './assets/images/underline.svg'
import axios from 'axios'
// import '../../../back-end/product_images/'
export const Sidebar = () => {
  const traverseAll = () => {
    localStorage.removeItem("value")
  }
  const search = (value)=>{
    console.log(value)
    localStorage.setItem("value",value)
    axios
      .post("http://localhost:8080/products",{value:value})
      .then(res=>{
        console.log(res.data)

      })

  }

  return (

              <ul >
                  <li>
                    <h1>Categories</h1>
                    <img className='products_tttle_underline' src={svg}/>
                  
                  </li>
                  <li><a href="/products" onClick={()=>traverseAll("all")}>All</a></li>

                  <li><a href="/products" onClick={()=>search("clothes")}>Clothes</a></li>
                  <li><a href="/products" onClick={()=>search("watches")}>Watches</a></li>
                  <li><a href="/products" onClick={()=>search("bags")}>Bags</a></li>
                  <li><a href="/products" onClick={()=>search("glasses")}>Glasses</a></li>
                  <li><a href="/products" onClick={()=>search("cosmetics")}>Cosmetics</a></li>
                  <li><a href="/products" onClick={()=>search("perfume")}>Perfume</a></li>
              </ul>
        
  );
};
