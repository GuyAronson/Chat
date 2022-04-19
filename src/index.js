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
import NotFound404 from './NotFound404';
// import AddChat from './Chat/AddChat.js'
import { getLoggedUser } from './ChatComponents/ChatPage.js';

const root = ReactDOM.createRoot(document.querySelector('#root'));
function CanMoveToChat() {
    if(getLoggedUser())
        return <ChatPage/>;
    else
        return <NotFound404/>;
}

root.render(<>
<BrowserRouter>
    <Routes>
          <Route exact path="/" element={<Layout />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="addchat" element={<AddChat open={true}/>}/> */}
          <Route path="/chat/:username" element={<CanMoveToChat/>} />
      </Routes>
  </BrowserRouter>
  </>)

//root.render(<RegisterPage/>);

