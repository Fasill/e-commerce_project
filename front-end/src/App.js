import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { Main } from './components/main.js';
import { Signin } from './components/signin.js'


import './App.css';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/"  element={<Main/>} />
          <Route path="/signin"  element={<Signin/>} />

        </Routes>
      </Router>
    </div>
  );
}
export default App;

