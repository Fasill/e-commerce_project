import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Main } from './components/main.js';
import { Signin } from './components/signin.js'
import { Signup} from'./components/signup.js'
import { Customer,Seller} from './components/additionalInfo.js'
import { Products } from './components/products.js';
import { MyProducts } from './components/myProducts.js';
import { Contact } from './components/contact.js';
import {Search} from './components/searchedFromNavBar.js'
import { Profile} from './components/profile.js';

import { Cart} from './components/cart.js';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/"  element={<Main/>} />
          <Route path="/signin"  element={<Signin/>} />
          <Route path="/signup"  element={<Signup/>} />
          <Route path="/signup/customer"  element={<Customer/>} />
          <Route path="/signup/seller" element={<Seller/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/myProducts" element={<MyProducts/>} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/search" element={<Search/>} />
          

        </Routes>
      </Router>
    </div>
  );
}
export default App;

