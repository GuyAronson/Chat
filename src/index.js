import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from './App'
import RegisterPage from './registerPage.js';
import Chat from './chat'

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<BrowserRouter>
    <Routes>
          <Route exact path="/" element={<RegisterPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="chat" element={<Chat/>} />
      </Routes>
  </BrowserRouter>)

//root.render(<RegisterPage/>);