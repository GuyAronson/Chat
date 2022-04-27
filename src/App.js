// import 'bootstrap/dist/css/bootstrap.css'
import React, { useState } from 'react';
import './style.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterPage from './Register-login/registerPage.js';
import ChatPage from './ChatComponents/ChatPage'
import LoginPage from './Register-login/loginPage';
// import {users, getLoggedUser ,details} from './users';
import Layout from './Layout';
import Banner from './banner';

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
