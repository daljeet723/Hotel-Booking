import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  return (
    <Router>
    <Header/>
    <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </Router>
  );
}

export default App;
