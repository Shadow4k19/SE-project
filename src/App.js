import './App.css';
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Product_management from './component/Product_Management';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
      <div className="main">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element = {<Home />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/product-management' element={<Product_management />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
