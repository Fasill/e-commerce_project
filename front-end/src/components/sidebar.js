import svg from './assets/images/underline.svg'
import axios from 'axios'
// import '../../../back-end/product_images/'
export const Sidebar = () => {

  const search = (value)=>{
    console.log(value)
    axios
      .post('')

  }

  return (

              <ul >
                  <li>
                    <h1>Categories</h1>
                    <img className='products_tttle_underline' src={svg}/>
                  
                  </li>
                  <li><a href="#" onClick={()=>search("Clothes")}>Clothes</a></li>
                  <li><a href="#" onClick={()=>search("Watches")}>Watches</a></li>
                  <li><a href="#" onClick={()=>search("Bags")}>Bags</a></li>
                  <li><a href="#" onClick={()=>search("Glasses")}>Glasses</a></li>
                  <li><a href="#" onClick={()=>search("Cosmetics")}>Cosmetics</a></li>
                  <li><a href="#" onClick={()=>search("Perfume")}>Perfume</a></li>
                  <li><a href="#" onClick={()=>search("Footwear")}>Footwear</a></li>
              </ul>
        
  );
};
