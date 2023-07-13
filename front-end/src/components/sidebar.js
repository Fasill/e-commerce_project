import svg from './assets/images/underline.svg'
import axios from 'axios'
// import '../../../back-end/product_images/'
export const Sidebar = () => {

  const search = (value)=>{
    console.log(value)
    axios
      .post("http://localhost:8080/products",{value:value})
      

  }

  return (

              <ul >
                  <li>
                    <h1>Categories</h1>
                    <img className='products_tttle_underline' src={svg}/>
                  
                  </li>
                  <li><a href="#" onClick={()=>search("clothes")}>Clothes</a></li>
                  <li><a href="#" onClick={()=>search("watches")}>Watches</a></li>
                  <li><a href="#" onClick={()=>search("bags")}>Bags</a></li>
                  <li><a href="#" onClick={()=>search("glasses")}>Glasses</a></li>
                  <li><a href="#" onClick={()=>search("cosmetics")}>Cosmetics</a></li>
                  <li><a href="#" onClick={()=>search("perfume")}>Perfume</a></li>
                  <li><a href="#" onClick={()=>search("footwear")}>Footwear</a></li>
              </ul>
        
  );
};
