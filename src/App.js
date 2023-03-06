import './App.css';
import Sidebar from './component/Sidebar';
import Navbar from './component/Navbar';
import Login from './component/Login';

function App() {
  return (
    <div className="main">
      <Login />
      <Navbar />
      <Sidebar />
    </div>
  );
}

export default App;
