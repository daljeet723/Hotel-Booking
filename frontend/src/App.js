import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Hotels from './components/hotels/Hotels';
import BookHotel from './components/bookings/BookHotel.js';
import ForgetPassword from './components/forgetPassword/ForgetPassword.js';
import ResetPassword from "./components/forgetPassword/ResetPassword.js";
import OtpVerification from "./components/forgetPassword/OtpVerification.js";
function App() {
  return (
    <Router>
    <Header/>
    <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path ="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/hotels" element={<Hotels/>}/>
      <Route path="/hotels/:keyword" element={<Hotels/>}/>
      <Route path = "/hotel/:id" element = {<BookHotel/>}/>
      <Route path = "/forgotPassword" element ={<ForgetPassword/>}/>
      <Route path ="/resetPassword" element ={<ResetPassword/>}/>
      <Route path ="/OtpVerification" element ={<OtpVerification/>}/>
    </Routes>
    </Router>
  );
}

export default App;
