import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Main } from './components/main.js';
import { Signin } from './components/signin.js'
import {Signup} from'./components/signup.js'
import  {Customer,Seller} from './components/additionalInfo.js'
import { Products } from './components/products.js';
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

        </Routes>
      </Router>
    </div>
  );
}
export default App;

