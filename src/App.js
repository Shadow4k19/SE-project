import './App.css';
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Product_management from './component/Product_Management';
import Cart from './component/Cart';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drink from './component/Drink';
import Food from './component/Food';
import Other from './component/Other';
import QandA from './component/Q&A';
import userInstance from './component/User';
import History from './component/History';
import ShowDetail_history from './component/ShowDetail_History';
import Order from './component/Order';
import ShowDetail_order from './component/ShowDetail_Order';
//import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          {userInstance.getUserrole() === "admin" && (
            <>
            <Route path='/product-management' element={<Product_management />} />
            <Route path='/order' element={<Order />} />
            <Route path='/order/:receipt_number/detail'element={<ShowDetail_order />}/>
            </>
          )}
          <Route path='/Drink' element={<Drink />} />
          <Route path='/Food' element={<Food />} />
          <Route path='/q&a' element={<QandA />} />
          <Route path='/other' element={<Other />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/history' element={<History />} />
          <Route path='/history/:receipt_number/detail' element={<ShowDetail_history />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
