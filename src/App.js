import './App.css';
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Product_management from './component/Product_Management';
import Cart from './component/Cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './component/User';
import Drink from './component/Drink';
import Food from './component/Food';
import Other from './component/Other';
//import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const user = new User();
  return (
    <BrowserRouter>
      <div className="main">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element = {<Home />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/product-management' element={<Product_management />}></Route>
          <Route path='/Drink' element={<Drink />}></Route>
          <Route path='/Food' element={<Food />}></Route>
          <Route path='/other' element={<Other />}></Route>
          <Route path='cart' element = {<Cart />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
