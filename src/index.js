// import 'bootstrap/dist/css/bootstrap.css'
// import App from './App'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import RegisterPage from './Register-login/registerPage.js';
import ChatPage from './ChatComponents/ChatPage'
import LoginPage from './Register-login/loginPage';
// import {users, getLoggedUser ,details} from './users';
import Layout from './Layout';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<>
<BrowserRouter>
    <Routes>
          <Route exact path="/" element={<Layout />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="addchat" element={<AddChat open={true}/>}/> */}
          <Route path="/chat/:username" element={<ChatPage/>} />
      </Routes>
  </BrowserRouter>
  </>)

//root.render(<RegisterPage/>);

