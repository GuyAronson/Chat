// import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react';
import './style.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Banner from "./Componnents/Homepage/Banner";
import Layout from "./Componnents/Homepage/Layout";
import RegisterPage from './Componnents/Homepage/Register/RegisterPage';
import LoginPage from './Componnents/Homepage/Login/LoginPage'
import ChatPage from './Componnents/Chat/ChatPage';


function App() {
  const [loggedUser, setLoggedUser] = useState({});
  return (
    <BrowserRouter>
      <Banner/>
        <Routes>
          <Route exact path="/" element={<Layout />} />
          <Route path="/register" element={<RegisterPage setUser={setLoggedUser}/>} />
          <Route path="/login" element={<LoginPage setUser={setLoggedUser}/>} />
          <Route path="/chat/:username" element={<ChatPage loggedUser={loggedUser}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
