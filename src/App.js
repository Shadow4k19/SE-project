import './App.css';
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import Login from './component/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
